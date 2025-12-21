"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link"; 
import FrontpageLayout from "../../layouts/FrontpageLayout"; 
import HomeHeroSection from "../../ui/section/HomeHeroSection"; 
import { FaMapMarkerAlt } from "react-icons/fa"; // Pastikan sudah install react-icons

export default function HomePageContent() {
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // PERBAIKAN: Gunakan endpoint yang benar sesuai Laravel (biasanya plural 'produks')
        const response = await fetch("http://127.0.0.1:8000/api/produk", {
          cache: 'no-store'
        });
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          // Ambil 6 produk terbaru
          setUmkmList(result.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Gagal mengambil data UMKM:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <FrontpageLayout>
      <HomeHeroSection />

      <section className="py-16 max-w-7xl mx-auto px-4 lg:px-8 bg-black">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
              Unggulan <span className="text-blue-600">Singaraja</span>
            </h2>
            <div className="h-1 w-12 bg-blue-600 mt-1"></div>
          </div>
          
          <Link href="/katalog" className="text-[10px] font-black text-blue-500 hover:text-white uppercase tracking-widest transition-colors">
            Lihat Semua Katalog →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-900/50 rounded-2xl animate-pulse border border-gray-800"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {umkmList.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 italic text-sm">Belum ada data UMKM tersedia.</p>
                </div>
            ) : (
              umkmList.map((umkm) => (
                <div key={umkm.id} className="bg-[#0a0a0a] rounded-2xl border border-gray-900 overflow-hidden hover:border-blue-600/50 transition-all group flex flex-col shadow-2xl h-full">
                  {/* Image Container */}
                  <div className="h-60 bg-gray-900 overflow-hidden relative">
                    <img 
                      // PERBAIKAN: Logika URL Gambar agar tidak pecah/error
                      src={umkm.foto_produk ? `http://127.0.0.1:8000/storage/produks/${umkm.foto_produk.replace('public/produks/', '')}` : "https://via.placeholder.com/500x400?text=No+Image"} 
                      alt={umkm.nama_produk}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { 
                        e.target.src = "https://via.placeholder.com/500x400?text=Image+Error"; 
                      }}
                    />
                    <div className="absolute top-4 left-4">
                       <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg">
                        {umkm.kategori}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-black text-white group-hover:text-blue-500 transition-colors line-clamp-1 uppercase italic tracking-tighter">
                      {umkm.nama_produk}
                    </h3>
                    
                    {/* PERBAIKAN: Penambahan tampilan Alamat */}
                    <div className="flex items-start gap-1 mt-3">
                        <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" size={10} />
                        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-medium">
                          {umkm.alamat || "Alamat tidak tersedia"}
                        </p>
                    </div>
                    
                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-900 mt-6">
                      <div>
                        <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest mb-1">Mulai Dari</p>
                        <p className="text-green-500 font-black text-lg tracking-tighter">
                          {/* PERBAIKAN: Safety check untuk harga */}
                          Rp {umkm.harga ? Number(umkm.harga).toLocaleString('id-ID') : "0"}
                        </p>
                      </div>
                      
                      <Link href="/katalog">
                        <button className="bg-white text-black px-5 py-2.5 rounded-xl font-black text-[10px] hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest shadow-xl">
                          Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </FrontpageLayout>
  );
}