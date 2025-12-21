"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FrontpageLayout from "../../../components/layouts/FrontpageLayout";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaSpinner, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", alamat: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        // FITUR BARU: Tangkap error validasi spesifik Laravel
        const msg = data.errors ? Object.values(data.errors).flat()[0] : data.message;
        setError(msg || "Gagal melakukan pendaftaran.");
      }
    } catch (err) {
      setError("Koneksi gagal. Pastikan Backend aktif.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FrontpageLayout>
      <div className="bg-[#050505] min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full">
          <div className="bg-[#0a0a0a] border border-gray-900 shadow-2xl rounded-[2.5rem] p-10">
            <div className="text-center mb-10">
              <div className="inline-block bg-blue-600/10 p-4 rounded-2xl mb-4">
                <FaUser className="text-blue-600 size-6" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Create <span className="text-blue-600">Account</span></h2>
            </div>

            {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase"><FaExclamationCircle /> {error}</div>}
            {success && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500 text-[10px] font-bold uppercase"><FaCheckCircle /> Berhasil! Mengalihkan ke Login...</div>}

            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="NAMA LENGKAP" className="w-full bg-black border border-gray-900 rounded-2xl p-4 pl-12 text-white text-xs font-bold focus:border-blue-600 outline-none transition-all" required />
              </div>

              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="EMAIL@DOMAIN.COM" className="w-full bg-black border border-gray-900 rounded-2xl p-4 pl-12 text-white text-xs font-bold focus:border-blue-600 outline-none transition-all" required />
              </div>

              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="PASSWORD" className="w-full bg-black border border-gray-900 rounded-2xl p-4 pl-12 text-white text-xs font-bold focus:border-blue-600 outline-none transition-all" required />
              </div>

              <div className="relative group">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-600" />
                <textarea name="alamat" value={formData.alamat} onChange={handleChange} placeholder="ALAMAT LENGKAP" rows="2" className="w-full bg-black border border-gray-900 rounded-2xl p-4 pl-12 text-white text-xs font-bold focus:border-blue-600 outline-none transition-all resize-none" required />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all flex justify-center items-center text-[10px] uppercase tracking-[0.2em] active:scale-95 disabled:opacity-50">
                {loading ? <FaSpinner className="animate-spin" /> : "Register Now"}
              </button>
            </form>
            <div className="mt-8 text-center text-gray-600 text-[10px] font-bold uppercase underline hover:text-white transition-colors">
                <Link href="/auth/login">Sudah punya akun? Login</Link>
            </div>
          </div>
        </div>
      </div>
    </FrontpageLayout>
  );
}