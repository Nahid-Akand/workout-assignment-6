import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutActions from "@/components/WorkoutActions";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          href="/#workouts"
          className="mb-8 inline-flex text-sm font-bold uppercase tracking-wider text-white/50 transition hover:text-[#ccff00]"
        >
          ← Back to Library
        </Link>

        {/* Main Details */}
        <div className="grid overflow-hidden rounded-2xl bg-[#15171D] lg:grid-cols-2">

          {/* LEFT - IMAGE */}
          <div className="relative min-h-[350px] lg:min-h-[720px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* RIGHT - CONTENT */}
          <div className="p-6 md:p-10 lg:p-12">

            {/* Small heading */}
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white">
              WORKOUT {String(workout.id).padStart(2, "0")}
            </p>

            {/* Workout name */}
            <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-6 text-sm leading-7 text-white/60 md:text-base">
              {workout.description}
            </p>

            {/* Muscle groups */}
            <div className="mt-7 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* WORKOUT INFO CARD */}
            <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-black/20">

              {/* Equipment */}
              <div className="grid grid-cols-2 border-b border-white/10 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Equipment
                </p>

                <p className="text-right text-sm font-semibold text-white">
                  {workout.equipment}
                </p>
              </div>

              {/* Difficulty */}
              <div className="grid grid-cols-2 border-b border-white/10 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Difficulty
                </p>

                <p className="text-right text-sm font-semibold uppercase text-white">
                  {workout.difficulty}
                </p>
              </div>

              {/* Sets */}
              <div className="grid grid-cols-2 border-b border-white/10 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Sets
                </p>

                <p className="text-right text-sm font-bold text-white">
                  {workout.sets}
                </p>
              </div>

              {/* Reps */}
              <div className="grid grid-cols-2 border-b border-white/10 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Reps
                </p>

                <p className="text-right text-sm font-bold text-white">
                  {workout.reps}
                </p>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-2 border-b border-white/10 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Duration
                </p>

                <p className="text-right text-sm font-bold text-white">
                  {workout.duration} min
                </p>
              </div>

              {/* Calories */}
              <div className="grid grid-cols-2 border-b border-white/10 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Calories Burned
                </p>

                <p className="text-right text-sm font-bold text-white">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              {/* Rating */}
              <div className="grid grid-cols-2 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Rating
                </p>

                <p className="text-right text-sm font-bold text-white">
                  ★ {workout.rating}
                </p>
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-10 border-t border-white/10 pt-8">

              <h2 className="text-2xl font-black uppercase tracking-tight">
                INSTRUCTIONS
              </h2>

              <div className="mt-5 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-black/30 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="text-sm leading-6 text-white/65">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
}
