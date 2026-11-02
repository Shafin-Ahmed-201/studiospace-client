"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Aperture,
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/#featured-studio" },
  { name: "How It Works", href: "/#how-booking-works" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setMobileOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-background/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={closeMobileMenu}
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#C5F45B] text-black">
            <Aperture size={25} strokeWidth={2.2} />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight">
              Studio<span className="text-[#91B936]">Space</span>
            </h1>
            <p className="text-[9px] font-medium uppercase tracking-[2px] text-muted-foreground">
              Create Without Limits
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                  ? false
                  : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#83A92C]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#C5F45B]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isPending && !user ? (
            <>
              <Button variant="ghost">
                <Link href="/sign-in">Login</Link>
              </Button>

              <Button
                
                className="rounded-full bg-[#C5F45B] px-6 font-semibold text-black hover:bg-[#b5e447]"
              >
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          ) : user ? (
            <DropdownMenu>
              {/* No nested button */}
              <DropdownMenuTrigger className="flex h-11 items-center gap-2 rounded-full border px-2 outline-none hover:bg-muted">
                <Avatar className="size-8">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback>
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <span className="max-w-28 truncate text-sm font-semibold">
                  {user.name}
                </span>

                <ChevronDown size={15} />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60 rounded-xl p-2"
              >
                {/* Group is required for DropdownMenuLabel */}
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p className="font-semibold">{user.name}</p>
                    <p className="truncate text-xs font-normal text-muted-foreground">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard")}
                  >
                    <LayoutDashboard className="mr-2 size-4" />
                    Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/add-studio")}
                  >
                    <PlusCircle className="mr-2 size-4" />
                    Add New Studio
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/my-listings")}
                  >
                    <Building2 className="mr-2 size-4" />
                    My Studio Listings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push("/my-bookings")}
                  >
                    <CalendarDays className="mr-2 size-4" />
                    My Bookings
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t bg-background px-5 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                    ? false
                    : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`rounded-lg px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-[#C5F45B]/20 text-[#83A92C]"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 border-t pt-5">
            {!isPending && user ? (
              <>
                <div className="mb-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.image || ""} />
                    <AvatarFallback>
                      {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                {[
                  {
                    name: "Dashboard",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                  },
                  {
                    name: "Add New Studio",
                    href: "/add-studio",
                    icon: PlusCircle,
                  },
                  {
                    name: "My Studio Listings",
                    href: "/my-listings",
                    icon: Building2,
                  },
                  {
                    name: "My Bookings",
                    href: "/my-bookings",
                    icon: CalendarDays,
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm hover:bg-muted"
                  >
                    <item.icon size={17} />
                    {item.name}
                  </Link>
                ))}

                <Button
                  variant="destructive"
                  className="mt-3 w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </Button>
              </>
            ) : !isPending ? (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Link href="/sign-in" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </Button>

                <Button
                  className="flex-1 bg-[#C5F45B] text-black hover:bg-[#b5e447]"
                  
                >
                  <Link href="/sign-up" onClick={closeMobileMenu}>
                    Register
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="h-10 animate-pulse rounded-lg bg-muted" />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
