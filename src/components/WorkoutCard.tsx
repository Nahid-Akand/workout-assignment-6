import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

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
}

interface WorkoutCardProps {
workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
return (
<Link
href={`/workouts/${workout.id}`}
className="group overflow-hidden rounded-2xl border border-white/10 bg-[#15171D] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40"
>
     <div className="relative h-56 overflow-hidden"> <Image
       src={workout.image}
       alt={workout.name}
       fill
       className="object-cover transition duration-500 group-hover:scale-105"
     />


    <span className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
      {workout.difficulty}
    </span>
  </div>

  
  <div className="p-5">
   
    <div className="mb-3 flex flex-wrap gap-2">
      {workout.muscleGroups.map((muscle) => (
        <span
          key={muscle}
          className="text-xs font-bold uppercase tracking-wider text-[#ccff00]"
        >
          {muscle}
        </span>
      ))}
    </div>

  
    <h3 className="text-xl font-black uppercase tracking-tight text-white">
      {workout.name}
    </h3>

    
    <p className="mt-2 text-sm text-white/50">
      {workout.equipment}
    </p>

    
    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-wide text-white/50">
      
      <span className="flex items-center gap-1.5">
        <Clock3
          size={15}
          className="text-[#ccff00]"
          strokeWidth={2.5}
        />
        {workout.duration} min
      </span>

      <span className="flex items-center gap-1.5">
        <Flame
          size={15}
          className="text-[#ccff00]"
          strokeWidth={2.5}
        />
        {workout.caloriesBurned} kcal
      </span>

      <span className="flex items-center gap-1.5">
        <Star
          size={15}
          className="text-[#ccff00]"
          strokeWidth={2.5}
        />
        {workout.rating}
      </span>

    </div>
  </div>
</Link>


);
}
