
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  Store,
  Wallet,
  Plus,
  ArrowRight,
  MapPin,
  Users,
  LayoutDashboard,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  guests: number;
  totalPrice: number;
  securityDeposit: number;
  status: "confirmed" | "cancelled" | "completed";
}

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  maxCapacity: number;
}

async function DashboardContent() {
  // Get the logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const email = session.user.email;

  // Fetch the user's bookings and studio listings
   const jwtToken= await auth.api.getToken({
        headers:await headers()
      })
  const [bookingResponse, studioResponse] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${encodeURIComponent(email)}`,
      {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${jwtToken?.token}`,
      },
    }
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${encodeURIComponent(email ?? "")}`,
      {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${jwtToken?.token}`,
      },
    }
    ),
  ]);

  if (!bookingResponse.ok || !studioResponse.ok) {
    throw new Error("Failed to load dashboard information.");
  }

  const bookings: Booking[] = await bookingResponse.json();
  const studios: Studio[] = await studioResponse.json();

  // Calculate dashboard statistics
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  );

  const upcomingBookings = confirmedBookings.filter(
    (booking) => {
      const bookingStart = new Date(
        `${booking.bookingDate}T${booking.startTime}:00`
      );

      return bookingStart > new Date();
    }
  );

  const totalExpenses = bookings
    .filter((booking) => booking.status !== "cancelled")
    .reduce(
      (total, booking) => total + booking.totalPrice,
      0
    );

  const recentBookings = [...bookings].slice(0, 4);
  const recentStudios = [...studios].slice(0, 3);

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatPrice = (price: number) =>
    `৳${price.toLocaleString("en-BD")}`;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Welcome Section */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl bg-[#101828] p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-[#C5F45B]">
              <LayoutDashboard size={18} />
              Personal Dashboard
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Welcome back, {session.user.name || "User"}!
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Manage your bookings and studio listings
              from one place.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5F45B] px-5 py-3 font-semibold text-black transition hover:bg-white"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Bookings"
            value={bookings.length}
            icon={<CalendarDays size={22} />}
            description="All your bookings"
          />

          <StatCard
            title="Upcoming Bookings"
            value={upcomingBookings.length}
            icon={<Clock size={22} />}
            description="Confirmed future bookings"
          />

          <StatCard
            title="My Studios"
            value={studios.length}
            icon={<Store size={22} />}
            description="Your studio listings"
          />

          <StatCard
            title="Booking Expenses"
            value={formatPrice(totalExpenses)}
            icon={<Wallet size={22} />}
            description="Excluding cancelled bookings"
          />
        </section>

        {/* Recent Bookings */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Bookings
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep track of your studio reservations.
              </p>
            </div>

            <Link
              href="/my-bookings"
              className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-green-600"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <EmptyState
              message="You haven't made any bookings yet."
              link="/studios"
              linkText="Explore Studios"
            />
          ) : (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center"
                >
                  <div className="relative h-20 w-full overflow-hidden rounded-lg sm:w-28">
                    <Image
                      src={booking.studioImage}
                      alt={booking.studioTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {booking.studioTitle}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={14} />
                      {booking.studioLocation}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span>
                        {formatDate(booking.bookingDate)}
                      </span>
                      <span>
                        {booking.startTime} - {booking.endTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={13} />
                        {booking.guests} Guests
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {booking.status}
                    </span>

                    <span className="font-bold text-slate-900">
                      {formatPrice(booking.totalPrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Studio Listings */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                My Studio Listings
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage the studios you have published.
              </p>
            </div>

            <Link
              href="/my-listings"
              className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-green-600"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {recentStudios.length === 0 ? (
            <EmptyState
              message="You haven't added any studios yet."
              link="/add-studio"
              linkText="Add Your First Studio"
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {recentStudios.map((studio) => (
                <div
                  key={studio._id}
                  className="overflow-hidden rounded-xl border border-slate-200"
                >
                  <div className="relative h-48">
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3 p-4">
                    <div>
                      <span className="text-xs font-medium text-green-600">
                        {studio.category}
                      </span>

                      <h3 className="mt-1 font-bold text-slate-900">
                        {studio.title}
                      </h3>

                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin size={14} />
                        {studio.location}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="font-bold text-slate-900">
                        {formatPrice(studio.hourlyRate)}
                        <span className="text-xs font-normal text-slate-500">
                          /hour
                        </span>
                      </span>

                      <Link
                        href={`/edit-studio/${studio._id}`}
                        className="text-sm font-semibold text-green-600 hover:underline"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

// Reusable statistics card
function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="rounded-xl bg-[#C5F45B]/20 p-3 text-slate-900">
          {icon}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {value}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

// Reusable empty state
function EmptyState({
  message,
  link,
  linkText,
}: {
  message: string;
  link: string;
  linkText: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-10 text-center">
      <p className="text-sm text-slate-500">{message}</p>

      <Link
        href={link}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#C5F45B] px-4 py-2 text-sm font-semibold text-black hover:bg-white"
      >
        {linkText}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
