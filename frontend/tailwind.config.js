/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFC107', // Amarillo principal
          light: '#FFD54F', // Amarillo claro
          dark: '#FFA000', // Amarillo oscuro
        },
        background: {
          DEFAULT: '#F9FAFB', // Blanco suave para el fondo principal
          dark: '#212121', // Negro puro para contrastes
        },
        text: {
          DEFAULT: '#333333', // Gris oscuro para texto principal
          light: '#666666', // Gris medio para subtítulos
          dark: '#FFFFFF', // Blanco para texto en fondos oscuros
        },
        border: {
          DEFAULT: '#E0E0E0', // Gris claro para bordes
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fuente moderna y profesional
        serif: ['Merriweather', 'serif'], // Fuente decorativa para títulos
      },
    },
  },
  plugins: [],
};
