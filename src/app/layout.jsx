import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // MODIFIKASI 1: Ganti Judul ke UMKM Singaraja (SEO Wajib!)
  title: "Katalog UMKM Singaraja | Buleleng Bali",
  // MODIFIKASI 2: Ganti Deskripsi agar relevan (SEO Wajib!)
  description: "Pusat katalog produk UMKM (Kuliner, Fashion, Kerajinan) terbaik dari Singaraja, Buleleng, Bali. Dukung ekonomi lokal!",
  keywords: ['UMKM', 'Singaraja', 'Buleleng', 'Bali', 'Katalog Produk', 'Kuliner Singaraja'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id"> {/* MODIFIKASI 3: Ganti bahasa ke 'id' */}
      <head>
        {/* Tambahkan link ke Font Awesome jika Anda menggunakan ikon <i> di footer */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-..." crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}