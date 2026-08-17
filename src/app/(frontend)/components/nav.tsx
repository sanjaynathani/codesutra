"use client";

import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // You already have lucide-react in your dependencies

const navItems: Record<string, { name: string }> = {
  // "/portfolio": { name: "Portfolio" },
  // "/work": { name: "Work" },
  // "/writings": { name: "Writings" },
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50 lg:mb-3 mb-1 py-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center justify-between ml-10">
            <a href="/">
              <Image
                  src="/code-sutra_logo_light.png"
                  alt="Code Sutra"
                  className="block dark:hidden"
                  style={{ transform: 'scale(1.3) scaleX(1.05)', transformOrigin: 'left center' }}
                  width={140}
                  height={140}
                  priority
              />
              <Image
                  src="/code-sutra_logo_dark.png"
                  alt="Code Sutra"
                  className="hidden dark:block"
                  style={{ transform: 'scale(1.3) scaleX(1.05)', transformOrigin: 'left center', filter: 'brightness(1.2)' }}
                  width={140}
                  height={140}
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
            <div className="md:flex items-center mt-2 md:mt-0 flex-col md:flex-row hidden space-y-4 md:space-y-0">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                    <Link
                        key={path}
                        href={path}
                        className="transition-all hover:text-accent-light dark:hover:text-accent-dark flex align-middle relative py-1 px-4 lg:px-6 m-1 font-serif text-lg tracking-wide group"
                    >
                      {name}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-accent-light dark:bg-accent-dark transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                );
              })}
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </nav>
  );
}