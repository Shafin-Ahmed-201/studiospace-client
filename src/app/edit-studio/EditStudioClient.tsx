"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StudioForm, { StudioFormData } from "./StudioForm";

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
  userName: string;
  userEmail: string;
}

interface EditStudioClientProps {
  studio: Studio;
  token: string;
}

const EditStudioClient = ({
  studio,
  token,
}: EditStudioClientProps) => {
  const router = useRouter();

  const handleUpdateStudio = async (
    formData: StudioFormData,
    amenities: string[]
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studios/${studio._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          hourlyRate: Number(formData.hourlyRate),
          securityDeposit: Number(formData.securityDeposit),
          maxCapacity: Number(formData.maxCapacity),
          amenities,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to update studio."
      );
    }

    toast.success("Studio updated successfully!");

    router.push("/my-listings");
    router.refresh();
  };

  return (
    <StudioForm
      initialData={{
        title: studio.title,
        category: studio.category,
        hourlyRate: String(studio.hourlyRate),
        securityDeposit: String(studio.securityDeposit),
        maxCapacity: String(studio.maxCapacity),
        location: studio.location,
        address: studio.address,
        imageUrl: studio.imageUrl,
        overview: studio.overview,
      }}
      initialAmenities={studio.amenities}
      onSubmit={handleUpdateStudio}
      submitLabel="Update Studio"
      hostName={studio.userName}
      hostEmail={studio.userEmail}
    />
  );
};

export default EditStudioClient;