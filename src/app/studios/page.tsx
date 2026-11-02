import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

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

const categories = [
  "All Studios",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

async function getStudios(): Promise<Studio[]> {
  const response = await fetch(`${process.env.API_URL}/studios`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch studios");
  }

  return response.json();
}

async function StudiosContent() {
  const studios = await getStudios();

  return (
    <>
      {/* Category Filters */}
      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category}
            href={
              category === "All Studios"
                ? "/studios"
                : `/studios/category/${encodeURIComponent(category)}`
            }
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
              category === "All Studios"
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-black hover:text-black"
            }`}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Studio Count */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Explore All Studios
        </h2>

        <p className="text-sm text-gray-500">
          {studios.length} studios available
        </p>
      </div>

      {/* Studio Cards */}
      {studios.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            No Studios Found
          </h3>
          <p className="mt-2 text-gray-500">
            There are currently no studios available.
          </p>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {studios.map((studio) => (
            <div
              key={studio._id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <Image
                  src={studio.imageUrl}
                  alt={studio.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                  {studio.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {studio.title}
                  </h3>
                </div>

                <p className="mb-3 text-sm text-gray-500">
                  📍 {studio.location}
                </p>

                <p className="mb-5 line-clamp-2 text-sm leading-6 text-gray-600">
                  {studio.overview}
                </p>

                <div className="mb-5 flex items-center justify-between border-y border-gray-100 py-4">
                  <div>
                    <p className="text-xs text-gray-500">Hourly Rate</p>
                    <p className="text-lg font-bold text-gray-900">
                      ৳{studio.hourlyRate.toLocaleString("en-BD")}
                      <span className="text-xs font-normal text-gray-500">
                        /hr
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">Max Capacity</p>
                    <p className="font-semibold text-gray-800">
                      {studio.maxCapacity} People
                    </p>
                  </div>
                </div>

                <Link
                  href={`/studios/${studio._id}`}
                  className="block w-full rounded-xl bg-black px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function StudiosSkeleton() {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="animate-pulse overflow-hidden rounded-2xl border border-gray-200"
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
