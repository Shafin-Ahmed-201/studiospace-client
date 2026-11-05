"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MapPin,
  Users,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

interface Studio {
  _id: string;
  imageUrl?: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  maxCapacity: number;
  securityDeposit: number;
  amenities?: string[];
}

interface MyListCardProps {
  studio: Studio;
  token: string;
}

const MyListCard = ({ studio, token }: MyListCardProps) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (isPending || deleting) return;

    if (!session?.user) {
      router.push(
        `/sign-in?callbackURL=${encodeURIComponent("/my-listings")}`
      );
      return;
    }

    if (!token) {
      toast.error("Authentication token not found. Please sign in again.");
      return;
    }

    try {
      setDeleting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${studio._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete studio.");
      }

      toast.success("Studio deleted successfully!");

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Delete studio error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex min-h-[450px] flex-col sm:flex-row">

        {/* Studio Image */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden bg-muted sm:h-auto sm:w-64">
          <Image
            src={studio.imageUrl || "/placeholder.jpg"}
            alt={studio.title}
            fill
            sizes="(max-width: 640px) 100vw, 256px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <Badge className="absolute left-3 top-3">
            {studio.category}
          </Badge>
        </div>

        {/* Studio Information */}
        <CardContent className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
          <div className="space-y-4">

            {/* Title and Location */}
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">
                {studio.title}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                {studio.location}
              </p>
            </div>

            {/* Studio Details */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-muted/60 p-3">
                <p className="text-xs text-muted-foreground">
                  Hourly Rate
                </p>
                <p className="mt-1 font-bold">
                  ৳{studio.hourlyRate.toLocaleString()}
                </p>
              </div>

              <div className="rounded-lg bg-muted/60 p-3">
                <p className="text-xs text-muted-foreground">
                  Capacity
                </p>
                <p className="mt-1 flex items-center gap-1 font-bold">
                  <Users className="h-4 w-4" />
                  {studio.maxCapacity} People
                </p>
              </div>

              <div className="col-span-2 rounded-lg bg-muted/60 p-3 sm:col-span-1">
                <p className="text-xs text-muted-foreground">
                  Security Deposit
                </p>
                <p className="mt-1 font-bold">
                  ৳{studio.securityDeposit.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <p className="mb-2 text-sm font-semibold">Amenities</p>

              <div className="flex flex-wrap gap-2">
                {(studio.amenities ?? []).slice(0, 4).map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}

                {(studio.amenities ?? []).length > 4 && (
                  <Badge variant="outline">
                    +{(studio.amenities ?? []).length - 4} more
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-2 border-t pt-4">

            <Button variant="outline" size="sm">
              <Link href={`/studios/${studio._id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </Button>

            <Button variant="outline" size="sm">
              <Link href={`/edit-studio/${studio._id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Studio
              </Link>
            </Button>

            {/* Delete Dialog */}
            <Button
              variant="destructive"
              size="sm"
              disabled={isPending || deleting}
              onClick={() => setOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-destructive" />
                    Delete Studio?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-foreground">
                      {studio.title}
                    </span>
                    ? This action cannot be undone. All associated studio
                    information will be permanently removed.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleting}>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={(event) => {
                      event.preventDefault();
                      handleDelete();
                    }}
                    disabled={deleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {deleting ? "Deleting..." : "Yes, Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MyListCard;
