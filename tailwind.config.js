import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./public/**/*.svg"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
      colors: {
        accent: {
          light: '#0f766e', /* teal-700 */
          dark: '#2dd4bf',  /* teal-400 */
        },
        turquoise: {
          400: '#40E0D0',
          500: '#30D5C8',
        }
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
