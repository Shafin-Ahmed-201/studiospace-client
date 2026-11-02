"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Booking {
  _id: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  hourlyRate: number;
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
}

interface MyBookingCardProps {
  booking: Booking;
}

const canCancelBooking = (booking: Booking) => {
  if (booking.status !== "confirmed") return false;

  const now = new Date();

  const [year, month, day] = booking.bookingDate.split("-").map(Number);
  const [hours, minutes] = booking.startTime.split(":").map(Number);

  const bookingStart = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes
  );

  return bookingStart > now;
};

const MyBookingCard = ({ booking }: MyBookingCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const handleCancelBooking = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    if (!session?.user?.email) {
      toast.error("Please sign in again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/bookings/${booking._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: session.user.email,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Cancellation failed.");
      }

      toast.success("Booking cancelled successfully!");

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const statusColor =
    booking.status === "confirmed"
      ? "bg-green-100 text-green-700"
      : booking.status === "cancelled"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700";

  const showCancelButton = canCancelBooking(booking);

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="grid md:grid-cols-[260px_1fr]">
        {/* Studio image */}
        <div className="h-56 md:h-full">
          <img
            src={booking.studioImage}
            alt={booking.studioTitle}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Booking information */}
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold">
                {booking.studioTitle}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {booking.studioLocation}
              </p>
            </div>

            <Badge className={statusColor}>
              {booking.status.toUpperCase()}
            </Badge>
          </div>

          {/* Booking details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Booking Date
                </p>
                <p className="font-medium">
                  {booking.bookingDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Booking Time
                </p>
                <p className="font-medium">
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Guests
                </p>
                <p className="font-medium">
                  {booking.guests} People
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Total Booking Price
                </p>
                <p className="font-bold">
                  ৳{booking.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {booking.note && (
            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold">Note:</span> {booking.note}
            </p>
          )}

          {/* Footer */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <div className="text-sm text-muted-foreground">
              Security Deposit:{" "}
              <span className="font-semibold text-foreground">
                ৳{booking.securityDeposit.toLocaleString()}
              </span>
            </div>

            {showCancelButton && (
              <Button
                variant="destructive"
                onClick={handleCancelBooking}
                disabled={loading}
              >
                <XCircle className="mr-2 h-4 w-4" />
                {loading ? "Cancelling..." : "Cancel Booking"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;