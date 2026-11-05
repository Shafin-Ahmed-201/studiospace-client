
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import BookStudioButton from "../BookStudioButton";

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

export default async function StudioDetails({
  studio,
}: {
  studio: Studio;
}) {

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/#featured-studio"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-500"
        >
          <ArrowLeft size={18} />
          Back to Studios
        </Link>

        {/* Header */}
        <div className="mb-7">
          <span className="rounded-full bg-[#C5F45B] px-4 py-2 text-sm font-semibold text-black">
            {studio.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            {studio.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <MapPin size={17} className="text-black" />
              {studio.location}
            </span>

            <span className="flex items-center gap-2">
              <Users size={17} />
              Up to {studio.maxCapacity} people
            </span>
          </div>
        </div>

        {/* Studio Image */}
        <div className="relative mb-10 h-[300px] overflow-hidden rounded-3xl sm:h-[450px]">
          <Image
            src={studio.imageUrl}
            alt={studio.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-10 lg:col-span-2">

            {/* Overview */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="mb-5 text-2xl font-bold text-slate-900">
                About This Studio
              </h2>

              <p className="leading-8 text-slate-600">
                {studio.overview}
              </p>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <h3 className="mb-3 font-semibold text-slate-900">
                  Studio Address
                </h3>

                <p className="flex items-start gap-2 text-sm leading-7 text-slate-600">
                  <MapPin
                    size={18}
                    className="mt-1 shrink-0 text-[#C5F45B]"
                  />
                  {studio.address}
                </p>
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                What This Studio Offers
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {studio.amenities?.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-green-500"
                    />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Studio Information
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                    <Users size={23} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Maximum Capacity</p>
                    <p className="font-semibold text-slate-900">
                      {studio.maxCapacity} People
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                    <Clock size={23} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Booking Type</p>
                    <p className="font-semibold text-slate-900">
                      Hourly Booking
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side - Booking Card */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Starting from
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  ৳{studio.hourlyRate}
                </span>
                <span className="text-sm text-slate-500">/ hour</span>
              </div>

              <div className="my-7 space-y-5 border-y border-slate-100 py-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Hourly Rate</span>
                  <span className="font-semibold text-slate-900">
                    ৳{studio.hourlyRate}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Security Deposit</span>
                  <span className="font-semibold text-slate-900">
                    ৳{studio.securityDeposit}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Maximum Capacity</span>
                  <span className="font-semibold text-slate-900">
                    {studio.maxCapacity} People
                  </span>
                </div>
              </div>

              <div className="mb-6 flex items-start gap-3 rounded-xl bg-green-50 p-4">
                <ShieldCheck
                  size={22}
                  className="shrink-0 text-green-600"
                />
                <p className="text-xs leading-6 text-green-800">
                  Review the booking terms and studio details before
                  confirming your reservation.
                </p>
              </div>

              <BookStudioButton  studio={studio}></BookStudioButton>

              <p className="mt-4 text-center text-xs text-slate-400">
                <CreditCard size={14} className="mr-1 inline" />
                Booking and payment details will be shown next.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
