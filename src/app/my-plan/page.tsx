import MyPlanClient from "@/components/MyPlanClient";

interface MyPlanPageProps {
searchParams: Promise<{
tab?: string;
}>;
}

export default async function MyPlanPage({
searchParams,
}: MyPlanPageProps) {
const params = await searchParams;

const activeTab =
params.tab === "saved"
? "saved"
: "plan";

return <MyPlanClient activeTab={activeTab} />;
}
