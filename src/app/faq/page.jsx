"use client";
import React from "react";
import FrontpageLayout from "../components/layouts/FrontpageLayout";

export default function FAQPage() {
  const faqs = [
    { q: "Siapa yang boleh mendaftar?", a: "Seluruh warga Singaraja yang memiliki usaha aktif." },
    { q: "Apakah pendaftaran berbayar?", a: "Tidak, platform ini disediakan gratis oleh Singaraja UMKM Center." },
    { q: "Bagaimana cara mengubah data UMKM?", a: "Anda bisa menghubungi admin melalui menu Hubungi Kami." }
  ];

  return (
    <FrontpageLayout>
      <div className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white uppercase tracking-tight">FAQ (Tanya Jawab)</h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="font-bold text-blue-600 mb-2">Q: {faq.q}</h3>
              <p className="text-gray-600 dark:text-gray-400">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </FrontpageLayout>
  );
}