"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FrontpageLayout from "@/components/layouts/FrontpageLayout";
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaStore, FaSignOutAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { getApiUrl, getImageUrl } from "@/config/api";

export default function UmkmDashboard() {
    const [umkms, setUmkms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (!token || user?.role !== "umkm") {
            toast.error("Akses Ditolak! Silakan login sebagai UMKM.");
            router.push("/auth/login");
            return;
        }

        fetchMyUmkms();
    }, []);

    const fetchMyUmkms = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(getApiUrl("/my-umkm"), {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });
            const result = await response.json();

            if (result.success) {
                setUmkms(result.data);
            }
        } catch (error) {
            console.error("Gagal mengambil data:", error);
            toast.error("Gagal memuat data dari server.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, nama) => {
        const token = localStorage.getItem("token");

        if (confirm(`Apakah Anda yakin ingin menghapus UMKM: ${nama}?`)) {
            try {
                const response = await fetch(getApiUrl(`/produk/${id}`), {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Accept": "application/json"
                    },
                });

                if (response.ok) {
                    toast.success("UMKM berhasil dihapus!");
                    fetchMyUmkms();
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
            pending: { color: "yellow", icon: FaClock, text: "Menunggu Persetujuan" },
            approved: { color: "green", icon: FaCheckCircle, text: "Disetujui" },
            rejected: { color: "red", icon: FaTimesCircle, text: "Ditolak" }
        };
        const badge = badges[status] || badges.pending;
        const Icon = badge.icon;

        return (
            <span className={`inline-flex items-center gap-2 bg-${badge.color}-500/10 text-${badge.color}-500 border border-${badge.color}-500/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider`}>
                <Icon className="size-3" /> {badge.text}
            </span>
        );
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
                                    <FaStore className="text-white text-xl" />
                                </div>
                                <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                                    MY <span className="text-blue-600 not-italic">UMKM</span>
                                </h1>
                            </div>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Kelola Pendaftaran UMKM Anda
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => router.push("/daftar-umkm")}
                                className="flex items-center gap-2 text-[10px] font-black text-blue-500 border border-blue-500/20 px-6 py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all uppercase tracking-widest shadow-lg shadow-blue-500/5"
                            >
                                <FaPlus /> Daftar UMKM Baru
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-[10px] font-black text-red-500 border border-red-500/20 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest shadow-lg shadow-red-500/5"
                            >
                                <FaSignOutAlt /> Keluar
                            </button>
                        </div>
                    </div>

                    {/* Tabel Konten */}
                    <div className="overflow-x-auto bg-[#0a0a0a] border border-gray-900 rounded-[2rem] shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-900 bg-gray-900/20">
                                    <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Foto</th>
                                    <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Informasi UMKM</th>
                                    <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Kategori</th>
                                    <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                                    <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-32 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <FaSpinner className="animate-spin text-blue-600 size-10" />
                                                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">Memuat Data...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : umkms.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-20 text-center text-gray-600 uppercase text-[10px] font-bold tracking-widest">
                                            Belum ada UMKM yang didaftarkan.
                                        </td>
                                    </tr>
                                ) : (
                                    umkms.map((item) => (
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
                                                    Rp {item.harga ? Number(item.harga).toLocaleString('id-ID') : "0"}
                                                </p>
                                            </td>
                                            <td className="p-6">
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-900 w-fit px-2 py-0.5 rounded">
                                                    {item.kategori}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                {getStatusBadge(item.status)}
                                            </td>
                                            <td className="p-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {item.status === 'pending' && (
                                                        <button
                                                            onClick={() => router.push(`/umkm/edit/${item.id}`)}
                                                            className="bg-blue-500/10 text-blue-500 p-3 rounded-xl border border-blue-500/20 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-90"
                                                            title="Edit UMKM"
                                                        >
                                                            <FaEdit className="size-3" />
                                                        </button>
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
                            Dashboard UMKM Singaraja
                        </p>
                    </div>
                </div>
            </div>
        </FrontpageLayout>
    );
}
