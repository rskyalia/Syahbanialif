import Link from "next/link";
import Button from "@/components/ui/button";

export const metadata = {
  title: "404 — Halaman Tidak Ditemukan",
  description: "Halaman yang kamu cari tidak ada atau sudah dipindahkan.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="text-center px-6">
        {/* 404 number */}
        <p
          className="font-display font-bold leading-none"
          style={{
            fontSize:   "clamp(5rem, 20vw, 10rem)",
            color:      "var(--color-mint)",
            opacity:    0.15,
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          404
        </p>

        <h1
          className="font-display font-bold text-3xl sm:text-4xl -mt-6 mb-4"
          style={{ color: "var(--color-ink)" }}
        >
          Halaman Tidak Ditemukan
        </h1>

        <p
          className="max-w-md mx-auto text-base mb-8 leading-relaxed"
          style={{ color: "var(--color-ink-muted)" }}
        >
          Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>

        <Button as={Link} href="/" variant="primary" size="lg">
          Kembali ke Beranda
        </Button>
      </div>
    </main>
  );
}
