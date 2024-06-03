/** @type {import('tailwindcss').Config} */
<<<<<<< dev-rusty
const { nextui } = require("@nextui-org/react");
=======
>>>>>>> dev

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'AzulOs': '#2A324B',
          'Azul': '#007FFF',
          'AzulCl': '#4897ff',
          'NaranjaOs': '#B87E14',
          'Naranja': '#FFA500',
          'NaranjaTrans50': 'rgba(255,165,0,0.5)',
          'NaranjaTrans20': 'rgba(255,165,0,0.2)',
          'VerLima': '#9BC995', 
          'VerTrans': 'rgba(155,201,149,0.6)',
          'VerTrans30': 'rgba(155,201,149,0.3)',
          'Blanco': '#FFFFFF',
          'Negro': '#2c2d2d',
          'VerdeCl': '#85C17E',
          'VerdeOs': '#2E7D32',
          'Red': '#ff4c4c',
          'RedOs': '#8B0000'
        },
        backgroundImage: {
          'portadaHome': "url('./src/assets/images/comunartePortada.png')",
          'botonDigital': "url('./src/assets/images/digital.jpg')",
          'botonEsculturas': "url('./src/assets/images/esculturas.jpg')",
          'botonPinturas': "url('./src/assets/images/pinturas.jpg')",
        }
      },
    },
<<<<<<< dev-rusty
    darkMode: "class",
    plugins: [nextui()],
=======
    plugins: [],
>>>>>>> dev
}