// src/app/products/[productId]/page.jsx

import FrontpageLayout from "../../components/layouts/FrontpageLayout"; // Path: ../../components/...
import Button from "../../components/ui/button/Button";
import ProductCard from "../../components/ui/card/ProductCard"; // Akan kita gunakan untuk menampilkan produk UMKM

import { FaWhatsapp } from "react-icons/fa";
import { FaLocationDot, FaStore } from "react-icons/fa6"; // Ikon baru

// Data Dummy Detail UMKM (Diasumsikan kita fetch data ini berdasarkan ID)
const umkmDetailDummy = {
    id: 2,
    name: "Kopi Mandra",
    description: "UMKM Kopi yang fokus pada pengolahan Kopi Arabika asli Buleleng dari daerah Kintamani dan Munduk. Mereka dikenal karena kualitas biji kopinya yang premium dan dipanggang (roast) sempurna.",
    image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    jenis_usaha: "Kuliner",
    kategori_usaha: "Usaha Kecil",
    lokasi: "Jl. Raya Singaraja-Denpasar KM 10, Buleleng",
    contact_wa: "6281234567890",
    
    // Daftar produk/layanan yang dijual UMKM ini
    products_offered: [
        {
            id: 101,
            name: "Kopi Arabika Buleleng (250gr)",
            price: "65000",
            image: "https://images.unsplash.com/photo-1546069901-ba91866384a8?q=80&w=1760&auto=format&fit=crop",
        },
        {
            id: 102,
            name: "Kopi Robusta Kintamani (1kg)",
            price: "120000",
            image: "https://images.unsplash.com/photo-1621937920700-1c045b84931f?q=80&w=1770&auto=format&fit=crop",
        },
    ],
};


export default function UmkmDetailPage({ params }) {
  // Anggap kita menggunakan params.productId untuk fetch data umkmDetailDummy
  const umkm = umkmDetailDummy;

  return (
    <FrontpageLayout>
      <div className="max-w-screen-lg mx-auto p-4">
        <h1 className="font-bold text-gray-800 dark:text-white text-3xl mb-8">
          Detail UMKM: {umkm.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* KOLOM KIRI: FOTO/LOGO UMKM */}
          <div className="md:col-span-1">
            <img 
              src={umkm.image} 
              alt={`Foto ${umkm.name}`} 
              className="w-full h-auto object-cover rounded-lg shadow-lg" 
            />
          </div>

          {/* KOLOM KANAN: INFORMASI DETAIL */}
          <div className="md:col-span-1 space-y-6">
            <div className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
                <FaStore /> Informasi Utama
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{umkm.description}</p>
              
              <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <p><strong>Jenis Usaha:</strong> {umkm.jenis_usaha}</p>
                <p><strong>Kategori Usaha:</strong> {umkm.kategori_usaha}</p>
                <p className='flex items-center gap-2'>
                    <FaLocationDot /> <strong>Lokasi:</strong> {umkm.lokasi}
                </p>
              </div>
            </div>

            {/* Tombol Kontak (WhatsApp) */}
            <a href={`https://wa.me/${umkm.contact_wa}`} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-500 hover:bg-green-600 focus:ring-green-300">
                <FaWhatsapp className="size-5" />
                Hubungi UMKM ({umkm.name})
              </Button>
            </a>
          </div>
        </div>
        
        {/* BAGIAN PRODUK/LAYANAN UMKM */}
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Produk & Layanan dari {umkm.name}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {umkm.products_offered && umkm.products_offered.map((product, index) => (
                    // Menggunakan ProductCard sebagai template visual (tanpa tombol keranjang)
                    <div key={index} className="border p-4 rounded-lg bg-white dark:bg-gray-900">
                        <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-3 rounded" />
                        <h4 className="font-semibold text-lg">{product.name}</h4>
                        <p className="text-blue-600 dark:text-blue-400">
                            Rp {new Intl.NumberFormat("id-ID", {
                                minimumFractionDigits: 0,
                            }).format(parseFloat(product.price))}
                        </p>
                    </div>
                ))}
            </div>
            {!umkm.products_offered || umkm.products_offered.length === 0 && (
                <p className="text-gray-500">UMKM ini belum mencantumkan produk atau layanannya.</p>
            )}
        </div>

      </div>
    </FrontpageLayout>
  );
}