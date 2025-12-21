"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FrontpageLayout from "@/components/layouts/FrontpageLayout";
import { FaTrash, FaWhatsapp, FaSpinner, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [produks, setProduks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. PROTEKSI HALAMAN & AMBIL DATA
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Cek apakah ada token dan apakah role-nya admin
    if (!token || user?.role !== "admin") {
      toast.error("Akses Ditolak! Khusus Administrator.");
      router.push("/auth/login"); // Tendang balik ke login
      return;
    }
    
    fetchProduks();
  }, []);

  const fetchProduks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/produk", {
        headers: {
          "Accept": "application/json"
        }
      });
      const result = await response.json();
      
      if (result.success) {
        setProduks(result.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      toast.error("Gagal memuat data dari server.");
    } finally {
      setLoading(false);
    }
  };

  // 2. FUNGSI HAPUS (DELETE)
  const handleDelete = async (id, nama) => {
    const token = localStorage.getItem("token");

    if (confirm(`Apakah Anda yakin ingin menghapus data UMKM: ${nama}?`)) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/produk/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          },
        });

        if (response.ok) {
          toast.success("Data UMKM berhasil dihapus!");
          fetchProduks(); // Refresh data
        } else {
          toast.error("Gagal menghapus data.");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan jaringan.");
      }
    }
  };

  // 3. FUNGSI LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Berhasil keluar.");
    router.push("/auth/login");
  };

  return (
    <FrontpageLayout>
      <div className="bg-black min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Dashboard */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-gray-900 pb-8 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FaUserShield className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                  ADMIN <span className="text-blue-600 not-italic">DASHBOARD</span>
                </h1>
              </div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                Sistem Kontrol Data Pendaftaran UMKM Singaraja
              </p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-[10px] font-black text-red-500 border border-red-500/20 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest shadow-lg shadow-red-500/5"
            >
              <FaSignOutAlt /> Keluar Sistem
            </button>
          </div>

          {/* Tabel Konten */}
          <div className="overflow-x-auto bg-[#0a0a0a] border border-gray-900 rounded-[2rem] shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-900 bg-gray-900/20">
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Visual Usaha</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Informasi UMKM</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Kategori & Skala</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Kontak Owner</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <FaSpinner className="animate-spin text-blue-600 size-10" />
                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Sinkronisasi Data...</p>
                      </div>
                    </td>
                  </tr>
                ) : produks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-20 text-center text-gray-600 uppercase text-[10px] font-bold tracking-widest">
                      Belum ada data pendaftaran yang masuk.
                    </td>
                  </tr>
                ) : (
                  produks.map((item) => (
                    <tr key={item.id} className="border-b border-gray-900/50 hover:bg-white/[0.01] transition-colors group">
                      <td className="p-6">
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-gray-800">
                          <img 
                            src={item.foto_produk ? `http://127.0.0.1:8000/storage/${item.foto_produk}` : "/no-image.jpg"} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            alt="usaha" 
                          />
                        </div>
                      </td>
                      <td className="p-6">
                        <p className="text-white font-black uppercase text-xs tracking-tight">{item.nama_produk}</p>
                        <p className="text-blue-500 font-bold text-[10px] mt-1 italic uppercase">
                          Mulai: Rp {item.harga ? Number(item.harga).toLocaleString('id-ID') : "0"}
                        </p>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-900 w-fit px-2 py-0.5 rounded">
                            {item.kategori}
                          </span>
                          <span className="text-[9px] font-black text-blue-400 uppercase italic">
                            {item.skala_usaha}
                          </span>
                        </div>
                      </td>
                      <td className="p-6">
                        <a 
                          href={`https://wa.me/${item.whatsapp}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-green-500/10 text-green-500 px-3 py-2 rounded-lg hover:bg-green-500 hover:text-white text-[10px] font-black gap-2 transition-all uppercase tracking-tighter"
                        >
                          <FaWhatsapp className="size-3" /> {item.whatsapp}
                        </a>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => handleDelete(item.id, item.nama_produk)}
                          className="bg-red-500/10 text-red-500 p-3 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all active:scale-90"
                          title="Hapus UMKM"
                        >
                          <FaTrash className="size-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-[9px] font-bold uppercase tracking-[0.3em]">
              Sistem Manajemen UMKM Singaraja v1.0
            </p>
          </div>
        </div>
      </div>
    </FrontpageLayout>
  );
}