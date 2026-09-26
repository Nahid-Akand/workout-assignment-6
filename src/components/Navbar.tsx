
"use client";

import Link from "next/link";
import Image from "next/image";
import { ClipboardList, Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="border-b border-white/10 bg-[#111111]">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src={logo}
            alt="FitLog logo"
            width={38}
            height={38}
            priority
            className="h-9 w-9 object-contain"
          />

          <span className="text-xl font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-sm font-bold  tracking-wider transition ${
              isWorkoutActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-bold  tracking-wider transition ${
              isPlanActive
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-2 text-xs font-black tracking-wide text-black"
          >
            <ClipboardList size={15} strokeWidth={2.5} />
            <span>Plan</span>
            <span>{plan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-2 text-xs font-black uppercase tracking-wide text-white"
          >
            <Bookmark size={15} strokeWidth={2.5} />
            <span>Saved</span>
            <span>{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
