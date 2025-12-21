"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FrontpageLayout from "../components/layouts/FrontpageLayout"; 
import { FaStore, FaImage, FaSpinner, FaWhatsapp, FaMapMarkerAlt, FaInfoCircle, FaMoneyBillWave } from "react-icons/fa";
import toast from "react-hot-toast";

export default function DaftarUmkmPage() {
  const router = useRouter();
  // DEKLARASI STATE (Wajib ada agar tidak error "not defined")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    nama_produk: "",
    harga: "",
    kategori: "Kuliner",
    skala_usaha: "Mikro",
    whatsapp: "",
    alamat: "",
    deskripsi: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return toast.error("Silahkan login terlebih dahulu");
    
    setLoading(true);
    const token = localStorage.getItem("token");
    const dataToSend = new FormData();
    
    Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
    if (foto) dataToSend.append("foto_produk", foto);

    try {
      // Pastikan endpoint mengarah ke controller yang benar
      const res = await fetch("http://127.0.0.1:8000/api/produk", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: dataToSend,
      });

      if (res.ok) {
        toast.success("Berhasil mendaftar UMKM!");
        router.push("/katalog");
      } else { 
        const errData = await res.json();
        toast.error(errData.message || "Gagal mendaftar."); 
      }
    } catch (err) { 
      toast.error("Koneksi ke server gagal."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <FrontpageLayout>
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
        <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter text-center mb-10">
          DAFTAR <span className="text-blue-600">UMKM BARU</span>
        </h1>

        <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-gray-900 p-8 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Overlay Login jika belum masuk */}
          {!isLoggedIn && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md rounded-[2.5rem] p-6 text-center">
              <p className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Anda harus login terlebih dahulu untuk mendaftar UMKM.</p>
              <button 
                type="button" 
                onClick={() => router.push('/auth/login')} 
                className="bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all"
              >
                LOGIN UNTUK MENDAFTAR
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2">Nama UMKM / Usaha</label>
              <div className="relative">
                <FaStore className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                <input name="nama_produk" onChange={handleChange} className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 text-xs" placeholder="Nama Toko/Usaha..." required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2">Estimasi Harga (Rp)</label>
              <div className="relative">
                <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                <input name="harga" type="number" onChange={handleChange} className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 text-xs" placeholder="35000" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2">Kategori Usaha</label>
              <select name="kategori" onChange={handleChange} className="w-full bg-black border border-gray-800 p-4 rounded-2xl text-xs uppercase font-bold outline-none focus:border-blue-600 cursor-pointer">
                <option value="Kuliner">Kuliner</option>
                <option value="Fashion">Fashion</option>
                <option value="Jasa">Jasa</option>
                <option value="Kerajinan">Kerajinan</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2">Jenis UMKM (Skala)</label>
              <select name="skala_usaha" onChange={handleChange} className="w-full bg-black border border-gray-800 p-4 rounded-2xl text-xs uppercase font-bold outline-none focus:border-blue-600 cursor-pointer">
                <option value="Mikro">Usaha Mikro</option>
                <option value="Kecil">Usaha Kecil</option>
                <option value="Menengah">Usaha Menengah</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2">WhatsApp Aktif</label>
              <div className="relative">
                <FaWhatsapp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                <input name="whatsapp" onChange={handleChange} className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 text-xs" placeholder="62812..." required />
              </div>
            </div>
          </div>

          <div className="space-y-2 text-white">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2">Alamat / Lokasi Fisik</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-700" />
              <textarea name="alamat" onChange={handleChange} className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 text-xs min-h-[80px]" placeholder="Jl. Gajah Mada No. 12..." required />
            </div>
          </div>

          <div className="space-y-2 text-white">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2">Deskripsi Produk/Jasa</label>
            <div className="relative">
              <FaInfoCircle className="absolute left-4 top-4 text-gray-700" />
              <textarea name="deskripsi" onChange={handleChange} className="w-full bg-black border border-gray-800 p-4 pl-12 rounded-2xl outline-none focus:border-blue-600 text-xs min-h-[100px]" placeholder="Jelaskan usaha Anda..." required />
            </div>
          </div>

          <div className="space-y-2 text-white">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-2">Bukti Usaha / Foto Produk</label>
            <div className="border-2 border-dashed border-gray-800 rounded-3xl p-8 text-center relative hover:border-blue-600 transition-all bg-black/50">
              <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
              {preview ? (
                <img src={preview} className="max-h-48 mx-auto rounded-xl shadow-2xl" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <FaImage className="text-4xl text-gray-800" />
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Klik untuk upload foto</p>
                </div>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 py-5 rounded-2xl text-white font-black text-[12px] uppercase tracking-[0.3em] hover:bg-blue-700 transition-all active:scale-[0.98]">
            {loading ? <FaSpinner className="animate-spin mx-auto text-xl" /> : "AJUKAN PENDAFTARAN"}
          </button>
        </form>
      </div>
    </FrontpageLayout>
  );
}