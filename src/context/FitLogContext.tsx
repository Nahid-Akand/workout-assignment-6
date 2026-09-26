"use client";

import {
createContext,
useContext,
useEffect,
useState,
type ReactNode,
} from "react";

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

interface FitLogContextType {
plan: Workout[];
saved: Workout[];

addToPlan: (workout: Workout) => boolean;
saveWorkout: (workout: Workout) => void;

removeFromPlan: (id: number) => void;
removeFromSaved: (id: number) => void;
removeAllFromPlan: () => void;

isInPlan: (id: number) => boolean;
isSaved: (id: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(
undefined
);

export function FitLogProvider({
children,
}: {
children: ReactNode;
}) {
const [plan, setPlan] = useState<Workout[]>([]);
const [saved, setSaved] = useState<Workout[]>([]);


useEffect(() => {
const storedPlan = localStorage.getItem("fitlog-plan");
const storedSaved = localStorage.getItem("fitlog-saved");


if (storedPlan) {
  try {
    const parsedPlan: Workout[] = JSON.parse(storedPlan);

    // Maximum 5 workouts
    setPlan(parsedPlan.slice(0, 5));
  } catch {
    setPlan([]);
  }
}

if (storedSaved) {
  try {
    const parsedSaved: Workout[] = JSON.parse(storedSaved);

    setSaved(parsedSaved);
  } catch {
    setSaved([]);
  }
}


}, []);


useEffect(() => {
localStorage.setItem(
"fitlog-plan",
JSON.stringify(plan)
);
}, [plan]);


useEffect(() => {
localStorage.setItem(
"fitlog-saved",
JSON.stringify(saved)
);
}, [saved]);


const addToPlan = (workout: Workout) => {

if (plan.length >= 5) {
return false;
}



if (plan.some((item) => item.id === workout.id)) {
  return false;
}

setPlan((previous) => [
  ...previous,
  workout,
]);

return true;


};


const saveWorkout = (workout: Workout) => {

if (saved.some((item) => item.id === workout.id)) {
return;
}


setSaved((previous) => [
  ...previous,
  workout,
]);


};


const removeFromPlan = (id: number) => {
setPlan((previous) =>
previous.filter(
(workout) => workout.id !== id
)
);
};


const removeFromSaved = (id: number) => {
setSaved((previous) =>
previous.filter(
(workout) => workout.id !== id
)
);
};


const removeAllFromPlan = () => {
setPlan([]);
};


const isInPlan = (id: number) => {
return plan.some(
(workout) => workout.id === id
);
};


const isSaved = (id: number) => {
return saved.some(
(workout) => workout.id === id
);
};

return (
<FitLogContext.Provider
value={{
plan,
saved,
addToPlan,
saveWorkout,
removeFromPlan,
removeFromSaved,
removeAllFromPlan,
isInPlan,
isSaved,
}}
>
{children}
</FitLogContext.Provider>
);
}

export function useFitLog() {
const context = useContext(FitLogContext);

if (!context) {
throw new Error(
"useFitLog must be used inside FitLogProvider"
);
}

return context;
}
