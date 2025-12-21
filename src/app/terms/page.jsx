"use client";
import React from "react";
import FrontpageLayout from "../components/layouts/FrontpageLayout";

export default function TermsPage() {
  return (
    <FrontpageLayout>
      <div className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8 dark:text-white text-center">Syarat & Ketentuan</h1>
        <div className="prose dark:prose-invert text-gray-600 dark:text-gray-400 space-y-4">
          <p>1. Data UMKM yang didaftarkan harus valid dan asli sesuai kepemilikan usaha.</p>
          <p>2. Konten produk tidak boleh mengandung unsur SARA atau barang terlarang.</p>
          <p>3. Platform Singaraja UMKM Center tidak bertanggung jawab atas transaksi antara pembeli dan penjual.</p>
        </div>
      </div>
    </FrontpageLayout>
  );
}