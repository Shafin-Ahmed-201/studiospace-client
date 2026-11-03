
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, X } from "lucide-react";

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

interface StudiosFilterProps {
  studios: Studio[];
}

const categories = [
  "All Categories",
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

export default function StudiosFilter({ studios }: StudiosFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Filter studios based on search and category
  const filteredStudios = useMemo(() => {
    return studios.filter((studio) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        studio.title.toLowerCase().includes(search) ||
        studio.location.toLowerCase().includes(search) ||
        studio.address.toLowerCase().includes(search) ||
        studio.overview.toLowerCase().includes(search) ||
        studio.category.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        studio.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [studios, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
  };

  return (
    <>
      {/* Search and Filter Section */}
      <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Find Your Perfect Studio
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Search by studio name, location, or choose a category.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_260px]">
          {/* Search Input */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search studios, locations..."
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#C5F45B] focus:ring-2 focus:ring-[#C5F45B]/30"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <SlidersHorizontal
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#C5F45B] focus:ring-2 focus:ring-[#C5F45B]/30"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Information */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredStudios.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-900">
              {studios.length}
            </span>{" "}
            studios
          </p>

          {(searchTerm || selectedCategory !== "All Categories") && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 transition hover:text-black"
            >
              <X size={16} />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Studio Cards */}
      {filteredStudios.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-20 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <Search size={25} className="text-gray-400" />
          </div>

          <h3 className="text-xl font-semibold text-gray-800">
            No Studios Found
          </h3>

          <p className="mt-2 text-gray-500">
            Try another search term or select a different category.
          </p>

          <button
            onClick={clearFilters}
            className="mt-5 rounded-xl bg-[#C5F45B] px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudios.map((studio) => (
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
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                  {studio.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {studio.title}
                </h3>

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
                  className="block w-full rounded-xl border border-[#C5F45B] bg-[#C5F45B] px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-white"
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
