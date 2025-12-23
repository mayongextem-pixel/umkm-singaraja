"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import FrontpageLayout from "../../layouts/FrontpageLayout";
import HomeHeroSection from "../../ui/section/HomeHeroSection";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getApiUrl, getImageUrl } from "@/config/api";

export default function HomePageContent() {
  const [umkmList, setUmkmList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getApiUrl("/produk"), {
          cache: 'no-store'
        });
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
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

      <section className="py-16 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                Unggulan <span className="text-blue-600">Singaraja</span>
              </h2>
              <div className="h-1 w-12 bg-blue-600 mt-2"></div>
            </div>

            <Link href="/katalog" className="text-[10px] font-black text-blue-600 hover:text-white uppercase tracking-widest transition-colors mb-1">
              LIHAT SEMUA KATALOG →
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
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-500 italic text-sm font-medium uppercase tracking-[0.2em]">Belum ada data UMKM tersedia.</p>
                </div>
              ) : (
                umkmList.map((umkm) => (
                  <div key={umkm.id} className="bg-[#0b101b] rounded-2xl overflow-hidden hover:ring-2 hover:ring-blue-600/50 transition-all group flex flex-col shadow-2xl h-full border border-gray-900/50">
                    {/* Image Container */}
                    <div className="h-56 bg-gray-900 overflow-hidden relative">
                      <img
                        src={getImageUrl(umkm.foto_produk)}
                        alt={umkm.nama_produk}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1.5 rounded uppercase tracking-widest shadow-lg">
                          {umkm.kategori}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-lg font-black text-white group-hover:text-blue-500 transition-colors line-clamp-1 uppercase italic tracking-tighter mb-1">
                        {umkm.nama_produk}
                      </h3>

                      <div className="flex items-start gap-2 mt-2 mb-6">
                        <FaMapMarkerAlt className="text-red-500 mt-0.5 shrink-0" size={12} />
                        <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wide line-clamp-2 leading-relaxed">
                          {umkm.alamat || "Alamat tidak tersedia"}
                        </p>
                      </div>

                      <div className="mt-auto pt-5 flex items-center justify-between border-t border-gray-800/50">
                        <div>
                          <p className="text-gray-600 text-[8px] font-black uppercase tracking-widest mb-1">Mulai Dari</p>
                          <p className="text-green-500 font-black text-lg tracking-tighter">
                            Rp {umkm.harga ? Number(umkm.harga).toLocaleString('id-ID') : "0"}
                          </p>
                        </div>

                        <Link href="/katalog">
                          <button className="bg-white text-black px-6 py-2 rounded-xl font-black text-[10px] hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest shadow-lg active:scale-95">
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
        </div>
      </section>
    </FrontpageLayout>
  );
}