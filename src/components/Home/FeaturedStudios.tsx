
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

interface StudioType {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  overview: string;
  maxCapacity: number;
}

async function getFeaturedStudios(): Promise<StudioType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch featured studios");
  }

  return res.json();
}

async function FeaturedStudiosContent() {
  const studios = await getFeaturedStudios();

  const topSix = studios.slice(0, 6);

  return (
    <div id='featured-studio' className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {topSix.map((studio) => (
        <div
          key={studio._id}
          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative h-56">
            <Image
              src={studio.imageUrl}
              alt={studio.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-5">
            <span className="text-xs font-semibold text-gray-500">
              {studio.category}
            </span>

            <h3 className="mt-2 text-lg font-bold text-gray-900">
              {studio.title}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              📍 {studio.location}
            </p>

            <p className="mt-3 line-clamp-2 text-sm text-gray-600">
              {studio.overview}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
              <p className="font-bold text-gray-900">
                ৳{studio.hourlyRate.toLocaleString("en-BD")}
                <span className="text-xs font-normal text-gray-500">
                  /hr
                </span>
              </p>

              <p className="text-sm text-gray-500">
                {studio.maxCapacity} People
              </p>
            </div>

            <Link
              href={`/studios/${studio._id}`}
              className="mt-5 block rounded-xl bg-[#C5F45B] px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedStudiosSkeleton() {
  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="animate-pulse overflow-hidden rounded-2xl border"
        >
          <div className="h-56 bg-gray-200" />
          <div className="space-y-4 p-5">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FeaturedStudios() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
            Explore Spaces
          </p>

          <h2 className="text-4xl font-bold text-gray-900">
            Featured Studios
          </h2>
        </div>

        <Link
          href="/studios"
          className="text-sm font-semibold text-gray-900 hover:text-[#8BAF25]"
        >
          View All Studios →
        </Link>
      </div>

      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudiosContent />
      </Suspense>
    </section>
  );
}
