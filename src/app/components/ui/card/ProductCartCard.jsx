// src/app/components/card/ProductCartCard.jsx

import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { FaCircleMinus, FaCirclePlus, FaStore } from "react-icons/fa6"; // Import ikon toko

export default function ProductCartCard({ productCart }) {
  return (
    <div className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center w-fit">
        {/* Checkbox untuk memilih produk saat checkout */}
        <input
          id={`checked-checkbox-${productCart.id}`}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      
      {/* MODIFIKASI 1: Tampilkan Nama UMKM di atas Produk */}
      {productCart.umkm && (
          <div className="flex items-center text-sm mb-2 text-gray-600">
              <FaStore className="mr-1 size-3 text-blue-600" />
              <Link href={`/umkm/${productCart.umkm.id}`} className="hover:underline font-medium">
                  {productCart.umkm.name}
              </Link>
          </div>
      )}
      {/* END MODIFIKASI 1 */}

      <div className="flex gap-6 sm:gap-4 max-sm:flex-col">
        <div className="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
          <img
            src={productCart.image}
            alt={`Gambar produk ${productCart.name}`}
            className="w-full h-full object-contain border rounded-sm border-gray-200"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <Link href={`/products/${productCart.id}`}>
              <h3 className="text-sm sm:text-base font-semibold text-slate-900 hover:underline">
                {productCart.name}
              </h3>
            </Link>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
              {/* Gunakan kategori/jenis usaha */}
              {productCart.category?.name || "Kategori"}
            </span>
          </div>
          {/* ... bagian lain kode tetap sama ... */}
          <div className="mt-auto">
            <h3 className="text-sm font-semibold text-slate-900">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(parseFloat(productCart.price * productCart.quantity))}
            </h3>
          </div>
        </div>
      </div>

      <div className="ml-auto flex flex-col">
        {/* Bagian hapus dan tombol kuantitas tetap sama */}
        <div className="flex items-start gap-4 justify-end">
          <button type="button">
            <FaTrashAlt className="text-red-500" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-auto">
          <button type="button" disabled={productCart.quantity === 1}>
            <FaCircleMinus
              className={`size-4 ${
                productCart.quantity === 1 ? "text-gray-400" : "text-gray-800"
              }`}
            />
          </button>
          <span className="font-semibold text-base leading-[18px]">
            {productCart.quantity}
          </span>
          <button
            type="button"
            disabled={productCart.quantity === productCart.stock}
          >
            <FaCirclePlus
              className={`size-4 ${
                productCart.quantity === productCart.stock
                  ? "text-gray-400"
                  : "text-gray-800"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}