import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Wallet,
  Building2,
  Pencil,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import MyListCard from "@/components/MyListCard";

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
  userName: string;
  userEmail: string;
  amenities: string[];
}

const MyListingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  const res = await fetch(
    `http://localhost:5000/my-listings/${encodeURIComponent(email ?? "")}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch your studio listings");
  }

  const studios: Studio[] = await res.json();

  const totalStudios = studios.length;

  const averageRate =
    totalStudios > 0
      ? Math.round(
          studios.reduce((total, studio) => total + studio.hourlyRate, 0) /
            totalStudios,
        )
      : 0;

  const totalCapacity = studios.reduce(
    (total, studio) => total + studio.maxCapacity,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-50/70">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-wider text-primary">
              HOST DASHBOARD
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-2 text-muted-foreground">
              Welcome back, {session?.user?.name ?? "Studio Host"}! Manage your
              creative spaces here.
            </p>
          </div>

          <Button className="w-fit">
            <Link href="/add-studio">
              <Plus className="mr-2 h-4 w-4" />
              Add New Studio
            </Link>
          </Button>
        </div>

        {/* Statistics */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Studios</p>
                <h2 className="text-2xl font-bold">{totalStudios}</h2>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Hourly Rate
                </p>
                <h2 className="text-2xl font-bold">
                  ৳{averageRate.toLocaleString()}
                </h2>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <h2 className="text-2xl font-bold">{totalCapacity} People</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings heading */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Your Studios</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalStudios} studio{totalStudios !== 1 ? "s" : ""} listed
            </p>
          </div>
        </div>

        {/* Studio Cards */}
        {studios.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-16 text-center">
              <Building2 className="mb-4 h-14 w-14 text-muted-foreground" />

              <h3 className="text-xl font-bold">No Studios Listed Yet</h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                You haven&apos;t added any studios. Start sharing your creative
                space with people.
              </p>

              <Button className="mt-6">
                <Link href="/add-studio">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Studio
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div>
            {studios.map((studio) => (
              <Suspense key={studio._id} fallback={<p>Loading...</p>}>
                <MyListCard studio={studio} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyListingsPage;
