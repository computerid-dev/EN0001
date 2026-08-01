// api/admin/moderate.js
// Gabungan dari ban.js, unlock.js, dan endpoint baru delete-account.js.
// Digabung supaya jumlah Serverless Function gak mepet limit 12 (Vercel Hobby).
// URL lama (/api/admin/ban, /api/admin/unlock) + baru (/api/admin/delete-account)
// tetap jalan lewat rewrites di vercel.json.
const { db, bucket, rtdb } = require('../../lib/firebaseAdmin');
const { requireAdmin } = require('../../lib/helpers');

async function handleBan(req, res) {
  const { userId, banned } = req.body || {};
  if (!userId || typeof banned !== 'boolean') {
    return res.status(400).json({ error: 'Parameter userId/banned tidak valid.' });
  }

  try {
    const ref = db().collection('users').doc(userId);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });

    await ref.update({ banned });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Gagal memperbarui status ban.' });
  }
}

async function handleUnlock(req, res) {
  const { userId } = req.body || {};
  if (!userId) return res.status(400).json({ error: 'Parameter userId wajib diisi.' });

  try {
    const ref = db().collection('users').doc(userId);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });

    await ref.update({ locked: false, failedAttempts: 0 });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Gagal membuka kunci akun.' });
  }
}

// Sama seperti di delete-post.js -- ekstrak path file Storage dari URL getDownloadURL().
function extractStoragePath(mediaUrl) {
  try {
    const match = /\/o\/([^?]+)/.exec(mediaUrl || '');
    if (!match) return null;
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

// Hapus akun PERMANEN: akun, semua post+komentar+media dia, semua chat yang dia
// ikuti (termasuk isi pesannya di Realtime Database), relasi follow, dan sesi
// aktif dia (auto ke-logout di semua device). Ini TIDAK BISA di-undo.
async function handleDeleteAccount(req, res) {
  const { userId } = req.body || {};
  if (!userId) return res.status(400).json({ error: 'Parameter userId wajib diisi.' });

  try {
    const userRef = db().collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });

    // 1) Hapus semua post dia + komentar di masing-masing post + file media di Storage.
    const postsSnap = await db().collection('posts').where('authorId', '==', userId).get();
    for (const postDoc of postsSnap.docs) {
      const post = postDoc.data();
      const commentsSnap = await postDoc.ref.collection('comments').get();
      await Promise.all(commentsSnap.docs.map(c => c.ref.delete()));
      if (post.mediaUrl) {
        const path = extractStoragePath(post.mediaUrl);
        if (path) await bucket().file(path).delete().catch(() => {});
      }
      await postDoc.ref.delete();
    }

    // 2) Hapus semua chat yang dia ikuti + isi pesannya di Realtime Database.
    const chatsSnap = await db().collection('chats').where('participants', 'array-contains', userId).get();
    for (const chatDoc of chatsSnap.docs) {
      await rtdb().ref(`chats/${chatDoc.id}/messages`).remove().catch(() => {});
      await chatDoc.ref.delete();
    }

    // 3) Hapus relasi follow (dia follow orang lain, atau di-follow orang lain).
    const [followingSnap, followerSnap] = await Promise.all([
      db().collection('follows').where('followerId', '==', userId).get(),
      db().collection('follows').where('followingId', '==', userId).get(),
    ]);
    await Promise.all([
      ...followingSnap.docs.map(d => d.ref.delete()),
      ...followerSnap.docs.map(d => d.ref.delete()),
    ]);

    // 4) Hapus semua sesi login aktif dia -> otomatis ke-logout di semua device.
    const sessionsSnap = await db().collection('sessions').where('userId', '==', userId).get();
    await Promise.all(sessionsSnap.docs.map(d => d.ref.delete()));

    // 5) Best-effort hapus foto profil dari Storage (avatars/{userId}.ext -- coba ekstensi umum).
    for (const ext of ['jpg', 'png', 'webp']) {
      await bucket().file(`avatars/${userId}.${ext}`).delete().catch(() => {});
    }

    // 6) Terakhir, hapus akunnya sendiri.
    await userRef.delete();

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Gagal menghapus akun.' });
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!requireAdmin(req, res)) return;

  const { action } = req.query;
  switch (action) {
    case 'ban': return handleBan(req, res);
    case 'unlock': return handleUnlock(req, res);
    case 'delete-account': return handleDeleteAccount(req, res);
    default: return res.status(404).json({ error: 'Route tidak ditemukan.' });
  }
};
