// src/app/components/card/SummaryOrderCard.jsx

// Tambahkan prop 'subTotal' dan 'onCheckout'
export default function SummaryOrderCard({ subTotal = 0, onCheckout }) {
  // Biaya pengiriman bisa nol jika menggunakan metode ambil di tempat/kurir UMKM sendiri
  const SHIPMENT_COST = 0; 
  const total = subTotal + SHIPMENT_COST;

  // Fungsi format mata uang agar tidak berulang
  const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
      }).format(parseFloat(amount));
  };

  return (
    <div className="bg-white rounded-md px-4 py-6 h-max shadow-sm border border-gray-200">
      <ul className="text-slate-500 font-medium space-y-4">
        <li className="flex flex-wrap gap-4 text-sm">
          Subtotal{" "}
          <span className="ml-auto font-semibold text-slate-900">
            {formatCurrency(subTotal)}
          </span>
        </li>
        <li className="flex flex-wrap gap-4 text-sm">
          Pengiriman{" "}
          <span className="ml-auto font-semibold text-slate-900">
            {formatCurrency(SHIPMENT_COST)}
          </span>
        </li>
        <hr className="border-slate-300" />
        <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
          Total{" "}
          <span className="ml-auto">
            {formatCurrency(total)}
          </span>
        </li>
      </ul>
      <div className="mt-8 space-y-4">
        <button
          type="button"
          onClick={onCheckout} // Tambahkan fungsi handler saat tombol diklik
          disabled={subTotal === 0} // Nonaktifkan jika subTotal nol
          className={`text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-blue-800 hover:bg-blue-900 text-white rounded-md cursor-pointer disabled:opacity-50`}
        >
          Lanjut ke Checkout / Pesan Sekarang
        </button>
      </div>
    </div>
  );
}