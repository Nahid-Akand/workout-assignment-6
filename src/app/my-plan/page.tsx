"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  CalendarDays,
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
      toast.success("Workout removed from today's plan.");
    } else {
      removeFromSaved(id);
      toast.success("Workout removed from saved.");
    }
  };

  const handleClearPlan = () => {
    removeAllFromPlan();
    toast.success("Today's plan cleared.");
  };

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-4 text-sm leading-6 text-white/55 md:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats */}
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
              <span className="ml-1 text-sm font-bold text-white/30">
                / 5
              </span>
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

            <p className="mt-4 text-3xl font-black">{totalMinutes}</p>
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

            <p className="mt-4 text-3xl font-black">{totalCalories}</p>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Workout List */}
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
                {activeTab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save workouts from the library and they will appear here."}
              </p>

              <Link
                href="/#workouts"
                className="mt-7 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {activeWorkouts.map((workout) => (
                <article
                  key={workout.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#15171D]"
                >
                  {/* Image */}
                  <div className="relative h-56">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <span className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                      {workout.difficulty}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
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

                        <h2 className="mt-2 text-xl font-black uppercase tracking-tight">
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

                    {/* Workout Stats */}
                    <div className="mt-5 grid grid-cols-3 border-y border-white/10 py-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                          Duration
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {workout.duration} min
                        </p>
                      </div>

                      <div className="border-l border-white/10 pl-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                          Calories
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          {workout.caloriesBurned} kcal
                        </p>
                      </div>

                      <div className="border-l border-white/10 pl-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/35">
                          Rating
                        </p>

                        <p className="mt-1 text-sm font-bold">
                          ★ {workout.rating}
                        </p>
                      </div>
                    </div>

                    {/* Details Button */}
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/20 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
