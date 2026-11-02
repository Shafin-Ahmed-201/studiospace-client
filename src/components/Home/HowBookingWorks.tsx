
import Link from "next/link";
import {
  Search,
  CalendarDays,
  CreditCard,
  Headphones,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find Your Studio",
    description:
      "Explore a wide range of professional studios and find the perfect space for your creative needs.",
    icon: Search,
    color: "bg-orange-100 text-orange-600",
  },
  {
    number: "02",
    title: "Choose Your Schedule",
    description:
      "Select your preferred date, available time slot, and the duration of your studio session.",
    icon: CalendarDays,
    color: "bg-blue-100 text-blue-600",
  },
  {
    number: "03",
    title: "Confirm Your Booking",
    description:
      "Review your booking details, complete the payment, and receive your booking confirmation.",
    icon: CreditCard,
    color: "bg-purple-100 text-purple-600",
  },
  {
    number: "04",
    title: "Enjoy Your Session",
    description:
      "Visit your booked studio at the scheduled time and bring your creative ideas to life.",
    icon: Headphones,
    color: "bg-green-100 text-green-600",
  },
];

export default function HowBookingWorks() {
  return (
    <section id="how-booking-works" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            Simple & Easy Process
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How Booking Works
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Booking your perfect creative space has never been easier.
            Follow these four simple steps and get started.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl"
              >
                {/* Step Number */}
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <span className="text-4xl font-bold text-slate-100">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-slate-600">
                  {step.description}
                </p>

                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight
                      size={24}
                      className="text-orange-300"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl bg-slate-900 px-8 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <div className="mb-2 flex items-center justify-center gap-2 text-[#C5F45B] sm:justify-start">
              <CheckCircle2 size={20} />
              <span className="text-sm font-semibold">
                Ready to get started?
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              Your Creative Space Is Just a Click Away!
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Discover the perfect studio and book your next session today.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C5F45B] px-6 py-3 font-semibold text-black transition hover:bg-white"
          >
            Explore Studios
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
