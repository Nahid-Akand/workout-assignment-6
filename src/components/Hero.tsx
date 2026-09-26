import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import banner from "@/assets/banner.png";

export default function Hero() {
return ( <section className="bg-[#000000] px-5 pb-12 pt-8 lg:px-8 lg:pb-16 lg:pt-10"> <div className="mx-auto max-w-7xl"> <div className="overflow-hidden rounded-2xl bg-[#15171D]"> <div className="grid min-h-[520px] items-center lg:grid-cols-2">


        
        <div className="px-6 py-12 md:px-12 lg:px-16 lg:py-16">
          <div className="mb-5 inline-flex bg-black/40 px-4 py-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              WORKOUT LIBRARY
            </span>
          </div>

          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl">
            TRAIN WITH INTENT. LOG
            <br />
            <span className="text-[#ccff00]">EVERY SET.</span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock
            it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="mt-8">
            <Link
              href="#library"
              className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
            >
              <ArrowDown size={17} strokeWidth={2.5} />
              <span>BROWSE WORKOUTS</span>
            </Link>
          </div>
        </div>

        
        <div className="relative flex h-full min-h-[320px] items-center justify-center px-6 pb-8 lg:min-h-[520px] lg:px-8 lg:pb-0">
          <Image
            src={banner}
            alt="FitLog workout"
            priority
            className="h-auto w-full max-w-[520px] object-contain"
          />
        </div>

      </div>
    </div>
  </div>
</section>


);
}
