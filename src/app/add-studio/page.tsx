
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus,
  X,
  MapPin,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

export default function AddStudioForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
const {data:session}=useSession()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    address: "",
    imageUrl: "",
    overview: ""
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (!value) return;

    if (amenities.some((item) => item.toLowerCase() === value.toLowerCase())) {
      toast.error("This amenity has already been added.");
      return;
    }

    setAmenities((previous) => [...previous, value]);
    setAmenityInput("");
  };

  const removeAmenity = (amenity: string) => {
    setAmenities((previous) =>
      previous.filter((item) => item !== amenity)
    );
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select a studio category.");
      return;
    }

    if (amenities.length === 0) {
      toast.error("Please add at least one amenity.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        userName:session?.user.name,
        userEmail:session?.user.email,
          hourlyRate: Number(formData.hourlyRate),
          securityDeposit: Number(formData.securityDeposit),
          maxCapacity: Number(formData.maxCapacity),
          amenities,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add studio.");
      }

      toast.success("Your studio has been listed successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <section className="min-h-screen bg-[#F8F9F5] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#758D32]">
            Become a Studio Host
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-[#20251D] md:text-4xl">
            List Your Creative Space
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Share your creative workspace with photographers, filmmakers,
            musicians, and other creative professionals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Basic Information */}
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Give your studio a name and choose its category.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">Studio Title *</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. The Creative Photography Studio"
                  required
                  minLength={3}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">Studio Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-[#C5F45B]"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hourly Rate (৳) *</label>
                <Input
                  name="hourlyRate"
                  type="number"
                  min="1"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="1500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Security Deposit (৳) *
                </label>
                <Input
                  name="securityDeposit"
                  type="number"
                  min="0"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  placeholder="3000"
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">
                  Maximum Capacity *
                </label>
                <Input
                  name="maxCapacity"
                  type="number"
                  min="1"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  placeholder="10 people"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Studio Location
              </CardTitle>
              <CardDescription>
                Help creators find your studio easily.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">City / Area *</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Dhanmondi, Dhaka"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Full Address *</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House, road, building..."
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Image */}
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Studio Image
              </CardTitle>
              <CardDescription>
                Add a publicly accessible image URL.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <label className="text-sm font-medium">Image URL *</label>
              <Input
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/studio-image.jpg"
                required
              />
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Studio Amenities</CardTitle>
              <CardDescription>
                Add the facilities available in your studio.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex gap-2">
                <Input
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  placeholder="e.g. Air Conditioning"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAmenity();
                    }
                  }}
                />

                <Button
                  type="button"
                  onClick={addAmenity}
                  className="shrink-0 bg-[#C5F45B] text-black hover:bg-[#b5e64b]"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="flex items-center gap-2 rounded-full bg-[#EFF7D9] px-3 py-2 text-sm text-[#34451A]"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      aria-label={`Remove ${amenity}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Overview */}
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Studio Overview</CardTitle>
              <CardDescription>
                Describe your space and what makes it special.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                placeholder="Describe your studio, equipment, facilities, rules, and what creators can expect..."
                rows={6}
                required
                minLength={30}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Host Information */}
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Host Information</CardTitle>
              <CardDescription>
                Your account information is automatically attached to this
                listing.
              </CardDescription>
            </CardHeader>

           <CardContent className="grid gap-5 sm:grid-cols-2">
  <div className="space-y-2">
    <label htmlFor="userName" className="text-sm font-medium">
      Host Name
    </label>
    <Input
      id="userName"
      name="userName"
      value={session?.user?.name ?? ""}
      readOnly
      className="bg-muted"
    />
  </div>

  <div className="space-y-2">
    <label htmlFor="userEmail" className="text-sm font-medium">
      Host Email
    </label>
    <Input
      id="userEmail"
      name="userEmail"
      type="email"
      value={session?.user?.email ?? ""}
      readOnly
      className="bg-muted"
    />
  </div>
</CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={loading}
              className="rounded-full"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[#C5F45B] px-8 text-black hover:bg-[#b5e64b]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Studio"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
