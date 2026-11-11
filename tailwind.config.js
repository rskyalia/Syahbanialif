/**
 * tailwind.config.js
 *
 * Tailwind CSS v4 — kebanyakan konfigurasi (colors, spacing, typography)
 * dikelola langsung di app/globals.css via @theme dan @utility.
 *
 * File ini hanya digunakan untuk:
 * - Mendefinisikan content paths (agar class scanning bekerja)
 * - Custom utilities / plugins yang belum bisa dilakukan via CSS
 *
 * JANGAN tambahkan color/font/spacing tokens di sini —
 * semuanya sudah ada di globals.css @theme.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './animations/**/*.{js,jsx}',
  ],
};
