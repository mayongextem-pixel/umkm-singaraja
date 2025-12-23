"use client";

import { useState } from "react";
import FrontpageLayout from "@/components/layouts/FrontpageLayout";
import { FaUser, FaLock, FaSpinner, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { getApiUrl } from "@/config/api";
import Link from "next/link";

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
      const res = await fetch(getApiUrl("/login"), {
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

        const userRole = data.user.role ? data.user.role.toLowerCase() : 'user';

        toast.success(`Selamat datang, ${data.user.name}!`);

        setTimeout(() => {
          if (userRole === 'admin') {
            window.location.replace("/admin/dashboard");
          } else {
            window.location.replace("/umkm/dashboard");
          }
        }, 800);

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
      <div className="bg-[#050505] min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full">
          <div className="bg-[#0a0a0a] border border-gray-900 shadow-2xl rounded-[2.5rem] p-10">

            <div className="text-center mb-10">
              <div className="inline-block bg-blue-600/10 p-4 rounded-2xl mb-4">
                <FaUser className="text-blue-600 size-6" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                Member <span className="text-blue-600">Login</span>
              </h2>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
                Masuk untuk mengelola atau mendaftar UMKM
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase">
                <FaExclamationCircle /> {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL@DOMAIN.COM"
                  className="w-full bg-black border border-gray-900 rounded-2xl p-4 pl-12 text-white text-xs font-bold focus:border-blue-600 outline-none transition-all placeholder:text-gray-800"
                  required
                />
              </div>

              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  className="w-full bg-black border border-gray-900 rounded-2xl p-4 pl-12 pr-12 text-white text-xs font-bold focus:border-blue-600 outline-none transition-all placeholder:text-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all flex justify-center items-center text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50 mt-4"
              >
                {loading ? <FaSpinner className="animate-spin text-lg" /> : "MASUK SEKARANG"}
              </button>

              <div className="text-center mt-8">
                <p className="text-gray-600 text-[9px] font-bold uppercase tracking-wider">
                  Belum punya akun?{" "}
                  <Link href="/auth/register" className="text-blue-600 hover:text-white transition-colors underline">
                    Daftar di sini
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FrontpageLayout>
  );
}