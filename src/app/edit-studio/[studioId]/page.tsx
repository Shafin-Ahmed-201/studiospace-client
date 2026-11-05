import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EditStudioClient from "../EditStudioClient";

interface PageProps {
  params: Promise<{
    studioId: string;
  }>;
}

async function StudioContent({ params }: PageProps) {
  const { studioId } = await params;

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  if (!jwtToken?.token) {
    redirect("/sign-in");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios/${studioId}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${jwtToken.token}`,
      },
    }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch studio information.");
  }

  const result = await response.json();
  const studio = result.studio ?? result;

  return (
    <EditStudioClient
      studio={studio}
      token={jwtToken.token}
    />
  );
}

export default function EditStudioPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F8F9F5]">
          <div className="flex items-center gap-3 text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            Loading studio information...
          </div>
        </div>
      }
    >
      <StudioContent params={params} />
    </Suspense>
  );
}