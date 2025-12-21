// src/app/components/ui/Button.jsx

import React from "react";

const baseClasses = "flex cursor-pointer items-center gap-1 focus:ring-4 focus:outline-none font-medium rounded-lg px-3 py-2 text-center";

// Definisikan variant yang sesuai dengan tema Singaraja UMKM Center
const variants = {
  primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  secondary: "text-blue-700 bg-white border border-blue-700 hover:bg-gray-100 focus:ring-blue-300",
  // Tambahkan variant lain jika diperlukan
};

export default function Button({ className, children, variant = 'primary', ...props }) {
  // Gabungkan kelas dasar dengan variant yang dipilih
  const buttonClasses = `${baseClasses} ${variants[variant]} ${className || ''}`;

  return (
    <button
      type="button"
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}