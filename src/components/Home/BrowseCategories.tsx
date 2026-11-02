
import Link from "next/link";
import {
  Camera,
  Music2,
  Palette,
  Mic2,
  Volume2,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    title: "Photo Studios",
    description: "Capture beautiful moments in professional photography spaces.",
    count: "12+ Studios",
    icon: Camera,
    color: "bg-orange-100 text-orange-600",
    category: "Photo Studios",
  },
  {
    title: "Sound Stages",
    description: "Explore professional spaces for sound recording and production.",
    count: "10+ Studios",
    icon: Volume2,
    color: "bg-green-100 text-green-600",
    category: "Sound Stages",
  },
  {
    title: "Podcast Rooms",
    description: "Find dedicated spaces for podcasts, interviews, and voice recording.",
    count: "06+ Studios",
    icon: Mic2,
    color: "bg-blue-100 text-blue-600",
    category: "Podcast Rooms",
  },
  {
    title: "Music Suites",
    description: "Create, record, and produce music in professional studio spaces.",
    count: "08+ Studios",
    icon: Music2,
    color: "bg-purple-100 text-purple-600",
    category: "Music Suites",
  },
  {
    title: "Art Workshops",
    description: "Explore your creativity through painting, drawing, and art.",
    count: "15+ Studios",
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
    category: "Art Workshops",
  },
];

export default function BrowseCategories() {
  return (
    <section className="bg-white px-5 py-20 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#758D32]">
            Explore Your Possibilities
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#20251D] md:text-5xl">
            Browse Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Find the perfect creative space for your passion.
            From photography and music to art and video production,
            explore spaces that inspire your next big idea.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                 href={`/studios/category/${encodeURIComponent(category.category)}`}
                className="group rounded-2xl border border-gray-100 bg-[#FAFBF8] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#C5F45B] hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.color}`}
                  >
                    <Icon size={28} strokeWidth={1.8} />
                  </div>

                  <ArrowUpRight
                    className="text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#758D32]"
                    size={22}
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#20251D] transition-colors group-hover:text-[#758D32]">
                  {category.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm font-semibold text-[#758D32]">
                    {category.count}
                  </span>

                  <span className="text-sm font-medium text-gray-400 transition-colors group-hover:text-[#758D32]">
                    Explore Studios
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
