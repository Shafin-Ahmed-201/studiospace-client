import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import EditStudioClient from "../EditStudioClient";


interface PageProps {
  params: Promise<{
    studioId: string;
  }>;
}

// Both params and fetch are accessed inside Suspense.
async function StudioContent({ params }: PageProps) {
  const { studioId } = await params;

  const response = await fetch(
    `http://localhost:5000/studios/${studioId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch studio information.");
  }

  const result = await response.json();
  const studio = result.studio ?? result;

  return <EditStudioClient studio={studio} />;
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