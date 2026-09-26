import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import { getWorkouts } from "@/lib/api";

export default async function Home() {
const workouts = await getWorkouts();

return ( <main className="bg-[#000000]"> <Hero />


  <section
    id="library"
    className="mx-auto max-w-7xl px-5 py-16 lg:px-8"
  >
    <div className="mb-10">
      <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
        THE LIBRARY
      </h2>

      <p className="mt-3 max-w-xl text-white/60">
        Twelve lifts covering every major muscle group.
      </p>
    </div>
      <div>
        <WorkoutLibrary workouts={workouts} />
      </div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  </section>
</main>


);
}
