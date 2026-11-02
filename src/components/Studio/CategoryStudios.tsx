
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

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

interface Props {
  category: string;
  studios: Studio[];
}

export default function CategoryStudios({
  category,
  studios,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Back Navigation */}
        <Link
          href="/#categories"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-orange-500"
        >
          <ArrowLeft size={18} />
          All Categories
        </Link>

        {/* Heading */}
        <div className="mb-12">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Explore Category
          </span>

          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            {category}
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Explore our collection of {category.toLowerCase()}.
            Find the perfect creative space for your next project.
          </p>

          <p className="mt-4 text-sm font-medium text-slate-500">
            {studios.length} {studios.length === 1 ? "Studio" : "Studios"} Available
          </p>
        </div>

        {/* Studio Grid */}
        {studios.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-orange-600 shadow">
                    {studio.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900">
                    {studio.title}
                  </h2>

                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} className="text-orange-500" />
                    {studio.location}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {studio.overview}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-xs text-slate-400">
                        Starting from
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        ৳{studio.hourlyRate}
                        <span className="text-sm font-normal text-slate-500">
                          /hr
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Users size={16} />
                      {studio.maxCapacity}
                    </div>
                  </div>

                  <Link
                    href={`/studios/${studio._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-orange-500"
                  >
                    View Details
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              No Studios Available
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              We couldn&apos;t find any studios in this category right now.
              Please explore other categories.
            </p>

            <Link
              href="/#categories"
              className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Explore Categories
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
