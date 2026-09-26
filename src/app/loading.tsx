export default function Loading() {
return ( <main className="min-h-screen bg-black px-5 py-16 text-white lg:px-8"> <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center"> <div className="text-center"> <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#ccff00]" />

      <p className="text-sm font-black uppercase tracking-[0.2em] text-white">
        Loading workouts…
      </p>

      <p className="mt-2 text-xs text-white/40">
        Getting your workout library ready
      </p>
    </div>
  </div>
</main>


);
}
