"use client";

import Image from "next/image";
import Link from "next/link";
import {
Bookmark,
CalendarDays,
Check,
Clock3,
Flame,
Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlanPage() {
const {
plan,
saved,
removeFromPlan,
removeFromSaved,
removeAllFromPlan,
} = useFitLog();

const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
const [completed, setCompleted] = useState<number[]>([]);

const activeWorkouts = activeTab === "plan" ? plan : saved;

const totalMinutes = plan.reduce(
(total, workout) => total + workout.duration,
0
);

const totalCalories = plan.reduce(
(total, workout) => total + workout.caloriesBurned,
0
);

const handleRemove = (id: number) => {
if (activeTab === "plan") {
removeFromPlan(id);


  setCompleted((previous) =>
    previous.filter((workoutId) => workoutId !== id)
  );

  toast.success("Workout removed from today's plan.");
} else {
  removeFromSaved(id);
  toast.success("Workout removed from saved.");
}


};

const handleClearPlan = () => {
removeAllFromPlan();
setCompleted([]);
toast.success("Today's plan cleared.");
};

const handleDone = (id: number) => {
if (completed.includes(id)) {
setCompleted((previous) =>
previous.filter((workoutId) => workoutId !== id)
);


  toast.info("Workout marked as not done.");
} else {
  setCompleted((previous) => [...previous, id]);
  toast.success("Workout marked as done.");
}


};

return ( <main className="min-h-screen bg-black px-5 py-10 text-white lg:px-8 lg:py-14"> <div className="mx-auto max-w-7xl">


    {/* Header */}
    <div className="max-w-2xl">
      <h1 className="text-4xl font-black uppercase tracking-tight md:text-5xl">
        MY PLAN
      </h1>

      <p className="mt-4 text-sm leading-6 text-white/55 md:text-base">
        Cap of five lifts for today. Finish them, then load more.
      </p>
    </div>

    
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      
      <div className="rounded-2xl border border-white/10 bg-[#15171D] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-white/40">
            Exercises
          </p>

          <CalendarDays
            size={18}
            className="text-[#ccff00]"
            strokeWidth={2.5}
          />
        </div>

        <p className="mt-4 text-3xl font-black">
          {plan.length}
        </p>
      </div>

      
      <div className="rounded-2xl border border-white/10 bg-[#15171D] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-white/40">
            Minutes
          </p>

          <Clock3
            size={18}
            className="text-[#ccff00]"
            strokeWidth={2.5}
          />
        </div>

        <p className="mt-4 text-3xl font-black">
          {totalMinutes}
        </p>
      </div>

      
      <div className="rounded-2xl border border-white/10 bg-[#15171D] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-white/40">
            Calories
          </p>

          <Flame
            size={18}
            className="text-[#ccff00]"
            strokeWidth={2.5}
          />
        </div>

        <p className="mt-4 text-3xl font-black">
          {totalCalories}
        </p>
      </div>
    </div>

   
    <div className="mt-12 flex items-center border-b border-white/10">
      <div className="flex items-center gap-8">
        <button
          type="button"
          onClick={() => setActiveTab("plan")}
          className={`relative pb-4 text-sm font-black uppercase tracking-wider transition ${
            activeTab === "plan"
              ? "text-[#ccff00]"
              : "text-white/40 hover:text-white"
          }`}
        >
          Today&apos;s Plan

          {activeTab === "plan" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("saved")}
          className={`relative pb-4 text-sm font-black uppercase tracking-wider transition ${
            activeTab === "saved"
              ? "text-[#ccff00]"
              : "text-white/40 hover:text-white"
          }`}
        >
          Saved

          {activeTab === "saved" && (
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
          )}
        </button>
      </div>

      {activeTab === "plan" && plan.length > 0 && (
        <button
          type="button"
          onClick={handleClearPlan}
          className="ml-auto mb-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/40 transition hover:text-red-400"
        >
          <Trash2 size={15} />
          Clear Plan
        </button>
      )}
    </div>

    
    <section className="mt-8">
      {activeWorkouts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#15171D] px-6 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black">
            {activeTab === "plan" ? (
              <CalendarDays
                size={24}
                className="text-[#ccff00]"
              />
            ) : (
              <Bookmark
                size={24}
                className="text-[#ccff00]"
              />
            )}
          </div>

          <h2 className="mt-6 text-xl font-black uppercase">
            NOTHING HERE YET
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {activeWorkouts.map((workout) => {
            const isDone = completed.includes(workout.id);

            return (
              <article
                key={workout.id}
                className={`overflow-hidden rounded-2xl border bg-[#15171D] transition ${
                  isDone
                    ? "border-[#ccff00]/40"
                    : "border-white/10"
                }`}
              >
                <div className="flex flex-col md:flex-row">

                 
                  <div className="relative h-56 w-full shrink-0 md:h-auto md:w-64 lg:w-72">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className={`object-cover transition ${
                        isDone ? "opacity-50" : ""
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <span className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                      {workout.difficulty}
                    </span>
                  </div>

                 
                  <div className="flex min-w-0 flex-1 flex-col justify-between p-5 md:p-6">

                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap gap-2">
                            {workout.muscleGroups.map((muscle) => (
                              <span
                                key={muscle}
                                className="text-[11px] font-bold uppercase tracking-wider text-[#ccff00]"
                              >
                                {muscle}
                              </span>
                            ))}
                          </div>

                          <h2
                            className={`mt-2 text-xl font-black uppercase tracking-tight md:text-2xl ${
                              isDone
                                ? "text-white/40 line-through"
                                : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h2>

                          <p className="mt-1 text-xs text-white/40">
                            {workout.equipment}
                          </p>
                        </div>

                       
                        <button
                          type="button"
                          onClick={() => handleRemove(workout.id)}
                          aria-label={`Remove ${workout.name}`}
                          className="shrink-0 rounded-full border border-white/10 p-2 text-white/40 transition hover:border-red-400/40 hover:text-red-400"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="mt-6 grid grid-cols-3 border-y border-white/10 py-4">

                        <div className="flex items-center gap-3">
                          <Clock3
                            size={17}
                            className="text-[#ccff00]"
                          />

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                              Duration
                            </p>

                            <p className="mt-1 text-sm font-bold">
                              {workout.duration} min
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                          <Flame
                            size={17}
                            className="text-[#ccff00]"
                          />

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                              Calories
                            </p>

                            <p className="mt-1 text-sm font-bold">
                              {workout.caloriesBurned} kcal
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                          <span className="text-base text-[#ccff00]">
                            ★
                          </span>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                              Rating
                            </p>

                            <p className="mt-1 text-sm font-bold">
                              {workout.rating}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <Link
                        href={`/workouts/${workout.id}`}
                        className="flex min-w-0 items-center justify-center rounded-full border border-white/20 px-4 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                      >
                        View Details
                      </Link>

                      {activeTab === "plan" && (
                        <button
                          type="button"
                          onClick={() => handleDone(workout.id)}
                          className={`flex min-w-0 items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-black uppercase tracking-wide transition ${
                            isDone
                              ? "bg-[#ccff00] text-black"
                              : "border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
                          }`}
                        >
                          <Check size={16} strokeWidth={3} />
                          <span>
                            {isDone ? "Done" : "Mark as Done"}
                          </span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  </div>
</main>


);
}
