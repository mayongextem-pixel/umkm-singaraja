import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Default XAMPP
  password: '',      // Default XAMPP (kosong)
  database: 'db_singaraja_umkm', // GANTI dengan nama database Anda di phpMyAdmin
});