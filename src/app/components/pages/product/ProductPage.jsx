// src/app/components/pages/product/ProductPage.jsx

"use client";
// Menggunakan Path Relatif (Naik dua tingkat dari pages/product ke components/)
import FrontpageLayout from "../../layouts/FrontpageLayout"; 
import ProductCard from "../../ui/card/ProductCard";
import FetchError from "../../ui/error/FetchError";

export default function ProductPageContent() {
  const productList = [
    // Data dummy dipertahankan
    {
      id: 1,
      name: "Kopi Arabika Buleleng (150gr)",
      description: "Biji kopi pilihan dari perkebunan Buleleng. Rasa kaya dan aroma khas.",
      image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&q=80&w=1170",
      price: "55000.00",
      stock: 15,
      slug: "kopi-arabika-buleleng",
      umkm: { id: 101, name: "Kopi Mandira" }, 
      category: { id: 1, name: "Kuliner" },
    },
    {
      id: 2,
      name: "Tas Anyam Lontar (Medium)",
      description: "Tas tangan dari anyaman lontar khas Singaraja. Cocok untuk acara formal.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1171",
      price: "150000.00",
      stock: 0,
      slug: "tas-anyam-lontar",
      umkm: { id: 102, name: "Kerajinan Buleleng Ayu" }, 
      category: { id: 2, name: "Fashion" },
    },
  ];

  return (
    <FrontpageLayout>
      <div className="flex flex-col gap-4 w-full px-4">
        <div className="flex justify-between items-center gap-2">
          <h3 className="font-bold text-gray-800 text-3xl text-start mb-4">
            Katalog Produk UMKM
          </h3>

          <form className="w-1/2 sm:w-1/3">
            {/* ... Form Pencarian ... */}
          </form>
        </div>

        {productList.length === 0 && (
          <FetchError text={"Produk tidak ditemukan"} />
        )}

        {productList.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </FrontpageLayout>
  );
}