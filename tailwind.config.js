/** @type {import('tailwindcss').Config} */

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'portadaHome': "url('./src/assets/images/comunartePortada.png')",
          'botonDigital': "url('./src/assets/images/digital.jpg')",
          'botonEsculturas': "url('./src/assets/images/esculturas.jpg')",
          'botonPinturas': "url('./src/assets/images/pinturas.jpg')"
        }
      },
    },
    plugins: [],
}