/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

//


const darkTheme = {
  "dark": true,
  "colors": {
    "background": "#111111",
    "text-primary": "#FFFFFF",
    "text-secondary": "#EEEEEE",
    "surface": "#212121",
    "primary": "#4A90E2",
    "secondary": "#03DAC5",
    "error": "#CF6679",
    "info": "#2196F3",
    "success": "#4CAF50",
    "warning": "#FB8C00",
    "overlay-start": "#142531", // rgba(20, 37, 49, 1) in hex
    "overlay-end": "#0C161E", // rgba(12, 22, 30, 1) in hex
    "card-border": "#000000", // rgba(0, 0, 0, 1) in hex
    "highlight-bg": "#FFFFFF", // rgba(255, 255, 255, 1) in hex
    "highlight-border": "#FFFFFF", // rgba(255, 255, 255, 1) in hex
    "text-shadow": "#000000", // rgba(0, 0, 0, 1) in hex
    "accent": "#FFD452" // rgba(255, 212, 82, 1) in hex
  }
};

const lightTheme = {
  "dark": false,
  "colors": {
    "background": "#F5F5F5",
    "text-primary": "#000",
    "text-secondary": "#111",
    "surface": "#FFFFFF",
    "primary": "#2A70C2",
    "secondary": "#03DAC5",
    "error": "#F44336",
    "info": "#2196F3",
    "success": "#4CAF50",
    "warning": "#FFC107",
    "overlay-start": "#FFFFFFE6", // rgba(255, 255, 255, 0.9) in hex
    "overlay-end": "#FFFFFFB3", // rgba(255, 255, 255, 0.7) in hex
    "card-border": "#000000",
    "highlight-bg": "#000000",
    "highlight-border": "#000000",
    "text-shadow": "#FFFFFF",
    "accent": "#FFD452"
  }
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      defaultTheme: lightTheme,

      light: lightTheme,
      dark: darkTheme
    },

  }
})
