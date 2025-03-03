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
    "background": "#111",
    "text-primary": "#FFF",
    "text-secondary": "#EEE",
    "surface": "#212121",
    "primary": "#4a90e2",
    "secondary": "#03DAC5",
    "error": "#CF6679",
    "info": "#2196F3",
    "success": "#4CAF50",
    "warning": "#FB8C00",
    "custom-theme": "#FFD700" // Moon color
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
    "custom-theme": "#FFA500" // Sun color
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
