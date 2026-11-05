
import { Suspense } from "react";
import StudiosFilter from "@/components/StudiosFilter";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  address: string;
  imageUrl: string;
  overview: string;
  amenities: string[];
}

async function getStudios(): Promise<Studio[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch studios");
  }

  return response.json();
}

async function StudiosContent() {
  const studios = await getStudios();

  return <StudiosFilter studios={studios} />;
}

function StudiosSkeleton() {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="h-56 bg-gray-200" />

          <div className="space-y-4 p-5">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-10 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StudiosPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Banner */}
      <section className="bg-gray-950 px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#C5F45B]">
            Find Your Creative Space
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Discover Amazing Studios
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
            Find the perfect space for photography, music production,
            podcasting, and creative projects.
          </p>
        </div>
      </section>

      {/* Studios Section */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Suspense fallback={<StudiosSkeleton />}>
          <StudiosContent />
        </Suspense>
      </section>
    </main>
  );
}
