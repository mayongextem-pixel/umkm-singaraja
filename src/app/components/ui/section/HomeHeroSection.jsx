// src/app/components/ui/section/HomeHeroSection.jsx

import Link from "next/link";
import React from "react";

export default function HomeHeroSection() {
  return (
    <section className="relative bg-[#050914] pt-40 pb-24 sm:pt-48 sm:pb-32 px-4 border-b border-gray-900">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-7xl leading-tight">
          Pusat Informasi dan <br />
          Katalog UMKM <br />
          <span className="text-blue-600">Singaraja</span>
        </h1>

        <p className="mt-8 text-lg leading-8 text-gray-400 font-medium max-w-2xl mx-auto">
          Dukung ekonomi lokal! Temukan beragam produk **Kuliner, Jasa, Fashion, dan Kerajinan** dari usaha Mikro, Kecil, dan Menengah (UMKM) terbaik Buleleng.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
          <Link href="/katalog">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg active:scale-95">
              Jelajahi Katalog UMKM →
            </button>
          </Link>

          <Link
            href="/daftar-umkm"
            className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 hover:text-white transition-all flex items-center gap-2"
          >
            Daftar UMKM Sekarang <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}