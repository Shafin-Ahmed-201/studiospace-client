
import Link from "next/link";
import {
  Aperture,
  Camera,
  Music2,
  Mic2,
  Palette,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Heart,
  Target,
  Lightbulb,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Creator First",
    description:
      "We put creators at the center of everything we do, making it easier to find spaces where ideas can grow.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "We believe in clear pricing, reliable information, and a trustworthy booking experience.",
  },
  {
    icon: Lightbulb,
    title: "Creative Freedom",
    description:
      "Every creator deserves access to the right environment to experiment, collaborate, and create.",
  },
];

const features = [
  {
    icon: Camera,
    title: "Photo Studios",
    description: "Professional spaces for photography and creative shoots.",
  },
  {
    icon: Music2,
    title: "Music Suites",
    description: "Dedicated spaces for musicians, recording, and production.",
  },
  {
    icon: Mic2,
    title: "Podcast Rooms",
    description: "Well-equipped rooms for podcasts and voice recording.",
  },
  {
    icon: Palette,
    title: "Art Workshops",
    description: "Inspiring environments for art, design, and creative work.",
  },
];

const steps = [
  {
    number: "01",
    title: "Explore",
    description:
      "Discover creative studios and compare spaces based on your needs.",
  },
  {
    number: "02",
    title: "Choose",
    description:
      "Find the perfect space by checking its facilities, location, and hourly price.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Book your creative space and turn your ideas into something amazing.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8F9F5] text-[#20251D]">
      {/* Hero Section */}
      <section className="px-4 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#EFF7D9] px-4 py-2 text-sm font-semibold text-[#607B22]">
              <Sparkles className="h-4 w-4" />
              About StudioSpace
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              A Space Where
              <span className="text-[#8AAE36]"> Creativity </span>
              Comes Alive.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 md:text-lg">
              StudioSpace is a creative space discovery platform designed to
              connect creators with inspiring studios. Whether you are a
              photographer, musician, podcaster, or artist, we help you find
              the right environment to bring your ideas to life.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/studios"
                className="inline-flex items-center gap-2 rounded-full bg-[#C5F45B] px-7 py-3.5 font-semibold text-black transition hover:bg-[#b5e64b]"
              >
                Explore Studios
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-gray-300 px-7 py-3.5 font-semibold transition hover:bg-white"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-[#C5F45B]/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200"
                alt="Creative studio workspace"
                className="h-[350px] w-full object-cover md:h-[480px]"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur">
                <p className="text-sm font-medium text-gray-500">
                  Your creativity deserves
                </p>
                <p className="text-xl font-bold">The perfect space.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-white px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-[#F8F9F5] p-8 md:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFF7D9] text-[#779C29]">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-4 leading-8 text-gray-600">
              Our mission is to make creative spaces accessible to everyone.
              We simplify the process of discovering and booking studios so
              creators can spend less time searching and more time creating.
            </p>
          </div>

          <div className="rounded-3xl bg-[#20251D] p-8 text-white md:p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#C5F45B]">
              <Aperture className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Our Vision</h2>
            <p className="mt-4 leading-8 text-gray-300">
              We envision a world where every creative mind can access the
              perfect environment to express ideas, collaborate with others,
              and transform imagination into reality.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-widest text-[#779C29]">
              Explore possibilities
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Spaces for Every Creative Mind
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              From photography to music production, discover a space that
              matches your passion and creative workflow.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF7D9] text-[#779C29]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-widest text-[#779C29]">
              Simple process
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              How StudioSpace Works
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative rounded-2xl p-6">
                <span className="text-5xl font-bold text-[#C5F45B]">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="font-semibold uppercase tracking-widest text-[#779C29]">
              What matters to us
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              The Values Behind StudioSpace
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
                >
                  <Icon className="h-8 w-8 text-[#8AAE36]" />
                  <h3 className="mt-5 text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 leading-7 text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#20251D] px-6 py-16 text-center text-white md:px-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C5F45B] text-black">
            <Users className="h-7 w-7" />
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold md:text-5xl">
            Ready to Bring Your Ideas to Life?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-300">
            Find your perfect creative space and start making something
            extraordinary with StudioSpace.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C5F45B] px-8 py-3.5 font-semibold text-black transition hover:bg-[#b5e64b]"
          >
            Find Your Studio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
