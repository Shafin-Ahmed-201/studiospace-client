import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AddStudioForm from "@/components/AddStudioForm";

async function AddStudioContent() {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  if (!jwtToken?.token) {
    redirect("/sign-in");
  }

  return <AddStudioForm token={jwtToken.token} />;
}

export default function AddStudioPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading form...</div>}>
      <AddStudioContent />
    </Suspense>
  );
}