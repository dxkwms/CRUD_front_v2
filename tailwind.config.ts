import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        formBackground: "#12130F",
        buttonColor: "#AF253C",
        textWhite: "#F2EDE7",
        editButtonColor: "#8FCB9B",
      },
    },
  },
  plugins: [],
} satisfies Config;
