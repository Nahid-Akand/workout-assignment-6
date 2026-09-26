import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-7 md:flex-row lg:px-8">
        {/* Left */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FitLog logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />

          <span className="text-xl font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* Right */}
        <p className="text-center text-xs text-white/50 md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

