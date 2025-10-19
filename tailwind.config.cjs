module.exports = {
  content: ['./app/**/*.{ts,tsx,js,jsx}','./components/**/*.{ts,tsx,js,jsx}','./pages/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { red:'#C41D1D', cream:'#FFFBE5', charcoal:'#111827', rose:'#FDE2E2' },
      },
      keyframes: {
        float: { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-8px)'} },
        marquee: { '0%':{transform:'translateX(0)'}, '100%':{transform:'translateX(-50%)'} },
        blob: {
          '0%,100%':{ borderRadius:'48% 52% 60% 40% / 45% 55% 45% 55%' },
          '50%':{ borderRadius:'40% 60% 42% 58% / 50% 40% 60% 50%' }
        }
      },
      animation: {
        float:'float 6s ease-in-out infinite',
        marquee:'marquee 28s linear infinite',
        blob:'blob 12s ease-in-out infinite',
      },
      boxShadow: { card:'0 10px 30px rgba(17,24,39,0.08)' },
    },
  },
  plugins: [],
}
