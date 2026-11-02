
import {
  ShieldCheck,
  BadgeCheck,
  Wallet,
  Headset,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Verified Studio Hosts",
    description:
      "We prioritize trusted hosts and studio listings to help you book with confidence.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assured Spaces",
    description:
      "Discover professional creative spaces with clear details and essential amenities.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "Know your studio rental costs upfront, with clear pricing and no hidden surprises.",
  },
  {
    icon: Headset,
    title: "Reliable Support",
    description:
      "Our support team is here to help you with booking questions and unexpected issues.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <ShieldCheck size={17} />
              Book With Confidence
            </span>

            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Your Creative Space,
              <span className="text-[#C5F45B]"> Our Commitment.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Finding the right studio should be simple and stress-free.
              We are committed to making your booking experience reliable,
              transparent, and convenient from start to finish.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Clear studio information and pricing",
                "Trusted booking experience",
                "Support when you need assistance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-green-500"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/studios"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#C5F45B] px-6 py-3.5 font-semibold text-black transition hover:bg-white"
            >
              Find Your Studio
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right Guarantee Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {guarantees.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`rounded-2xl border border-slate-100 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg ${
                    index === 1 || index === 2 ? "sm:translate-y-8" : ""
                  }`}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
