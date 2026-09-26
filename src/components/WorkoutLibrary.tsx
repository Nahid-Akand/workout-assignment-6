"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "@/components/WorkoutCard";

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

interface WorkoutLibraryProps {
workouts: Workout[];
}

export default function WorkoutLibrary({
workouts,
}: WorkoutLibraryProps) {
const [sortBy, setSortBy] = useState("duration");

const sortedWorkouts = [...workouts].sort((a, b) => {
if (sortBy === "duration") {
return a.duration - b.duration;
}


if (sortBy === "calories") {
  return a.caloriesBurned - b.caloriesBurned;
}

if (sortBy === "rating") {
  return b.rating - a.rating;
}

return 0;


});

return ( <section
   id="library"
   className="mx-auto max-w-7xl px-5 py-16 lg:px-8"
 > <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"> <div> <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
THE LIBRARY </h2>


      <p className="mt-3 max-w-xl text-white/60">
        Twelve lifts covering every major muscle group.
      </p>
    </div>

    <div className="relative w-full md:w-52">
      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className="w-full appearance-none rounded-full border border-white/20 bg-[#15171D] px-5 py-3 pr-10 text-sm font-bold text-white outline-none transition focus:border-[#ccff00]"
      >
        <option value="duration">Sort By: Duration</option>
        <option value="calories">Sort By: Calories</option>
        <option value="rating">Sort By: Rating</option>
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ccff00]"
      />
    </div>
  </div>

  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {sortedWorkouts.map((workout) => (
      <WorkoutCard
        key={workout.id}
        workout={workout}
      />
    ))}
  </div>
</section>


);
}
