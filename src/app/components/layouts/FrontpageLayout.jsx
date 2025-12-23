// src/app/components/layouts/FrontpageLayout.jsx (TIDAK ADA PERUBAHAN)

import { Toaster } from "react-hot-toast";
// Path relatif dari 'layouts' ke 'ui/footer'
import FrontpageFooter from "../ui/footer/FrontpageFooter";
// Path relatif dari 'layouts' ke 'ui/navbar'
import FrontpageNavbar from "../ui/navbar/FrontpageNavbar";

export default function FrontpageLayout({ children }) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <FrontpageNavbar />
      <main className="min-h-[60vh] mt-24 mb-16 max-w-screen-xl mx-auto px-4">
        {children}
      </main>
      <FrontpageFooter />
    </>
  );
}