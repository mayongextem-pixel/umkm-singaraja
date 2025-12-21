// src/app/components/pages/product/ProductDetailPage.jsx

"use client";
// KOREKSI PATH: Naik dua tingkat (..) ke components/ lalu masuk ke layouts/
import FrontpageLayout from "../../layouts/FrontpageLayout"; 
// KOREKSI PATH: Naik dua tingkat (..) ke components/ lalu masuk ke ui/button/
import Button from "../../ui/button/Button"; 
import { useParams } from "next/navigation"; 
import Link from "next/link"; 
import { FaBagShopping, FaWhatsapp } from "react-icons/fa6"; 
import { useState } from "react";
// Tambahkan SpinnerLoading dan FetchError
import SpinnerLoading from "../../ui/loading/SpinnerLoading";
import FetchError from "../../ui/error/FetchError";


// --- Data Dummy (Sesuaikan dengan data yang akan Anda gunakan) ---
const dummyProduct = {
  id: "kopi-arabika-buleleng", // Akan diambil dari URL params
  name: "Kopi Arabika Buleleng (150gr)",
  description: "Biji kopi pilihan dari perkebunan Buleleng. Rasa kaya dan aroma khas, dipanen oleh petani lokal Buleleng. Dukung UMKM kami!",
  image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=1170",
  price: 55000,
  stock: 15,
  umkm: { 
    id: 101, 
    name: "Kopi Mandira",
    contact: "6281234567890", // Nomor WhatsApp UMKM
  }, 
  category: { id: 1, name: "Kuliner" },
  details: {
    berat: "150 gram",
    jenis: "Arabika",
    lokasi: "Kintamani, Buleleng",
  }
};
// --- END Data Dummy ---


export default function ProductDetailPageContent() {
  const { productId } = useParams();
  
  // Dalam proyek asli, Anda akan melakukan fetch data dari Laravel di sini
  const [product, setProduct] = useState(dummyProduct); 
  const [loading, setLoading] = useState(false); // Atur ke true jika sedang fetch
  const [error, setError] = useState(false); // Atur ke true jika fetch gagal

  if (loading) {
    return (
      <FrontpageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <SpinnerLoading />
        </div>
      </FrontpageLayout>
    );
  }

  // Jika produk tidak ditemukan (meskipun menggunakan dummy, ini untuk simulasi)
  if (error || !product) {
    return (
      <FrontpageLayout>
        <div className="flex justify-center items-center min-h-[50vh] p-4">
          <FetchError text={`Produk dengan ID ${productId} tidak ditemukan.`} />
        </div>
      </FrontpageLayout>
    );
  }


  // --- Tampilan Detail Produk ---

  const whatsappLink = `https://wa.me/${product.umkm.contact}?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20${product.name}%20(${product.id})`;


  return (
    <FrontpageLayout>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-4">
        {/* Kolom Kiri: Gambar Produk */}
        <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[500px] object-contain rounded-lg"
          />
        </div>

        {/* Kolom Kanan: Detail & Aksi */}
        <div className="flex flex-col gap-6">
          
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          
          {/* Harga & Status Stok */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-500">
              {product.umkm.name} | Kategori: {product.category.name}
            </span>
            <p className="text-4xl font-extrabold text-blue-600">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(product.price)}
            </p>
            <span className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              Stok: {product.stock > 0 ? `${product.stock} Tersedia` : 'Stok Habis'}
            </span>
          </div>
          
          <hr className="border-gray-200" />
          
          {/* Deskripsi */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Deskripsi Produk</h2>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Detail Tambahan (Contoh) */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Detail Spesifik</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Berat Bersih: {product.details.berat}</li>
              <li>Jenis Kopi: {product.details.jenis}</li>
              <li>Asal Lokasi: {product.details.lokasi}</li>
            </ul>
          </div>
          
          {/* Tombol Aksi */}
          <div className="flex flex-col gap-4 mt-4">
            <Button
              className="py-3 text-lg justify-center disabled:opacity-50"
              disabled={product.stock === 0}
            >
              <FaBagShopping className="size-5" />
              Tambah ke Keranjang
            </Button>
            
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                className="py-3 text-lg justify-center bg-green-600 hover:bg-green-700 focus:ring-green-300 w-full"
              >
                <FaWhatsapp className="size-5" />
                Hubungi UMKM ({product.umkm.name})
              </Button>
            </a>
          </div>

        </div>
      </div>
    </FrontpageLayout>
  );
}