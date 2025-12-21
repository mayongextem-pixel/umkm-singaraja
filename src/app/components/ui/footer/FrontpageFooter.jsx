"use client";

import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function FrontpageFooter() {
  return (
    <footer className="bg-[#050505] border-t border-gray-900 pt-16 pb-8 font-sans">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND AREA */}
          <div className="col-span-1">
             <span className="text-xl font-black text-white uppercase italic tracking-tighter">
                SINGARAJA <span className="text-blue-600">UMKM CENTER</span>
              </span>
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed mt-4">
              Pusat Informasi dan Katalog Digital UMKM Unggulan Kota Singaraja.
            </p>
          </div>

          {/* INFORMASI - Sesuai nama folder Anda */}
          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-b border-gray-900 pb-2 w-fit">Informasi</h3>
            <ul className="text-gray-500 text-[10px] font-bold space-y-4 uppercase tracking-widest">
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Hubungi Kami</Link></li>
              <li><Link href="/daftar-umkm" className="hover:text-blue-500 transition-colors">Daftar Jadi UMKM</Link></li>
            </ul>
          </div>

          {/* BANTUAN - Sesuai nama folder Anda */}
          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-b border-gray-900 pb-2 w-fit">Bantuan</h3>
            <ul className="text-gray-500 text-[10px] font-bold space-y-4 uppercase tracking-widest">
              <li><Link href="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link></li>
              <li><Link href="/order-procedure" className="hover:text-blue-500 transition-colors">Prosedur Pemesanan</Link></li>
              <li><Link href="/terms" className="hover:text-blue-500 transition-colors">Syarat & Ketentuan</Link></li>
            </ul>
          </div>

          {/* SOCIALS */}
          <div>
            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-b border-gray-900 pb-2 w-fit">Ikuti Kami</h3>
            <div className="flex gap-4">
               <a href="#" className="p-2 border border-gray-800 rounded-full text-gray-500 hover:text-white hover:border-blue-500"><FaInstagram /></a>
               <a href="#" className="p-2 border border-gray-800 rounded-full text-gray-500 hover:text-white hover:border-blue-500"><FaFacebookF /></a>
               <a href="#" className="p-2 border border-gray-800 rounded-full text-gray-500 hover:text-white hover:border-blue-500"><FaTwitter /></a>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="pt-8 border-t border-gray-900 flex justify-between items-center text-[9px] font-black text-gray-700 uppercase tracking-widest italic">
          <p>© {new Date().getFullYear()} SINGARAJA UMKM HUB. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}