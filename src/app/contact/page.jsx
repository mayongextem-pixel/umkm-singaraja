"use client";

import React from "react";
// Gunakan path yang sama dengan file About yang sudah berhasil jalan
import FrontpageLayout from "../components/layouts/FrontpageLayout"; 

export default function ContactPage() {
  return (
    <FrontpageLayout>
      <div className="max-w-4xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Hubungi Kami
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ada pertanyaan? Tim Singaraja UMKM Center siap membantu Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg dark:text-white mb-2">Informasi Kontak</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Email: support@singarajaumkm.com</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">WhatsApp: +62 812-3456-7890</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-lg dark:text-white mb-2">Lokasi Kantor</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Jl. Ngurah Rai No. 1, Singaraja, Bali.
              </p>
            </div>
          </div>

          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              className="w-full p-4 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" 
            />
            <textarea 
              rows="4" 
              placeholder="Tulis pesan Anda..." 
              className="w-full p-4 rounded-xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </FrontpageLayout>
  );
}