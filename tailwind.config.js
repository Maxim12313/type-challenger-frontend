/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color1" : "var(--color1)",
        "color2" : "var(--color2)",
        "color3" : "var(--color3)",
        "color4" : "var(--color4)",
        "slate" : "var(--slate)",
        "light-slate" : "var(--light-slate)",
        "lightest-slate" : "var(--lightest-slate)",
      },
      fontFamily: {
        "sans" : "var(--font-sans)",
        "mono" : "var(--font-mono)"
      }
    },
  },
  plugins: [],
};
