import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Ambil data sesuai nama field di form pendaftaran
    const nama_produk = formData.get("nama_produk");
    const harga = formData.get("harga");
    const kategori = formData.get("kategori");
    const skala_usaha = formData.get("skala_usaha");
    const whatsapp = formData.get("whatsapp");
    const alamat = formData.get("alamat"); // Tambahkan alamat
    const deskripsi = formData.get("deskripsi");
    const foto = formData.get("foto_produk");

    let fileName = "";
    if (foto && foto.size > 0) {
      const bytes = await foto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fileName = Date.now() + "_" + foto.name;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);
      await writeFile(filePath, buffer);
    }

    // Query disesuaikan dengan urutan kolom di phpMyAdmin
    const query = `
      INSERT INTO umkms (nama_produk, harga, kategori, deskripsi, whatsapp, alamat, foto_produk, skala_usaha, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    const values = [
      nama_produk, 
      harga, 
      kategori, 
      deskripsi, 
      whatsapp, 
      alamat, 
      fileName, 
      skala_usaha
    ];

    await db.execute(query, values);

    return NextResponse.json({ message: "Berhasil! Data masuk ke tabel umkms." }, { status: 201 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Gagal: " + error.message }, { status: 500 });
  }
}