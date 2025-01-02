/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00BFFF', // Azul Claro similar al de Dinoco
        secondary: '#FFA500', // Naranja
        accent: '#FFFFFF', // Blanco
      },
      keyframes: {
        neon: {
          '0%, 100%': { textShadow: '0 0 5px #00BFFF, 0 0 10px #00BFFF, 0 0 20px #FFA500, 0 0 30px #FFA500' },
          '50%': { textShadow: '0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 30px #FFA500, 0 0 40px #FFA500' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        neon: 'neon 1.5s ease-in-out infinite',
        gradient: 'gradient 15s ease infinite',
      },
      backgroundImage: {
        'gradient-rainbow': 'linear-gradient(270deg, #00BFFF, #FFA500, #00BFFF)',
      },
    },
  },
  plugins: [],
};
