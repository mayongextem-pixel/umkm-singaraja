// src/app/about/page.jsx
import FrontpageLayout from "../components/layouts/FrontpageLayout";

export default function AboutPage() {
  return (
    <FrontpageLayout>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Tentang Singaraja UMKM Center
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p className="text-lg">
              <span className="font-bold text-blue-600">Singaraja UMKM Center</span> adalah inisiatif digital yang bertujuan untuk memperkuat ekosistem wirausaha di Kabupaten Buleleng.
            </p>
            <p>
              Kami menyediakan panggung digital bagi pelaku usaha mikro, kecil, dan menengah untuk memamerkan produk terbaik mereka, mulai dari kuliner khas Bali hingga kerajinan tangan yang kreatif.
            </p>
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="italic font-medium">
                {"\"Mendorong UMKM Go Digital, Memajukan Ekonomi Buleleng.\""}
              </p>
            </div>
          </div>

          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-video flex items-center justify-center overflow-hidden shadow-xl">
            {/* Anda bisa mengganti ini dengan <img src="/about-image.jpg" /> nantinya */}
            <span className="text-gray-400 italic">Gambar Ilustrasi UMKM</span>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-10 dark:text-white">Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-bold mb-2 dark:text-white">Kemudahan Daftar</h3>
              <p className="text-sm text-gray-500">Proses pendaftaran cepat dan mudah bagi semua pelaku usaha.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="font-bold mb-2 dark:text-white">Mudah Ditemukan</h3>
              <p className="text-sm text-gray-500">Produk Anda akan masuk ke dalam katalog pencarian publik.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-bold mb-2 dark:text-white">Gratis</h3>
              <p className="text-sm text-gray-500">Layanan ini disediakan secara gratis untuk mendukung ekonomi lokal.</p>
            </div>
          </div>
        </div>
      </div>
    </FrontpageLayout>
  );
}