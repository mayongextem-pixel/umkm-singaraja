"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FrontpageLayout from "../../components/layouts/FrontpageLayout";

export default function DetailUmkmPage() {
  const { id } = useParams();
  const router = useRouter(); 
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // Mengambil data dari API Laravel
        const response = await fetch(`http://127.0.0.1:8000/api/produk/${id}`, {
          cache: 'no-store'
        });
        const result = await response.json();
        
        if (result.success) {
          setUmkm(result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  // Fungsi Helper: Format WhatsApp agar otomatis jadi 62
  const formatWA = (number) => {
    if (!number) return "";
    let formatted = number.replace(/\D/g, ''); 
    if (formatted.startsWith('0')) {
      formatted = '62' + formatted.slice(1);
    }
    return formatted;
  };

  if (loading) {
    return (
      <FrontpageLayout>
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="animate-pulse font-bold text-xl">Memuat Profil UMKM Singaraja...</div>
        </div>
      </FrontpageLayout>
    );
  }

  if (!umkm) {
    return (
      <FrontpageLayout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
          <h2 className="text-2xl font-bold mb-4">Data UMKM tidak ditemukan</h2>
          <button onClick={() => router.push('/katalog')} className="text-blue-500 hover:underline">
            Kembali ke Katalog
          </button>
        </div>
      </FrontpageLayout>
    );
  }

  return (
    <FrontpageLayout>
      <div className="bg-black min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Navigasi Kembali */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors mb-8 font-medium group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Katalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[#0f0f0f] p-8 lg:p-12 rounded-[2.5rem] border border-gray-800 shadow-2xl">
            
            {/* Sisi Kiri: Visual/Foto */}
            <div className="relative h-fit">
              <img 
                src={umkm.foto_produk || "https://via.placeholder.com/800x600?text=Foto+UMKM"} 
                className="rounded-3xl w-full object-cover shadow-2xl border border-gray-800 shadow-blue-900/10"
                alt={umkm.nama_produk}
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/800x600?text=Gambar+403+Forbidden"; 
                }}
              />
              <div className="absolute top-6 left-6">
                <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl">
                  {umkm.kategori}
                </span>
              </div>
            </div>

            {/* Sisi Kanan: Informasi Detail */}
            <div className="flex flex-col">
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tighter uppercase">
                {umkm.nama_produk}
              </h1>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-gray-500 text-sm font-bold uppercase">Harga Mulai</span>
                <p className="text-3xl font-bold text-green-400">
                  Rp {Number(umkm.harga).toLocaleString('id-ID')}
                </p>
              </div>

              <div className="space-y-8">
                {/* Deskripsi dengan penanganan tanda kutip agar tidak merah di editor */}
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800">
                  <h4 className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">Tentang Usaha</h4>
                  <p className="text-gray-200 leading-relaxed text-lg italic">
                    &quot;{umkm.deskripsi}&quot;
                  </p>
                </div>

                {/* Lokasi */}
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/10 p-3 rounded-xl text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em]">Lokasi / Alamat</h4>
                    <p className="text-gray-300 font-medium mt-1">{umkm.alamat}</p>
                  </div>
                </div>
              </div>

              {/* Tombol Kontak WhatsApp */}
              <div className="mt-auto pt-12">
                <a 
                  href={`https://wa.me/${formatWA(umkm.whatsapp)}?text=Halo%20${encodeURIComponent(umkm.nama_produk)},%20saya%20menemukan%20usaha%20Anda%20di%20Katalog%20UMKM%20Singaraja.`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-4 bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-xl shadow-green-900/20"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="h-6 w-6" alt="Icon WA" />
                  HUBUNGI PENJUAL
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </FrontpageLayout>
  );
}