"use client";
import FrontpageLayout from "../../components/layouts/FrontpageLayout";
import Link from "next/link";
import { useState } from "react"; 
import { FaSignInAlt, FaCloudUploadAlt, FaMapMarkerAlt } from "react-icons/fa";

function UmkmRegistrationForm({ isLoggedIn }) {
    const [loading, setLoading] = useState(false);

    const buttonContent = isLoggedIn 
        ? (loading ? "Sedang Mengirim..." : "Ajukan Pendaftaran UMKM") 
        : "Login untuk Mendaftar";
        
    const buttonClass = isLoggedIn 
        ? "w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400" 
        : "w-full bg-red-600 hover:bg-red-700";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) return;

        setLoading(true);
        const formData = new FormData(e.currentTarget);

        // Maping data agar sesuai dengan request di Laravel ProdukController
        // Laravel mengharap: foto_produk, skala_usaha, dll.
        const dataToSend = new FormData();
        dataToSend.append("nama_produk", formData.get("nama_umkm"));
        dataToSend.append("harga", formData.get("harga"));
        dataToSend.append("kategori", formData.get("jenis")); // Kuliner/Fashion dll
        dataToSend.append("skala_usaha", formData.get("kategori")); // Mikro/Kecil dll
        dataToSend.append("whatsapp", formData.get("telepon"));
        dataToSend.append("alamat", formData.get("lokasi"));
        dataToSend.append("deskripsi", formData.get("deskripsi"));
        
        const fileInput = e.currentTarget.querySelector('#berkas');
        if (fileInput.files[0]) {
            dataToSend.append("foto_produk", fileInput.files[0]);
        }

        try {
            // Sesuaikan URL dengan alamat API Laravel Anda
            const response = await fetch("http://localhost:8000/api/produks", {
                method: "POST",
                body: dataToSend,
                headers: {
                    'Accept': 'application/json',
                    // Jangan set Content-Type manual saat mengirim FormData
                },
            });

            const result = await response.json();

            if (result.success) {
                alert("Selamat! UMKM Anda berhasil terdaftar.");
                e.target.reset();
            } else {
                alert("Gagal daftar: " + JSON.stringify(result.errors || result.message));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan koneksi ke server backend.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 space-y-6 border border-gray-200 dark:border-gray-700"
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl font-semibold border-b pb-2 text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Lengkapi Data Usaha Anda
            </h2>
            
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="nama_umkm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama UMKM / Usaha</label>
                        <input type="text" id="nama_umkm" name="nama_umkm" placeholder="Warung Siobak..." className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="harga" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estimasi Harga Produk (Rp)</label>
                        <input type="number" id="harga" name="harga" placeholder="35000" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="jenis" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategori Usaha</label>
                        <select id="jenis" name="jenis" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                            <option value="kuliner">Kuliner</option>
                            <option value="fashion">Fashion</option>
                            <option value="jasa">Jasa</option>
                            <option value="kerajinan">Kerajinan</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jenis UMKM (Skala)</label>
                        <select id="kategori" name="kategori" className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                            <option value="mikro">Usaha Mikro</option>
                            <option value="kecil">Usaha Kecil</option>
                            <option value="menengah">Usaha Menengah</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="telepon" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">WhatsApp Aktif (Contoh: 62812...)</label>
                    <input type="tel" id="telepon" name="telepon" placeholder="62812..." className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                </div>

                {/* --- FIELD LOKASI --- */}
                <div>
                    <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" /> Alamat / Lokasi Fisik Usaha
                    </label>
                    <textarea 
                        id="lokasi" 
                        name="lokasi" 
                        rows="2" 
                        placeholder="Contoh: Jl. Gajah Mada No. 12, Singaraja (Depan Indomaret)" 
                        className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi Produk/Jasa</label>
                    <textarea id="deskripsi" name="deskripsi" rows="3" placeholder="Jelaskan apa yang Anda jual..." className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" required></textarea>
                </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Bukti Usaha / Foto Produk</h2>
                <div className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-xl border-2 border-dashed border-blue-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-gray-700 transition duration-200">
                    <label htmlFor="berkas" className="flex flex-col items-center justify-center cursor-pointer">
                        <FaCloudUploadAlt className="text-blue-500 size-12 mb-2" />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                            Klik Untuk Upload Foto/Sertifikat
                        </span>
                        <input type="file" id="berkas" name="berkas" className="hidden" accept="image/*,.pdf" required />
                    </label>
                </div>
            </div>
            
            <div className="pt-4">
                {isLoggedIn ? (
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`${buttonClass} text-white font-bold py-4 rounded-lg transition duration-150 shadow-lg uppercase tracking-widest`}
                    >
                        {buttonContent}
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="p-3 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200" role="alert">
                            Anda harus login terlebih dahulu untuk mendaftar UMKM.
                        </div>
                        <Link href="/auth/login" className="block w-full">
                            <button type="button" className={`${buttonClass} text-white font-bold py-4 rounded-lg transition duration-150 flex items-center justify-center gap-2 shadow-lg w-full uppercase`}>
                                <FaSignInAlt /> Login untuk Mendaftar
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </form>
    );
}

export default function UmkmRegisterPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    
    return (
        <FrontpageLayout>
            <div className="max-w-screen-md mx-auto p-4 py-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
                    Pendaftaran UMKM Singaraja
                </h1>
                
                <UmkmRegistrationForm isLoggedIn={isLoggedIn} />
                
                <div className="mt-8 p-4 text-center bg-gray-100 dark:bg-gray-800 rounded-lg text-sm border border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-600 dark:text-gray-400 font-semibold">Panel Kendali Testing:</p>
                    <div className="flex justify-center gap-2">
                        <button onClick={() => setIsLoggedIn(true)} className="px-4 py-2 bg-green-600 text-white rounded-md text-xs font-bold hover:bg-green-700 uppercase">Simulasi Login</button>
                        <button onClick={() => setIsLoggedIn(false)} className="px-4 py-2 bg-red-600 text-white rounded-md text-xs font-bold hover:bg-red-700 uppercase">Simulasi Logout</button>
                    </div>
                </div>
            </div>
        </FrontpageLayout>
    );
}