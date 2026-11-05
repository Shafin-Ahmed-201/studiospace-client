
import { Suspense } from "react";
import { notFound } from "next/navigation";

import StudioDetails from "@/components/Studio/StudioDetails";

async function getStudio(studioId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/${studioId}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch studio details");
  }

  return response.json();
}

// Fetch studio details
async function StudioDetailsContent({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = await params;

  const result = await getStudio(studioId);

  if (!result) {
    notFound();
  }

  const studio = result.studio ?? result;

  return <StudioDetails studio={studio} />;
}

// Main Page
export default function StudioDetailsPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  return (
    <Suspense fallback={<StudioDetailsSkeleton />}>
      <StudioDetailsContent params={params} />
    </Suspense>
  );
}

// Loading UI
function StudioDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-10">
      <div className="mb-8 h-5 w-32 rounded bg-slate-200" />
      <div className="mb-7 h-10 w-1/2 rounded bg-slate-200" />
      <div className="mb-10 h-[400px] rounded-3xl bg-slate-200" />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="h-48 rounded-2xl bg-slate-200" />
          <div className="h-48 rounded-2xl bg-slate-200" />
        </div>

        <div className="h-80 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
