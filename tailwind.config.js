/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: "#EAFF9C",
        light: "#F4E8F3",
        gray: "#cccccc",
        "dark-1": "#363839",
        "dark-2": "#2A2C2E",
        "dark-3": "#222222",
      },
    },
  },
  plugins: [],
};
