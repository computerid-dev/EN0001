// lib/config.js
// ============================================================================
// SUDAH TERISI OTOMATIS dari file service account JSON yang lu upload.
// Gak ada Environment Variables di Vercel sama sekali -- semua value diambil
// langsung dari sini pas server jalan.
//
// PROJECT: echoauthtest-16d2d
//
// PENTING: repo GitHub tempat kode ini di-push HARUS Private -- private_key
// di sini = akses PENUH ke seluruh database (bisa hapus semua data, baca
// semua password/email/no.telp user yang kesimpen plaintext).
// ============================================================================

module.exports = {
  FIREBASE_PROJECT_ID: 'echoauthtest-16d2d',
  FIREBASE_CLIENT_EMAIL: 'firebase-adminsdk-fbsvc@echoauthtest-16d2d.iam.gserviceaccount.com',
  FIREBASE_PRIVATE_KEY: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLFkCwcsumacyi
ypSqRjLoIYD4+aRaXAahPhgxx6oH4azQaZBuBSTfwmn4eh+UXTLaf+N8fXWCCbPm
NW+jK0zbeG/uXOn5aPOGh6PV2YrMRLZqPbKAXlu+svj4Bmbwpvz5D4xKX6CXWXJw
cxKaYJbeeHxOf9BImp3oCuEp+y0TX5LGy71Ed0/q3FsqP09sMjK0FQtQorvazM83
6fEj0czXkhqqMD32MBe3QNmcd9cnEgca6UEMerkjmFquq7arIkQbGDWS1WCm21tb
piOZA/41k9lx9D7hAqNxNO7SkxKQhPwuILvH/mimLDMwo9yBgxjfeoRJFuua1Je6
fwSx9ejVAgMBAAECggEAVurEr9/JogTY1HlQLBnUMr4YFTa+rP+CxOKu9yslba8b
x6zOaA/iirOJqBMYTeafW51tbnvBXXCqomWPTG29PJbsjL8OUjSlORf3OhCbUzY7
Pff+2+rGaDTv0jLnPqqxTSTm3XPU5sGc9VyCgzjAiSFWzj/slA48c7GoUU/TKF01
IWlZhTJmGNj1jUWK4HzGgZSbFz43OpFNULiH0EryPfpnfLJtwd7oE1jIqM2eKugt
X4IaTjLAxb7QvKbRC7QOtMJ6jXTsDog6zJwiY2RImt36nNf/fS5gZXFR/1pr06+4
GRws3jeBEi+fs99sNhqy4qPHOYvFfzlhIzSWNyW+ZwKBgQDwZ67D6pUpQRq2IoxX
KSDIZmSDWfNBZ6SSbTEFkZbkNUi8NfZTJU9+EfHHG5m18KZsrCqncYeC86uqLZDJ
bclkp90+JoYBX7stsHaCoT1DMt0qJRlQXcrBMYHmbrGVnnHNNvm2h+hOjHa7s6ee
39sPFF2lz8KKiy9DnkGq6wN3UwKBgQDYQtei75ArUM7qkk5f6bxUEkDS1+IpPBpA
V5Owzu6GLmBWZgHPI9YN6t4NTy6cwGLduYEgYbM6DXJDk+8NG0ZjCCjE1RtnE8rl
lIYxvH6aorXCMLTVFT4/yyid+MVl3xcbAZKxRyWzt03Gfx2GvScHDDI9ww2pkixA
GmFYC6DiNwKBgQDNFlakcmofkJfeC2kYLlD2RUu4NrNr96QQ+q/YZVSJiN9tGMf0
NJ81GM/fIS+nZA5GJTYaNKL7Vy76dfbPsCYgBYibrbeiUm3XU3Q2iqE9w5Wjj5Sh
1/HRkI+V6pb64fmJrT2otxa6c+ASzvfPdH9nxOMDQlNfZ8/Baq/wxJ7nWwKBgAgV
p54NuqQD51hZk9h+Em5KKGY5b9j+yDRzka/gbIZToYJZWeP2gQAQMbDpruJpRsjn
MG6XeG3JJuZj12H0DROSsIN7PAUEdmdSwBmH5Gu/fW//BiOZIbSc0a3mKOsABgsa
afN6p2wqhBvRkLcCxzy6Nf6dFhuqvUDAO7dg5+jNAoGBAJMu/SYcpk4L5kNj3rxo
AKVIZmSJvwc0IVMrrir7wiEFGYG2TTSs8CsAbIY/17v6Rttuu58p09ejCS/1V+ji
aOvkSXO7IxOvK502SkwH42QWoW0hz1MHdZNczfAkN6LIj0CT3qXj9d4dl1FHRBMU
vzrNUhmNF+q5RpPmmZulHX1o
-----END PRIVATE KEY-----
`,

  // Kalau ternyata URL Realtime Database lu beda dari ini, cek di Firebase
  // Console > project echoauthtest-16d2d > Realtime Database, lalu ganti.
  FIREBASE_DATABASE_URL: 'https://echoauthtest-16d2d-default-rtdb.asia-southeast1.firebasedatabase.app',

  FIREBASE_STORAGE_BUCKET: 'echoauthtest-16d2d.firebasestorage.app',

  ADMIN_SECRET: 'GCmXpnOIAf8PQVgTzW0Ns0Bh',
};
