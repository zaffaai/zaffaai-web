// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-cream': '#F8F5EE', // Define your custom colors
        'brand-charcoal': '#1F1E29',
        'brand-red': '#C84241',
      },
      // 💥 START OF NEW ANIMATION KEYFRAMES 💥
      keyframes: {
        // Animation for the seamless scrolling screenshot strip (Marquee)
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Moves exactly half the total width (one full strip)
        },
        // Animation for the subtle floating background elements (Float)
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' }, // Gentle up/down with a slight wobble
        },
        // Animation for soft, pulsing background blobs (Blob)
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 45s linear infinite', // Slower, continuous scroll
        float: 'float 8s ease-in-out infinite', // Gentle up/down float
        blob: 'blob 12s ease-in-out infinite alternate', // Subtle, organic movement
      },
      // 💥 END OF NEW ANIMATION KEYFRAMES 💥
    },
  },
  plugins: [],
}