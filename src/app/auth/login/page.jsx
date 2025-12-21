"use client";

import { useState } from "react";
import FrontpageLayout from "@/components/layouts/FrontpageLayout"; 
import { FaUser, FaLock, FaSpinner, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const token = data.access_token || data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Simpan role ke variabel lokal untuk pengecekan cepat
        const userRole = data.user.role ? data.user.role.toLowerCase() : 'user';

        toast.success(`Selamat datang, ${data.user.name}!`);

        setTimeout(() => {
          if (userRole === 'admin') {
            // Gunakan replace agar history login tidak bisa di "back"
            window.location.replace("/admin/dashboard");
          } else {
            window.location.replace("/daftar-umkm");
          }
        }, 800); // Delay sebentar agar toast muncul dulu

      } else {
        setError(data.message || "Email atau Password salah.");
        toast.error("Login Gagal!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server tidak merespons. Pastikan Backend Laravel menyala.");
      toast.error("Koneksi gagal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FrontpageLayout>
      <div className="bg-black min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full">
          <div className="bg-[#0a0a0a] border border-gray-900 shadow-2xl rounded-[2.5rem] p-10">
            <div className="text-center mb-10">
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                MEMBER <span className="text-blue-600">LOGIN</span>
              </h1>
              <p className="text-gray-500 text-[9px] font-bold tracking-[0.3em] uppercase mt-2">
                Masuk untuk mengelola atau mendaftar UMKM
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase">
                <FaExclamationCircle className="shrink-0" /> {error}
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Email</label>
                <div className="relative group">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="EMAIL" 
                    className="w-full bg-black border border-gray-900 rounded-2xl p-4 pl-12 text-white text-xs font-bold focus:border-blue-600 outline-none transition-all" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-600 tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-600 transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="PASSWORD" 
                    className="w-full bg-black border border-gray-900 rounded-2xl p-4 pl-12 pr-12 text-white text-xs font-bold focus:border-blue-600 outline-none transition-all" 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 hover:text-white transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all flex justify-center items-center text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? <FaSpinner className="animate-spin text-lg" /> : "MASUK SEKARANG"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </FrontpageLayout>
  );
}