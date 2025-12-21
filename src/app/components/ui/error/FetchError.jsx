import React from "react";
import { BiSolidError } from "react-icons/bi";

export default function FetchError({ text = "Terjadi Kesalahan" }) {
  return (
    <div className="flex flex-col items-center">
      <BiSolidError className="size-16 text-red-600" />
      <p className="text-red-600 text-base">{text}</p>
    </div>
  );
}