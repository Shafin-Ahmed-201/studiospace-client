import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Home,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F8FAF5] px-6 py-16">
      <div className="mx-auto w-full max-w-2xl text-center">

        {/* 404 Illustration */}
        <div className="relative mx-auto mb-8 flex h-44 w-44 items-center justify-center rounded-full bg-[#EAF2D9]">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-[#C5F45B] shadow-lg">
            <Camera size={58} strokeWidth={1.5} className="text-black" />
          </div>

          <span className="absolute -right-2 top-5 rounded-full bg-black px-4 py-2 text-sm font-bold text-[#C5F45B]">
            404
          </span>

          <span className="absolute -bottom-1 -left-3 h-7 w-7 rounded-full bg-[#C5F45B]" />
        </div>

        {/* Content */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gray-500">
          Page Not Found
        </p>

        <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Looks like this studio is{" "}
          <span className="text-[#8BAF25]">out of frame!</span>
        </h1>

        <p className="mx-auto mb-9 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
          Sorry, the page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or is temporarily unavailable. Let&apos;s get you back to
          discovering creative spaces.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5F45B] px-7 py-4 font-semibold text-black transition hover:bg-black hover:text-white"
          >
            <Home size={19} />
            Back to Home
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/studios"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-7 py-4 font-semibold text-gray-800 transition hover:border-black hover:bg-gray-100"
          >
            <Search size={19} />
            Explore Studios
          </Link>
        </div>

        {/* Footer Message */}
        <div className="mt-14 border-t border-gray-200 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Return to StudioSpace
          </Link>
        </div>
      </div>
    </main>
  );
}