"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Check,
  Clock3,
  Flame,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

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

type Tab = "plan" | "saved";

export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    removeAllFromPlan,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [completed, setCompleted] = useState<number[]>([]);

  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");

    if (tab === "saved") {
      setActiveTab("saved");
    } else {
      setActiveTab("plan");
    }
  }, []);

  const handleComplete = (id: number) => {
    setCompleted((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const displayedWorkouts =
    activeTab === "plan" ? plan : saved;

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">

      
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#ccff00]">
              FITLOG
            </p>

            <h1 className="text-4xl font-black uppercase tracking-tight md:text-5xl">
              MY PLAN
            </h1>

            <p className="mt-3 text-sm text-white/60 md:text-base">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          {activeTab === "plan" && plan.length > 0 && (
            <button
              type="button"
              onClick={removeAllFromPlan}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-red-400 hover:text-red-400"
            >
              <Trash2 size={16} />
              Clear Plan
            </button>
          )}
        </div>

       
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#15171D] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              {plan.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#15171D] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Minutes
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalMinutes}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#15171D] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Calories
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalCalories}
            </p>
          </div>
        </div>

      
        <div className="mt-10 flex items-center gap-8 border-b border-white/10">

          <Link
            href="/my-plan?tab=plan"
            onClick={() => setActiveTab("plan")}
            className={`relative pb-4 text-sm font-black uppercase tracking-wide transition ${
              activeTab === "plan"
                ? "text-[#ccff00]"
                : "text-white/50 hover:text-white"
            }`}
          >
            Today's Plan

            {activeTab === "plan" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
            )}
          </Link>

          <Link
            href="/my-plan?tab=saved"
            onClick={() => setActiveTab("saved")}
            className={`relative flex items-center gap-2 pb-4 text-sm font-black uppercase tracking-wide transition ${
              activeTab === "saved"
                ? "text-[#ccff00]"
                : "text-white/50 hover:text-white"
            }`}
          >
            <Bookmark size={15} />

            Saved

            {saved.length > 0 && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white">
                {saved.length}
              </span>
            )}

            {activeTab === "saved" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
            )}
          </Link>

        </div>

        
        {displayedWorkouts.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-[#15171D] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
              <Bookmark
                size={24}
                className="text-[#ccff00]"
              />
            </div>

            <h2 className="mt-5 text-xl font-black uppercase">
              {activeTab === "plan"
                ? "Your plan is empty"
                : "No saved workouts"}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/50">
              {activeTab === "plan"
                ? "Browse the workout library and add up to five workouts to today's plan."
                : "Save workouts from the library and they will appear here for later."}
            </p>

            <Link
              href="/#library"
              className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (

         
          <div className="mt-8 grid gap-5">
            {displayedWorkouts.map((workout: Workout) => {
              const isCompleted = completed.includes(workout.id);

              return (
                <article
                  key={workout.id}
                  className={`overflow-hidden rounded-2xl border bg-[#15171D] transition ${
                    isCompleted
                      ? "border-[#ccff00]/40"
                      : "border-white/10"
                  }`}
                >
                  <div className="flex flex-col md:flex-row">

                    {/* Image */}
                    <div className="relative h-56 w-full shrink-0 md:h-auto md:w-64">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className={`object-cover transition ${
                          isCompleted
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                      />

                      {isCompleted && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ccff00] text-black">
                            <Check
                              size={24}
                              strokeWidth={3}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5 md:p-6">

                      <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        <div>
                          <div className="mb-3 flex flex-wrap gap-2">
                            {workout.muscleGroups.map(
                              (muscle) => (
                                <span
                                  key={muscle}
                                  className="text-xs font-bold uppercase tracking-wider text-[#ccff00]"
                                >
                                  {muscle}
                                </span>
                              )
                            )}
                          </div>

                          <h2
                            className={`text-2xl font-black uppercase tracking-tight ${
                              isCompleted
                                ? "text-white/40 line-through"
                                : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h2>

                          <p className="mt-2 text-sm text-white/50">
                            {workout.equipment}
                          </p>
                        </div>

                        <span className="h-fit w-fit rounded-full bg-black/50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/60">
                          {workout.difficulty}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-wide text-white/50">
                        <span className="flex items-center gap-1.5">
                          <Clock3
                            size={15}
                            className="text-[#ccff00]"
                          />
                          {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Flame
                            size={15}
                            className="text-[#ccff00]"
                          />
                          {workout.caloriesBurned} kcal
                        </span>

                        <span>
                          {workout.sets} sets × {workout.reps}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <Link
                          href={`/workouts/${workout.id}`}
                          className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                        >
                          View Details
                        </Link>

                        {activeTab === "plan" ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleComplete(workout.id)
                            }
                            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-black uppercase tracking-wide transition ${
                              isCompleted
                                ? "bg-white/10 text-white/60"
                                : "bg-[#ccff00] text-black hover:bg-[#d9ff4d]"
                            }`}
                          >
                            {isCompleted && (
                              <Check
                                size={15}
                                strokeWidth={3}
                              />
                            )}

                            {isCompleted
                              ? "Completed"
                              : "Mark as Done"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              removeFromSaved(workout.id)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
                          >
                            <Trash2 size={15} />
                            Remove Saved
                          </button>
                        )}
                      </div>

                      
                      {activeTab === "plan" && (
                        <button
                          type="button"
                          onClick={() =>
                            removeFromPlan(workout.id)
                          }
                          className="mt-3 self-center text-xs font-bold uppercase tracking-wide text-white/30 transition hover:text-red-400"
                        >
                          Remove from plan
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

