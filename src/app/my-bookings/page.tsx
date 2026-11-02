import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CalendarDays, Loader2 } from "lucide-react";
import MyBookingCard from "@/components/MyBookingCard";



interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  hourlyRate: number;
  userName: string;
  userEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  guests: number;
  note: string;
  totalPrice: number;
  securityDeposit: number;
  status: "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

async function MyBookingsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  if (!email) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">Please Sign In</h2>
        <p className="mt-2 text-muted-foreground">
          Sign in to view your bookings.
        </p>
      </div>
    );
  }

  const response = await fetch(
    `http://localhost:5000/my-bookings/${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch your bookings.");
  }

  const bookings: Booking[] = await response.json();

  const activeBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  return (
    <main className="min-h-screen bg-gray-50/70">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold tracking-wider text-primary">
            YOUR BOOKINGS
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your studio reservations and booking information.
          </p>
        </div>

        {/* Booking statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-muted-foreground">
              Total Bookings
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              {bookings.length}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-6">
            <p className="text-sm text-muted-foreground">
              Active Bookings
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              {activeBookings}
            </h2>
          </div>
        </div>

        {/* Booking list */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Your Reservations</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-xl border bg-white px-6 py-16 text-center">
            <CalendarDays className="mx-auto mb-4 h-14 w-14 text-muted-foreground" />

            <h3 className="text-xl font-bold">
              No Bookings Yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              You haven&apos;t booked any studios yet. Explore our studios to
              find your perfect creative space.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <MyBookingCard
                key={booking._id}
                booking={booking}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function MyBookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="mr-3 h-6 w-6 animate-spin" />
          Loading your bookings...
        </div>
      }
    >
      <MyBookingsContent />
    </Suspense>
  );
}