'use client'
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Users,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";

const MyListCard = ({
  studio,
}: {
  studio: {
    _id: string;
    imageUrl?: string;
    title: string;
    category: string;
    location: string;
    hourlyRate: number;
    maxCapacity: number;
    securityDeposit: number;
    amenities?: string[];
  };
}) => {
    const handelDelete=async()=>{
      const res= await fetch(`http://localhost:5000/my-listings/${studio._id}`, {
        method: 'DELETE',
      })
     const data=await res.json()
     redirect('/my-listings')
    }
    return (
        <div>
            <Card
                key={studio._id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row h-73">
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
                          {(studio.amenities ?? [])
                            .slice(0, 4)
                            .map((amenity) => (
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

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handelDelete}
                        title="Connect your DELETE API to enable this action"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
        </div>
    );
};

export default MyListCard;