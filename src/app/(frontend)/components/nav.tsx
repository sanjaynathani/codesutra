"use client";

import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // You already have lucide-react in your dependencies

const navItems = {
  "/portfolio": { name: "Portfolio" },
  "/work": { name: "Work" },
  "/blog": { name: "Blog" },
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black lg:mb-3 mb-1 py-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center justify-between ml-10">
            <a href="/">
              <Image
                  src="/code-sutra_logo_light.png"
                  alt="Code Sutra"
                  className="block dark:hidden"
                  width={80}
                  height={80}
                  priority
              />
              <Image
                  src="/code-sutra_logo_dark.png"
                  alt="Code Sutra"
                  className="hidden dark:block"
                  width={80}
                  height={80}
                  priority
              />
            </a>
            {/* Hamburger Menu Button */}
            <button
                className="md:hidden mr-10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                  <X className="h-6 w-6" />
              ) : (
                  <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <div
              className={`${
                  isMenuOpen ? 'flex' : 'hidden'
              } md:flex flex-col md:flex-row gap-3 mt-2 md:mt-0 ml-5 md:ml-auto items-center`}
          >
            {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative w-full md:w-auto text-center py-2 md:py-0"
                    onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </Link>
            ))}
            <ThemeSwitch />
          </div>
        </div>
      </nav>
  );
}