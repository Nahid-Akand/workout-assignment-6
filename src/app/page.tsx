import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">FitLog</h1>

      <p className="mt-4">
        Total workouts: {workouts.length}
      </p>

      <div className="mt-6 space-y-2">
        {workouts.map((workout) => (
          <p key={workout.id}>
            {workout.id}. {workout.name}
          </p>
        ))}
      </div>
    </main>
  );
}