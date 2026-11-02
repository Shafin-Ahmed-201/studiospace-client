'use client'
import Link from "next/link";
import {
  Aperture,
  ArrowUpRight,
  Camera,
  Globe,
  BriefcaseBusiness,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  explore: [
    { name: "All Studios", href: "/studios" },
    { name: "Photo Studios", href: "/studios?category=Photo%20Studio" },
    { name: "Film Stages", href: "/studios?category=Film%20Stage" },
    { name: "Podcast Rooms", href: "/studios?category=Podcast%20Lounge" },
    { name: "Music Suites", href: "/studios?category=Music%20Suite" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact Us", href: "/contact" },
    { name: "Become a Host", href: "/add-studio" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Camera, href: "https://instagram.com", label: "Instagram" },
  { icon: Globe, href: "https://facebook.com", label: "Facebook" },
  { icon: BriefcaseBusiness, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: ArrowUpRight, href: "https://x.com", label: "X" },
];

export default function Footer() {
  return (
    <footer className="bg-[#171A18] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-xl">
            <span className="mb-3 inline-block rounded-full bg-[#C5F45B]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C5F45B]">
              Stay Inspired
            </span>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your next creative space
              <span className="text-[#C5F45B]"> awaits.</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/55">
              Discover inspiring studios, creative spaces and opportunities to
              bring your next big idea to life.
            </p>
          </div>

          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              // Connect your newsletter API here.
            }}
          >
            <Input
              type="email"
              required
              placeholder="Enter your email address"
              className="h-12 border-white/15 bg-white/5 text-white placeholder:text-white/40 focus-visible:ring-[#C5F45B]"
            />

            <Button
              type="submit"
              className="h-12 shrink-0 bg-[#C5F45B] px-5 font-semibold text-black hover:bg-[#b5e447]"
            >
              Subscribe
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="mb-5 inline-flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#C5F45B] text-black">
              <Aperture size={27} strokeWidth={2.2} />
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight">
                Studio<span className="text-[#C5F45B]">Space</span>
              </h2>
              <p className="text-[9px] uppercase tracking-[3px] text-white/40">
                Create Without Limits
              </p>
            </div>
          </Link>

          <p className="max-w-sm text-sm leading-7 text-white/55">
            A creative home for creators. Discover inspiring studios, connect
            with talented hosts and find the perfect space to turn your ideas
            into reality.
          </p>

          {/* Contact */}
          <div className="mt-7 space-y-3 text-sm text-white/55">
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#C5F45B]" />
              <a
                href="mailto:hello@studiospace.com"
                className="hover:text-white"
              >
                hello@studiospace.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#C5F45B]" />
              <span>Available wherever creativity lives</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-7 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all hover:border-[#C5F45B] hover:bg-[#C5F45B] hover:text-black"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
            Explore
          </h3>

          <ul className="space-y-4">
            {footerLinks.explore.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-[#C5F45B]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
            Company
          </h3>

          <ul className="space-y-4">
            {footerLinks.company.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-[#C5F45B]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
            Support
          </h3>

          <ul className="space-y-4">
            {footerLinks.support.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-[#C5F45B]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-center sm:flex-row sm:text-left lg:px-8">
          <p className="text-xs text-white/40">
            © 2026 StudioSpace. All rights reserved.
          </p>

          <p className="text-xs text-white/40">
            Made for creators, by creativity.
          </p>

          <Link
            href="/"
            className="text-xs font-semibold text-[#C5F45B] hover:text-white"
          >
            Create Without Limits ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
