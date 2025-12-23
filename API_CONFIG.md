# API Configuration Guide

## Mengubah URL Backend API

Secara default, aplikasi menggunakan `http://127.0.0.1:8000` sebagai base URL backend.

### Cara 1: Menggunakan Environment Variables (Recommended)

Create file `.env.local` di root folder Next.js:

```bash
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_API_BASE=http://127.0.0.1:8000/api
```

Kemudian restart development server:
```bash
npm run dev
```

### Cara 2: Edit Config File Langsung

Edit file `src/config/api.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://your-backend-url.com',
  API_BASE: 'http://your-backend-url.com/api',
};
```

## Fungsi Helper yang Tersedia

### `getApiUrl(endpoint)`
Membuat full URL untuk API endpoint.

**Contoh:**
```javascript
getApiUrl('/produk')  // Returns: "http://127.0.0.1:8000/api/produk"
getApiUrl('/login')   // Returns: "http://127.0.0.1:8000/api/login"
```

### `getImageUrl(imagePath)`
Membuat full URL untuk gambar atau mengembalikan placeholder.

**Contoh:**
```javascript
getImageUrl('http://...full-url.jpg')  // Returns: same URL
getImageUrl('/storage/produks/abc.jpg') // Returns: "http://127.0.0.1:8000/storage/produks/abc.jpg"
getImageUrl(null)                       // Returns: "/no-image.jpg"
```

## Files yang Menggunakan Config

Semua file berikut sudah menggunakan centralized config:

- ✅ `/src/app/admin/dashboard/page.jsx`
- ✅ `/src/app/umkm/dashboard/page.jsx`
- ✅ `/src/app/auth/login/page.jsx`
- ✅ `/src/app/auth/register/page.jsx`
- ✅ `/src/app/daftar-umkm/page.jsx`

## Production Deployment

Saat deploy ke production, update environment variables dengan URL production:

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_API_BASE=https://api.yourdomain.com/api
```
