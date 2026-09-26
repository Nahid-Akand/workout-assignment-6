"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import { toast } from "react-toastify";
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

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
    plan,
  } = useFitLog();

  const handleAddToPlan = () => {
    if (isInPlan(workout.id)) {
      toast.info("This workout is already in today's plan.");
      return;
    }

    if (plan.length >= 5) {
      toast.warning("Your plan can have a maximum of 5 workouts.");
      return;
    }

    addToPlan(workout);
    toast.success("Added to today's plan.");
  };

  const handleSave = () => {
    if (isSaved(workout.id)) {
      toast.info("This workout is already saved.");
      return;
    }

    saveWorkout(workout);
    toast.success("Workout saved for later.");
  };

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={handleAddToPlan}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#d9ff4d]"
      >
        <CalendarPlus size={17} strokeWidth={2.5} />
        <span>Add to today&apos;s plan</span>
      </button>

      <button
        type="button"
        onClick={handleSave}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
      >
        <Bookmark size={17} strokeWidth={2.5} />
        <span>Save for later</span>
      </button>
    </div>
  );
}

