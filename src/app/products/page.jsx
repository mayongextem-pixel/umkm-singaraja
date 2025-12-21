// src/app/products/page.jsx (Final Code, Optimasi Path dan Padding)

import FrontpageLayout from "../components/layouts/FrontpageLayout"; // Path ke layout
import ProductCard from "../components/ui/card/ProductCard"; // Path ke kartu UMKM

// Data Dummy List UMKM
const umkmDummyData = [
    {
        id: 1,
        name: "Siobak Bu Gusti",
        description: "Salah satu UMKM Siobak paling legendaris di Buleleng.",
        image: "https://images.unsplash.com/photo-1546069901-ba91866384a8?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        jenis_usaha: "Kuliner",
        kategori_usaha: "Usaha Mikro",
        lokasi: "Jl. Baktiseraga No. 10",
    },
    {
        id: 2,
        name: "Batik Jagaraga",
        description: "Produsen batik tulis dan cap khas Bali Utara.",
        image: "https://images.unsplash.com/photo-1621937920700-1c045b84931f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVnfDB8fHx8fA%3D%3D",
        jenis_usaha: "Fashion",
        kategori_usaha: "Usaha Kecil",
        lokasi: "Desa Jagaraga",
    },
    // Tambahkan data UMKM dummy lainnya di sini
];

export default function ProductsPage() { 
  const umkmlist = umkmDummyData;

  return (
    <FrontpageLayout>
      {/* Container utama dengan padding atas yang besar (pt-24) agar tidak tertutup Navbar */}
      <div className="min-h-screen pb-10 px-6 pt-24 max-w-screen-xl mx-auto">
        <h3 className="font-bold text-gray-800 dark:text-white text-3xl text-start mb-8">
          Katalog UMKM Singaraja
        </h3>
        
        {/* Tampilkan daftar UMKM menggunakan ProductCard */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {umkmlist.map((umkm, index) => (
            <ProductCard key={index} product={umkm} /> 
          ))}
        </div>
      </div>
    </FrontpageLayout>
  );
}