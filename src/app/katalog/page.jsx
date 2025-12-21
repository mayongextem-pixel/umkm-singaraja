"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FrontpageLayout from "../components/layouts/FrontpageLayout";
import { FaMapMarkerAlt, FaStore, FaSearch } from "react-icons/fa";

function KatalogContent() {
  const [allUmkm, setAllUmkm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const searchParams = useSearchParams();
  const queryJenis = searchParams.get("jenis");
  const querySkala = searchParams.get("skala");

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const categories = ["Semua", "Kuliner", "Fashion", "Kerajinan", "Jasa"];

  useEffect(() => {
    if (queryJenis) {
      setSelectedCategory(queryJenis);
    } else if (querySkala) {
      setSelectedCategory("Semua");
    } else {
      setSelectedCategory("Semua");
    }
  }, [queryJenis, querySkala]);

  useEffect(() => {
    const fetchUmkm = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/produk", { 
          cache: 'no-store' 
        });
        const result = await response.json();
        if (result.success) {
          setAllUmkm(result.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUmkm();
  }, []);

  const filteredUmkm = allUmkm.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = item.nama_produk?.toLowerCase().includes(searchLower);
    const matchesCategory = 
      selectedCategory === "Semua" || 
      item.kategori?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSkala = 
      !querySkala || 
      item.skala_usaha?.toLowerCase() === querySkala.toLowerCase();

    return matchesSearch && matchesCategory && matchesSkala;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold tracking-widest animate-pulse">MEMUAT DATA...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto py-12 pt-28">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter italic">
              {querySkala ? `USAHA ${querySkala}` : "KATALOG"} <span className="text-blue-500 not-italic">UMKM</span>
            </h1>
            <div className="flex gap-2 mt-2">
               <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] uppercase italic">
                {selectedCategory !== "Semua" ? `Jenis: ${selectedCategory}` : "Semua Jenis Usaha"}
              </p>
              {querySkala && (
                <p className="text-blue-500 text-[10px] font-black tracking-[0.2em] uppercase border-l border-gray-800 pl-2">
                  Skala: {querySkala}
                </p>
              )}
            </div>
          </div>

          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text"
              placeholder="Cari UMKM..."
              className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-11 pr-5 py-3.5 rounded-2xl focus:outline-none focus:border-blue-600 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* PILLS FILTER */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                selectedCategory === cat 
                ? "bg-blue-600 border-blue-600 text-white shadow-lg" 
                : "bg-transparent border-gray-800 text-gray-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* GRID PRODUK */}
        {filteredUmkm.length === 0 ? (
          <div className="text-center py-40 bg-[#050505] rounded-[2.5rem] border border-dashed border-gray-900">
            <p className="text-gray-600 font-bold uppercase tracking-widest text-xs italic">Data tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUmkm.map((umkm) => (
              <div key={umkm.id} className="group bg-[#0a0a0a] border border-gray-900 rounded-[2rem] overflow-hidden hover:border-blue-600/50 transition-all duration-500 flex flex-col h-full">
                <div className="h-60 overflow-hidden relative bg-gray-900">
                  <img 
                    src={umkm.foto_produk ? `http://127.0.0.1:8000/storage/produks/${umkm.foto_produk.split('/').pop()}` : "https://via.placeholder.com/500x400"} 
                    alt={umkm.nama_produk} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/80 backdrop-blur-md text-blue-400 text-[8px] font-black px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-widest">
                      {umkm.kategori}
                    </span>
                    <span className="bg-blue-600 text-white text-[8px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                      {umkm.skala_usaha || "UMKM"}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                    {umkm.nama_produk}
                  </h3>
                  
                  {/* --- PENYEMPURNAAN ALAMAT --- */}
                  <div className="flex items-start gap-2 mb-6">
                    <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" size={14} />
                    <p className="text-gray-400 text-xs italic leading-relaxed line-clamp-2">
                      {umkm.alamat || "Singaraja, Buleleng, Bali"}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-gray-900 flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-[9px] font-black uppercase tracking-tighter">Estimasi Harga</p>
                      <p className="text-green-400 font-black text-xl">
                        Rp {Number(umkm.harga).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <Link href={`/katalog/${umkm.id}`}>
                      <button className="bg-white text-black hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase transition-all shadow-xl">
                        LIHAT PROFIL
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function KatalogPage() {
  return (
    <FrontpageLayout>
      <Suspense fallback={<div className="bg-black min-h-screen"></div>}>
        <KatalogContent />
      </Suspense>
    </FrontpageLayout>
  );
}