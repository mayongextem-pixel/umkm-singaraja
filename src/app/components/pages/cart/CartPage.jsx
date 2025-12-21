"use client";
import FrontpageLayout from "../../layouts/FrontpageLayout"; // Pastikan path relatif ini benar
import Button from "../../ui/button/Button";
import ProductCartCard from "../../ui/card/ProductCartCard";
import SummaryOrderCard from "../../ui/card/SummaryOrderCard";
import FetchError from "../../ui/error/FetchError";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export default function CartPageContent() {
  // DATA DUMMY STATIS DIKEMBALIKAN
  const carts = [
    {
      id: 1,
      name: "Smartphone Android Terbaru",
      description:
        "Ponsel pintar dengan kamera 108MP dan RAM 8GB. Performa tinggi untuk gaming dan multitasking.",
      image:
        "https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      price: "5999000.00",
      stock: 15,
      slug: "smartphone-android-terbaru-OfxcQ",
      category: {
        id: 1,
        name: "Elektronik",
        description: "Produk-produk seperti ponsel, laptop, dan TV.",
        created_at: "2025-11-03 08:06:01",
        updated_at: "2025-11-03 08:06:01",
      },
      created_at: "2025-11-03 08:06:01",
      updated_at: "2025-11-03 08:06:01",
      quantity: 1,
      isSelected: false,
    },
    {
      id: 2,
      name: "Laptop Ultra Tipis 13 Inci",
      description:
        "Laptop ringan dan portabel. Ideal untuk profesional yang sering bepergian.",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
      price: "12500000.00",
      stock: 0,
      slug: "laptop-ultra-tipis-13-inci-Dr7oL",
      category: {
        id: 1,
        name: "Elektronik",
        description: "Produk-produk seperti ponsel, laptop, dan TV.",
        created_at: "2025-11-03 08:06:01",
        updated_at: "2025-11-03 08:06:01",
      },
      created_at: "2025-11-03 08:06:01",
      updated_at: "2025-11-03 08:06:01",
      quantity: 2,
      isSelected: true,
    },
  ]; // DATA DUMMY END

  return (
    <FrontpageLayout>
      <h3 className="font-bold text-gray-800 text-3xl text-start px-4 mb-4">
        Keranjang
      </h3>
      {!carts.length ? (
        <div className="flex flex-col gap-4 items-center">
          <FetchError text="Produk tidak ditemukan, silahkan tambahkan produk ke keranjang" />
          <Link href={"/products"}>
            <Button>
              Belanja Sekarang
              <FaArrowRightLong />
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div
            key={carts.length}
            className="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6 px-4"
          >
            <div className="lg:col-span-2 space-y-6">
              {carts.map((cart, index) => (
                <ProductCartCard key={index} productCart={cart} />
              ))}
            </div>

            <SummaryOrderCard />
          </div>
          <div className="p-4">
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Bersihkan Keranjang
            </button>
          </div>
        </>
      )}
    </FrontpageLayout>
  );
}