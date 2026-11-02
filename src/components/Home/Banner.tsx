
"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Aperture,
  Camera,
  Mic2,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    category: "FOR PHOTOGRAPHERS & CREATORS",
    title: "Find Your Space.",
    highlight: "Create Your Story.",
    description:
      "Discover extraordinary photography studios and creative spaces designed to bring your imagination to life.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2000&q=85",
    icon: Camera,
    tag: "Photography Studios",
  },
  {
    id: 2,
    category: "FOR FILMMAKERS & PRODUCERS",
    title: "Big Ideas Need",
    highlight: "Bigger Stages.",
    description:
      "Find professional production spaces, cinematic sound stages and fully equipped creative environments.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=2000&q=85",
    icon: Video,
    tag: "Production Studios",
  },
  {
    id: 3,
    category: "FOR PODCASTERS & MUSICIANS",
    title: "Make Some Noise.",
    highlight: "Create Something.",
    description:
      "Explore inspiring podcast rooms and music recording suites built for your next masterpiece.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=2000&q=85",
    icon: Mic2,
    tag: "Music & Podcast Studios",
  },
];

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = slides[activeSlide];
  const SlideIcon = currentSlide.icon;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#171A18]">

      {/* Background Image */}
      <div
        key={currentSlide.id}
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('${currentSlide.image}')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      {/* Decorative Glow */}
      <div className="absolute -left-32 top-20 size-96 rounded-full bg-[#C5F45B]/10 blur-[120px]" />

      {/* Main Content */}
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:min-h-[700px] lg:px-10">

        <div className="max-w-3xl">

          {/* Category Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
            <SlideIcon size={15} className="text-[#C5F45B]" />

            <span className="text-[10px] font-semibold tracking-[2px] text-white sm:text-xs">
              {currentSlide.category}
            </span>
          </div>

          {/* Heading */}
          <h1
            key={`heading-${currentSlide.id}`}
            className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-8xl"
          >
            {currentSlide.title}

            <span className="mt-2 block text-[#C5F45B]">
              {currentSlide.highlight}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            {currentSlide.description}
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            <Button
              
              size="lg"
              className="h-14 rounded-full bg-[#C5F45B] px-8 text-base font-bold text-black hover:bg-[#b5e447]"
            >
              <Link href="/studios">
                Explore Studios
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>

            <Button
              
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-white/40 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-black"
            >
              <Link href="/add-studio">
                Host Your Space
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>

          </div>

          {/* Bottom Feature */}
          <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-white/20 pt-6">

            <div className="flex items-center gap-2">
              <Aperture className="size-5 text-[#C5F45B]" />
              <span className="text-xs font-medium text-white/80">
                Spaces for Every Creator
              </span>
            </div>

            <div className="hidden h-5 w-px bg-white/30 sm:block" />

            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#C5F45B]" />
              <span className="text-xs font-medium text-white/80">
                Book by the Hour
              </span>
            </div>

          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-8 right-5 flex items-center gap-4 sm:right-8 lg:right-10">

          <span className="mr-2 text-sm font-medium text-white/70">
            0{activeSlide + 1}
            <span className="mx-2 text-white/30">/</span>
            0{slides.length}
          </span>

          <Button
            variant="outline"
            size="icon"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="size-11 rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-[#C5F45B] hover:text-black"
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Next slide"
            onClick={nextSlide}
            className="size-11 rounded-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-[#C5F45B] hover:text-black"
          >
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-5 flex gap-2 sm:left-8 lg:left-10">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-10 bg-[#C5F45B]"
                  : "w-4 bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
