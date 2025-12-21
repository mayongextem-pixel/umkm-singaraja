// src/app/components/ui/section/HomeHeroSection.jsx

import Link from "next/link";
import React from "react";
// Path relatif dari 'ui/section' ke 'ui/button'
import Button from "../button/Button"; 
import { FaArrowRightLong } from "react-icons/fa6";

export default function HomeHeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white dark:bg-gray-900 pt-32 pb-12 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Pusat Informasi dan Katalog UMKM{" "}
          <span className="text-blue-600">Singaraja</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Dukung ekonomi lokal! Temukan beragam produk **Kuliner, Jasa, Fashion, dan Kerajinan** dari usaha Mikro, Kecil, dan Menengah (UMKM) terbaik Buleleng.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/katalog">
  <button className="bg-blue-600 ...">
     Jelajahi Katalog UMKM →
  </button>
</Link>
          
          {/* MODIFIKASI DI SINI: href diarahkan ke /register/umkm dan teks disesuaikan */}
          <Link 
            href="/daftar-umkm" 
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
          >
            Daftar UMKM Sekarang <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}