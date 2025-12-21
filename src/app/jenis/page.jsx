// src/app/jenis/page.jsx

import FrontpageLayout from "../components/layouts/FrontpageLayout";
import Link from "next/link";

// Data Dummy Jenis UMKM
const jenisUmkm = [
    { id: 1, name: "Kuliner", description: "Makanan, Minuman, Catering, Jajanan" },
    { id: 2, name: "Fashion", description: "Pakaian, Batik, Aksesoris, Tas, Sepatu" },
    { id: 3, name: "Jasa", description: "Layanan Digital, Bengkel, Salon, Pendidikan" },
    { id: 4, name: "Kerajinan", description: "Oleh-oleh, Ukiran, Souvenir, Anyaman" },
];

export default function JenisPage() {
  return (
    <FrontpageLayout>
      <div className="p-8 max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
            Katalog Berdasarkan Jenis UMKM
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jenisUmkm.map((jenis) => (
            // Saat di-klik, akan diarahkan ke halaman katalog dengan filter
            // Contoh: /products?jenis=kuliner
            <Link 
              key={jenis.id} 
              href={`/products?jenis=${jenis.name.toLowerCase()}`}
              className="block p-6 border rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                {jenis.name}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {jenis.description}
              </p>
              <span className="text-sm mt-3 inline-block text-blue-500 hover:text-blue-700">
                Lihat Semua UMKM →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </FrontpageLayout>
  );
}