// src/app/components/ui/card/ProductCard.jsx (Tetap Gunakan Nama File Lama)

import Link from "next/link";
import { FaEye } from "react-icons/fa6"; // Mengganti FaBagShopping
import Button from "../button/Button";

// Kita asumsikan data yang diterima di properti 'product' adalah data UMKM
export default function ProductCard({ product }) {
  // Anggap 'product' adalah 'umkm'

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl shadow-gray-300 transition-all duration-300 ">
      {/* Link diarahkan ke detail UMKM, menggunakan rute products lama */}
      <Link href={`/products/${product.id}`}> 
        <img
          className="p-4 rounded-t-lg h-72 w-full object-contain"
          src={product.image} // Logo atau Foto UMKM
          alt={`Logo atau Foto UMKM ${product.name}`}
        />
      </Link>
      <div className="px-5 pb-5 flex flex-col gap-2">
        <Link href={`/products/${product.id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.name} {/* Nama UMKM */}
          </h5>
        </Link>
        <div className="flex justify-between gap-2 items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
            {product.jenis_usaha} {/* Jenis UMKM (Kuliner, Fashion, dll.) */}
          </span>
          <span className="text-gray-700 text-base">
            {product.lokasi} {/* Lokasi/Alamat UMKM */}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          {/* Menghapus Harga dan Stok */}
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Kategori: {product.kategori_usaha} {/* Kategori Usaha (Mikro, Kecil, Menengah) */}
          </span>

          <Link href={`/products/${product.id}`}> {/* Link ke Detail menggunakan rute lama */}
            <Button
              className="text-xs"
            >
              <FaEye className="size-4" />
              Lihat Detail UMKM {/* Mengganti Tambah ke Keranjang */}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}