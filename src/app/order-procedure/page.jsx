"use client";
import React from "react";
import FrontpageLayout from "../components/layouts/FrontpageLayout";

export default function OrderProcedurePage() {
  return (
    <FrontpageLayout>
      <div className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Prosedur Pemesanan</h1>
        <div className="space-y-6 text-gray-600 dark:text-gray-400">
          <div className="flex gap-4">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">1</span>
            <p>Pilih kategori UMKM yang Anda cari di halaman utama.</p>
          </div>
          <div className="flex gap-4">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">2</span>
            <p>Klik pada profil UMKM untuk melihat katalog produk mereka.</p>
          </div>
          <div className="flex gap-4">
            <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">3</span>
            <p>Gunakan tombol WhatsApp untuk menghubungi penjual secara langsung.</p>
          </div>
        </div>
      </div>
    </FrontpageLayout>
  );
}