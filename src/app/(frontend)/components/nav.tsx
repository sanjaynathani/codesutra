import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import {metaData, socialLinks} from "../config";
import Image from "next/image";

const navItems = {
  "/portfolio": { name: "Portfolio" },
  "/work": { name: "Work" },
  "/blog": { name: "Blog" },
};

export function Navbar() {
  return (
    <nav className="lg:mb-3 mb-1 py-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <a href="/">
            <Image
                src="/code-sutra_logo_light.png"
                alt="Code Sutra"
                className="block dark:hidden"
                width={190}
                height={100}
                priority
            />
            <Image
                src="/code-sutra_logo_dark.png"
                alt="Code Sutra"
                className="hidden dark:block"
                width={190}
                height={100}
                priority
            />

          </a>
        </div>
        <div className="flex flex-row gap-4 mt-3 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
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
