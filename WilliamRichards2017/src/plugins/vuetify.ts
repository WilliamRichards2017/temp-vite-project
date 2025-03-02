/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const darkTheme = {
  "dark": true,
  "colors": {
    "background": "#121212",
    "surface": "#212121",
    "primary": "#2A70C2",
    "secondary": "#03DAC5",
    "error": "#CF6679",
    "info": "#2196F3",
    "success": "#4CAF50",
    "warning": "#FB8C00"
  }
};

const lightTheme = {
  "dark": false,
  "colors": {
    "background": "#F5F5F5",
    "surface": "#FFFFFF",
    "primary": "#50A6FF",
    "secondary": "#E6E9FF",
    "error": "#F44336",
    "info": "#2196F3",
    "success": "#4CAF50",
    "warning": "#FFC107"
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
