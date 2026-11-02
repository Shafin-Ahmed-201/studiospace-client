
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { CalendarDays, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Studio {
  _id: string;
  title: string;
  imageUrl: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  address: string;
}

interface BookStudioButtonProps {
  studio: Studio;
}

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const BookStudioButton = ({ studio }: BookStudioButtonProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [today] = useState(getToday);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [guests, setGuests] = useState("1");
  const [note, setNote] = useState("");

  // Calculate booking duration.
  const calculateDuration = () => {
    if (!startTime || !endTime) return 0;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    return (
      (endHour * 60 +
        endMinute -
        (startHour * 60 + startMinute)) / 60
    );
  };

  const duration = calculateDuration();

  const totalPrice =
    duration > 0 ? duration * studio.hourlyRate : 0;

  // Handle booking submission.
  const handleBooking = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please sign in before booking a studio.");
      return;
    }

    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please select your booking date and time.");
      return;
    }

    if (duration <= 0) {
      toast.error("End time must be after start time.");
      return;
    }

    if (
      Number(guests) < 1 ||
      Number(guests) > studio.maxCapacity
    ) {
      toast.error(`Guest limit is ${studio.maxCapacity}.`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studioId: studio._id,
            userName: session.user.name,
            userEmail: session.user.email,
            bookingDate,
            startTime,
            endTime,
            guests: Number(guests),
            note,
          }),
        }
      );

      const result = await response.json();

    if (!response.ok) {
  toast.error(result.message || "Booking failed.");
  return;
}

      toast.success(
        "Your studio booking is confirmed!"
      );

      setOpen(false);
      router.push("/my-bookings");
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Fixed: DialogTrigger already renders a button */}
      <DialogTrigger className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#C5F45B] bg-[#C5F45B] px-5 py-4 font-semibold text-black transition hover:bg-white">
        <CalendarDays size={19} />
        Book This Studio
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Book This Studio
          </DialogTitle>

          <DialogDescription>
            Complete the information below to reserve{" "}
            {studio.title}.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleBooking}
          className="space-y-5"
        >
          {/* Booking date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="h-4 w-4" />
              Booking Date
            </label>

            <Input
              type="date"
              min={today}
              value={bookingDate}
              onChange={(e) =>
                setBookingDate(e.target.value)
              }
              required
            />
          </div>

          {/* Booking time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Start Time
              </label>

              <Input
                type="time"
                value={startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                End Time
              </label>

              <Input
                type="time"
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                required
              />
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              Number of Guests
            </label>

            <Input
              type="number"
              min="1"
              max={studio.maxCapacity}
              value={guests}
              onChange={(e) =>
                setGuests(e.target.value)
              }
              required
            />

            <p className="text-xs text-muted-foreground">
              Maximum capacity: {studio.maxCapacity} people
            </p>
          </div>

          {/* Booking note */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Booking Note (Optional)
            </label>

            <Textarea
              placeholder="Tell the host about your booking..."
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              rows={3}
            />
          </div>

          {/* Price summary */}
          <div className="space-y-3 rounded-xl bg-gray-50 p-4">
            <div className="flex justify-between text-sm">
              <span>Hourly Rate</span>
              <span>
                ৳{studio.hourlyRate.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Duration</span>
              <span>
                {duration > 0
                  ? `${duration} hours`
                  : "—"}
              </span>
            </div>

            <div className="flex justify-between border-t pt-3 font-semibold">
              <span>Estimated Booking Price</span>
              <span>
                ৳{totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Security Deposit (separate)</span>
              <span>
                ৳{studio.securityDeposit.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Confirm booking */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Confirming Booking..."
              : "Confirm Booking"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookStudioButton;
