"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown, FaUserCircle, FaSignOutAlt, FaUserShield } from "react-icons/fa";

export default function FrontpageNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        setIsLoggedIn(true);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Session error");
      }
    }
  }, []);

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    // Peningkatan z-index ke 999 untuk memastikan navbar selalu di depan
    <nav className="fixed top-0 w-full z-[999] bg-[#0a0f1a]/95 backdrop-blur-md border-b border-gray-900 font-sans">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <span className="text-xl font-black text-white uppercase italic tracking-tighter">
            SINGARAJA <span className="text-blue-600 group-hover:text-blue-400 transition-colors">UMKM</span>
          </span>
        </Link>

        {/* MENU UTAMA - TETAP UTUH */}
        <div className="hidden md:flex items-center space-x-8 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
          <Link href="/katalog" className="hover:text-white transition-colors">Katalog UMKM</Link>
          
          {/* Kategori Usaha Dropdown */}
          <div className="group relative cursor-pointer flex items-center gap-1 hover:text-white transition-colors py-2">
            Kategori Usaha <FaChevronDown className="text-[8px]" />
            <div className="absolute top-full left-0 hidden group-hover:block bg-[#0f172a] border border-gray-800 p-2 w-48 rounded-xl shadow-2xl text-white">
              <Link href="/katalog?jenis=Kuliner" className="block px-4 py-3 hover:bg-blue-600 rounded-lg text-[10px]">KULINER</Link>
              <Link href="/katalog?jenis=Fashion" className="block px-4 py-3 hover:bg-blue-600 rounded-lg text-[10px]">FASHION</Link>
              <Link href="/katalog?jenis=Jasa" className="block px-4 py-3 hover:bg-blue-600 rounded-lg text-[10px]">JASA</Link>
              <Link href="/katalog?jenis=Kerajinan" className="block px-4 py-3 hover:bg-blue-600 rounded-lg text-[10px]">KERAJINAN</Link>
            </div>
          </div>

          {/* Jenis UMKM Dropdown */}
          <div className="group relative cursor-pointer flex items-center gap-1 hover:text-white transition-colors py-2">
            Jenis UMKM <FaChevronDown className="text-[8px]" />
            <div className="absolute top-full left-0 hidden group-hover:block bg-[#0f172a] border border-gray-800 p-2 w-48 rounded-xl shadow-2xl text-white">
              <Link href="/katalog?skala=Mikro" className="block px-4 py-3 hover:bg-blue-600 rounded-lg text-[10px]">USAHA MIKRO</Link>
              <Link href="/katalog?skala=Kecil" className="block px-4 py-3 hover:bg-blue-600 rounded-lg text-[10px]">USAHA KECIL</Link>
              <Link href="/katalog?skala=Menengah" className="block px-4 py-3 hover:bg-blue-600 rounded-lg text-[10px]">USAHA MENENGAH</Link>
            </div>
          </div>

          <Link href="/daftar-umkm" className="hover:text-white transition-colors">Daftar UMKM</Link>
        </div>

        {/* AREA AUTH - PERBAIKAN CLICKABILITY */}
        <div className="flex items-center gap-4 relative z-[1000]">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pl-4 rounded-2xl shadow-xl">
              <div className="text-right hidden sm:block">
                <p className="text-blue-500 text-[7px] font-black uppercase tracking-widest leading-none mb-1">
                  {user?.role === 'admin' ? 'Administrator' : 'Verified Member'}
                </p>
                <p className="text-white text-[10px] font-bold uppercase truncate max-w-[100px]">{user?.name}</p>
              </div>
              
              {/* TOMBOL ADMIN - Penambahan properti hover & scale agar interaktif */}
              {user?.role === 'admin' && (
                <Link 
                  href="/admin/dashboard" 
                  className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:scale-110 active:scale-95 flex items-center justify-center relative z-[1010]"
                >
                  <FaUserShield size={14} />
                </Link>
              )}

              {/* TOMBOL LOGOUT */}
              <button 
                onClick={handleLogout} 
                className="p-2.5 bg-gray-800 text-gray-400 border border-gray-700 rounded-xl hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center relative z-[1010]"
              >
                <FaSignOutAlt size={14} />
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg transition-all">
              <FaUserCircle className="text-sm" /> LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}