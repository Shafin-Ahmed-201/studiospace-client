import { Suspense } from "react";
import CategoryStudios from "@/components/Studio/CategoryStudios";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  overview: string;
}

async function getStudios(category: string): Promise<Studio[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/studio?category=${category}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch studios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching studios:", error);
    return [];
  }
}

async function CategoryStudiosContent({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const studios = await getStudios(category);

  return <CategoryStudios category={category} studios={studios} />;
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryStudiosContent params={params} />
    </Suspense>
  );
}

function CategorySkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 h-5 w-32 rounded bg-slate-200" />
      <div className="mb-4 h-9 w-1/2 rounded bg-slate-200" />
      <div className="mb-12 h-5 w-2/3 rounded bg-slate-200" />

      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div className="h-56 bg-slate-200" />
            <div className="space-y-4 p-6">
              <div className="h-6 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-11 w-full rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
