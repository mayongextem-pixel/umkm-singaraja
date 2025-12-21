// src/app/kategori/page.jsx

import FrontpageLayout from "../components/layouts/FrontpageLayout";
import Link from "next/link";

// Data Dummy Kategori Usaha
const kategoriUsaha = [
    { id: 1, name: "Usaha Mikro", description: "Omzet tahunan maksimal 300 Juta" },
    { id: 2, name: "Usaha Kecil", description: "Omzet tahunan > 300 Juta hingga 2,5 Miliar" },
    { id: 3, name: "Usaha Menengah", description: "Omzet tahunan > 2,5 Miliar hingga 50 Miliar" },
];

export default function KategoriPage() {
  return (
    <FrontpageLayout>
      <div className="p-8 max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
            Katalog Berdasarkan Kategori Usaha
        </h1>
        
        <div className="space-y-4">
          {kategoriUsaha.map((kategori) => (
            // Saat di-klik, akan diarahkan ke halaman katalog dengan filter
            // Contoh: /products?kategori=mikro
            <Link 
              key={kategori.id} 
              href={`/products?kategori=${kategori.name.toLowerCase().replace(' ', '_')}`}
              className="block p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                {kategori.name}
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
                {kategori.description}
              </p>
              <span className="text-sm mt-2 inline-block text-teal-500 hover:text-teal-700">
                Lihat Semua UMKM →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </FrontpageLayout>
  );
}