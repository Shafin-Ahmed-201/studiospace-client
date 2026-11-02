import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, ArrowRight, Clock } from "lucide-react";
import { Suspense } from "react";

interface StudioType {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  maxCapacity: number;
  imageUrl: string;
}

const getFeaturedStudios = async (): Promise<StudioType[]> => {
  try {
    const res = await fetch(`${process.env.API_URL}/studios`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching studios:", error);
    return [];
  }
};

async function FeaturedStudiosContent() {
  const studios = await getFeaturedStudios();
  const topSix = studios.slice(0, 6);

  return (
    <section id='featured-studio' className="bg-[#F8F9F5] px-5 py-20 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#758D32]">
              Find Your Creative Space
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#20251D] md:text-5xl">
              Featured Studios
            </h2>

            <p className="mt-4 max-w-xl text-gray-600">
              Discover inspiring spaces designed for your next creative
              project, from photography to music production.
            </p>
          </div>

          <Link
            href="/studios"
            className="flex w-fit items-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Explore All Studios
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Studio Cards */}
        {studios.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              No studios available yet
            </h3>

            <p className="mt-2 text-gray-500">
              Be the first to share your creative space with the community.
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-flex rounded-full bg-[#C5F45B] px-5 py-3 font-medium text-black hover:bg-[#b5e64b]"
            >
              Add Your Studio
            </Link>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {topSix.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <Link
                  href={`/studios/${studio._id}`}
                  className="relative block h-60 overflow-hidden"
                >
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800">
                    {studio.category}
                  </span>
                </Link>

                {/* Content */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-bold text-[#20251D]">
                    {studio.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="line-clamp-1">
                      {studio.location}
                    </span>
                  </div>

                  <div className="my-5 flex items-center gap-5 border-y border-gray-100 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{studio.maxCapacity} people</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Hourly booking</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                      Starting from
                      <span className="mt-1 block text-xl font-bold text-[#20251D]">
                        ৳{studio.hourlyRate}
                        <span className="text-sm font-normal text-gray-500">
                          /hr
                        </span>
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="inline-flex items-center rounded-full bg-[#C5F45B] px-4 py-2 text-sm font-medium text-black hover:bg-[#b5e64b]"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function FeaturedStudios() {
  return (
    <Suspense
      fallback={
        <section className="bg-[#F8F9F5] px-5 py-20 text-center">
          <p className="text-gray-500">Loading featured studios...</p>
        </section>
      }
    >
      <FeaturedStudiosContent />
    </Suspense>
  );
}
