"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FrontpageLayout from "@/components/layouts/FrontpageLayout";
import { FaTrash, FaWhatsapp, FaSpinner, FaUserShield, FaSignOutAlt, FaEdit, FaCheck, FaTimes, FaClock, FaCheckCircle, FaTimesCircle, FaFilter } from "react-icons/fa";
import toast from "react-hot-toast";
import { getApiUrl, getImageUrl } from "@/config/api";

export default function AdminDashboard() {
  const [produks, setProduks] = useState([]);
  const [filteredProduks, setFilteredProduks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || user?.role !== "admin") {
      toast.error("Akses Ditolak! Khusus Administrator.");
      router.push("/auth/login");
      return;
    }

    fetchProduks();
  }, []);

  useEffect(() => {
    // Filter data based on status
    if (statusFilter === "all") {
      setFilteredProduks(produks);
    } else {
      setFilteredProduks(produks.filter(p => p.status === statusFilter));
    }
  }, [statusFilter, produks]);

  const fetchProduks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(getApiUrl("/admin/produk"), {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      const result = await response.json();

      if (result.success) {
        setProduks(result.data);
        setFilteredProduks(result.data);
      } else {
        toast.error("Gagal memuat data");
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      toast.error("Gagal memuat data dari server.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, nama) => {
    const token = localStorage.getItem("token");

    if (confirm(`Setujui UMKM: ${nama}?`)) {
      try {
        const response = await fetch(getApiUrl(`/produk/${id}/approve`), {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          },
        });

        if (response.ok) {
          toast.success("UMKM berhasil disetujui!");
          fetchProduks();
        } else {
          toast.error("Gagal menyetujui data.");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan jaringan.");
      }
    }
  };

  const handleReject = async (id, nama) => {
    const token = localStorage.getItem("token");

    if (confirm(`Tolak UMKM: ${nama}?`)) {
      try {
        const response = await fetch(getApiUrl(`/produk/${id}/reject`), {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          },
        });

        if (response.ok) {
          toast.success("UMKM ditolak.");
          fetchProduks();
        } else {
          toast.error("Gagal menolak data.");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan jaringan.");
      }
    }
  };

  const handleDelete = async (id, nama) => {
    const token = localStorage.getItem("token");

    if (confirm(`Apakah Anda yakin ingin menghapus data UMKM: ${nama}?`)) {
      try {
        const response = await fetch(getApiUrl(`/produk/${id}`), {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          },
        });

        if (response.ok) {
          toast.success("Data UMKM berhasil dihapus!");
          fetchProduks();
        } else {
          toast.error("Gagal menghapus data.");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan jaringan.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Berhasil keluar.");
    router.push("/auth/login");
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: "bg-yellow-500/10", text: "text-yellow-500", border: "border-yellow-500/20", icon: FaClock, label: "Pending" },
      approved: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/20", icon: FaCheckCircle, label: "Approved" },
      rejected: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20", icon: FaTimesCircle, label: "Rejected" }
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-2 ${badge.bg} ${badge.text} border ${badge.border} px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider`}>
        <Icon className="size-3" /> {badge.label}
      </span>
    );
  };

  const getStatsCount = (status) => {
    if (status === "all") return produks.length;
    return produks.filter(p => p.status === status).length;
  };

  return (
    <FrontpageLayout>
      <div className="bg-black min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

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
                Sistem Manajemen & Persetujuan UMKM Singaraja
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[10px] font-black text-red-500 border border-red-500/20 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest shadow-lg shadow-red-500/5"
            >
              <FaSignOutAlt /> Keluar Sistem
            </button>
          </div>

          {/* Stats & Filter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => setStatusFilter("all")}
              className={`p-4 rounded-2xl border-2 transition-all ${statusFilter === "all" ? "border-blue-600 bg-blue-600/10" : "border-gray-900 bg-[#0a0a0a]"}`}
            >
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Total UMKM</p>
              <p className="text-white text-2xl font-black">{getStatsCount("all")}</p>
            </button>

            <button
              onClick={() => setStatusFilter("pending")}
              className={`p-4 rounded-2xl border-2 transition-all ${statusFilter === "pending" ? "border-yellow-600 bg-yellow-600/10" : "border-gray-900 bg-[#0a0a0a]"}`}
            >
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Pending</p>
              <p className="text-yellow-500 text-2xl font-black">{getStatsCount("pending")}</p>
            </button>

            <button
              onClick={() => setStatusFilter("approved")}
              className={`p-4 rounded-2xl border-2 transition-all ${statusFilter === "approved" ? "border-green-600 bg-green-600/10" : "border-gray-900 bg-[#0a0a0a]"}`}
            >
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Approved</p>
              <p className="text-green-500 text-2xl font-black">{getStatsCount("approved")}</p>
            </button>

            <button
              onClick={() => setStatusFilter("rejected")}
              className={`p-4 rounded-2xl border-2 transition-all ${statusFilter === "rejected" ? "border-red-600 bg-red-600/10" : "border-gray-900 bg-[#0a0a0a]"}`}
            >
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">Rejected</p>
              <p className="text-red-500 text-2xl font-black">{getStatsCount("rejected")}</p>
            </button>
          </div>

          {/* Tabel Konten */}
          <div className="overflow-x-auto bg-[#0a0a0a] border border-gray-900 rounded-[2rem] shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-900 bg-gray-900/20">
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Foto</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Informasi UMKM</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Pemilik</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Kategori</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                  <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <FaSpinner className="animate-spin text-blue-600 size-10" />
                        <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Sinkronisasi Data...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProduks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-20 text-center text-gray-600 uppercase text-[10px] font-bold tracking-widest">
                      {statusFilter === "all" ? "Belum ada data pendaftaran yang masuk." : `Tidak ada UMKM dengan status ${statusFilter}.`}
                    </td>
                  </tr>
                ) : (
                  filteredProduks.map((item) => (
                    <tr key={item.id} className="border-b border-gray-900/50 hover:bg-white/[0.01] transition-colors group">
                      <td className="p-6">
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-gray-800">
                          <img
                            src={getImageUrl(item.foto_produk)}
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
                        <p className="text-gray-400 text-[10px] font-bold">
                          {item.user?.name || "Unknown"}
                        </p>
                        <p className="text-gray-600 text-[9px]">
                          {item.user?.email || "-"}
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
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="p-6 text-center">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          {item.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(item.id, item.nama_produk)}
                                className="bg-green-500/10 text-green-500 p-3 rounded-xl border border-green-500/20 hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/20 transition-all active:scale-90"
                                title="Setujui"
                              >
                                <FaCheck className="size-3" />
                              </button>
                              <button
                                onClick={() => handleReject(item.id, item.nama_produk)}
                                className="bg-orange-500/10 text-orange-500 p-3 rounded-xl border border-orange-500/20 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/20 transition-all active:scale-90"
                                title="Tolak"
                              >
                                <FaTimes className="size-3" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(item.id, item.nama_produk)}
                            className="bg-red-500/10 text-red-500 p-3 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all active:scale-90"
                            title="Hapus UMKM"
                          >
                            <FaTrash className="size-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-[9px] font-bold uppercase tracking-[0.3em]">
              Sistem Manajemen UMKM Singaraja v2.0 - Approval Workflow
            </p>
          </div>
        </div>
      </div>
    </FrontpageLayout>
  );
}