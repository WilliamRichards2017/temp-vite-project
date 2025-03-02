<template>
  <v-app>
    <!-- Screen reader announcement -->
    <div aria-live="polite" class="sr-only">
      This portfolio implements WAI-ARIA standards and offers multiple accessibility controls.
    </div>

    <v-app-bar>
      <contact />
      <!-- Accessibility shortcut -->
      <template v-slot:append>
        <v-btn
          icon="mdi-accessibility"
          variant="text"
          @click="drawer = true"
          class="mr-2"
          aria-label="Quick access to accessibility settings"
        ></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />

      <!-- Dynamic FAB positioning -->
      <v-fab
        icon="mdi-human"
        location="right bottom"
        :class="{'fab-adjusted': drawer}"
        app
        @click="drawer = !drawer"
        aria-label="Open detailed accessibility controls"
      ></v-fab>

      <!-- Enhanced drawer -->
      <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
        width="320"
        class="accessibility-drawer"
      >
        <v-toolbar color="primary">
          <v-toolbar-title class="text-h6">
            Accessibility Controls
          </v-toolbar-title>
          <v-btn
            icon="mdi-close"
            @click="drawer = false"
            aria-label="Close accessibility controls"
          ></v-btn>
        </v-toolbar>

        <v-list class="py-4">
          <!-- Motion control -->
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-motion" class="mr-2"></v-icon>
            </template>
            <v-list-item-title>Motion Reduction</v-list-item-title>
            <v-list-item-subtitle>
              System preference: {{ systemPrefersReducedMotion ? 'Enabled' : 'Disabled' }}
            </v-list-item-subtitle>
            <template v-slot:append>
              <v-switch
                v-model="disableAnimations"
                color="primary"
                role="switch"
                :aria-label="`Motion reduction ${disableAnimations ? 'enabled' : 'disabled'}`"
              ></v-switch>
            </template>
          </v-list-item>

          <!-- Text Scaling -->
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-format-size" class="mr-2"></v-icon>
            </template>
            <v-list-item-title>Text Scaling</v-list-item-title>
            <v-list-item-subtitle>
              Current scale: {{ textScale }}x
            </v-list-item-subtitle>
            <template v-slot:append>
              <v-slider
                v-model="textScale"
                min="0.8"
                max="1.5"
                step="0.1"
                style="width: 120px"
                thumb-label
                aria-label="Text scaling slider"
              ></v-slider>
            </template>
          </v-list-item>

          <!-- Contrast Control -->
          <v-list-item>
            <template v-slot:prepend>
              <v-icon icon="mdi-contrast-circle" class="mr-2"></v-icon>
            </template>
            <v-list-item-title>High Contrast</v-list-item-title>
            <v-list-item-subtitle>
              {{ highContrast ? 'Enabled' : 'System default' }}
            </v-list-item-subtitle>
            <template v-slot:append>
              <v-switch
                v-model="highContrast"
                color="primary"
                role="switch"
                :aria-label="`High contrast mode ${highContrast ? 'enabled' : 'disabled'}`"
              ></v-switch>
            </template>
          </v-list-item>

          <!-- Keyboard Navigation Helper -->
          <v-list-item @click="showKeyboardHelp = true">
            <template v-slot:prepend>
              <v-icon icon="mdi-keyboard" class="mr-2"></v-icon>
            </template>
            <v-list-item-title>Keyboard Shortcuts</v-list-item-title>
            <v-list-item-subtitle>View available commands</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <!-- Drawer Footer -->
        <div class="drawer-footer pa-4">
          <v-divider class="mb-4"></v-divider>
          <p class="text-caption">
            <v-icon icon="mdi-information" size="small" class="mr-1"></v-icon>
            Settings are saved for future visits.
            <a
              href="/accessibility-statement"
              class="text-primary"
              @click.prevent="showAccessibilityStatement = true"
              aria-label="Read our full accessibility statement"
            >
              Read full statement
            </a>
          </p>
        </div>
      </v-navigation-drawer>

      <!-- Accessibility Statement Dialog -->
      <v-dialog v-model="showAccessibilityStatement" max-width="600">
        <accessibility-statement @close="showAccessibilityStatement = false" />
      </v-dialog>

      <!-- Keyboard Help Dialog -->
      <v-dialog v-model="showKeyboardHelp" max-width="600">
        <keyboard-help @close="showKeyboardHelp = false" />
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import Cookies from 'js-cookie';

// Motion Control
const systemPrefersReducedMotion = ref(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
const disableAnimations = ref(Cookies.get("disableAnimations") === "true" || systemPrefersReducedMotion.value);

// Text Scaling
const textScale = ref(parseFloat(Cookies.get("textScale") || '1'));
const updateTextScale = (value: number) => {
  document.documentElement.style.setProperty('--text-scale', `${value}`);
  Cookies.set("textScale", value.toString(), { expires: 365 });
};

// Contrast Control
const highContrast = ref(Cookies.get("highContrast") === "true");
const updateContrast = (value: boolean) => {
  document.body.classList.toggle('high-contrast', value);
  Cookies.set("highContrast", value.toString(), { expires: 365 });
};

// Dialogs
const showAccessibilityStatement = ref(false);
const showKeyboardHelp = ref(false);

// Watchers
watch([disableAnimations, textScale, highContrast], ([motion, scale, contrast]) => {
  document.body.classList.toggle("no-animations", motion);
  updateTextScale(scale);
  updateContrast(contrast);
});

// Initial Setup
onMounted(() => {
  document.body.classList.toggle("no-animations", disableAnimations.value);
  updateTextScale(textScale.value);
  updateContrast(highContrast.value);

  // System preference listeners
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener('change', e => {
    systemPrefersReducedMotion.value = e.matches;
    if (!Cookies.get("disableAnimations")) disableAnimations.value = e.matches;
  });
});

// FAB/Drawer Fix
const drawer = ref(false);
</script>

<style>
/* Base Scaling */
:root {
  --text-scale: 1;
}

html {
  font-size: calc(1rem * var(--text-scale));
}

/* FAB Positioning Fix */
.v-btn--fab.fab-adjusted {
  transform: translateX(calc(-320px + -2rem)) !important;
  transition: transform 0.3s ease;
}

@media (max-width: 960px) {
  .v-btn--fab.fab-adjusted {
    transform: translateY(calc(-100% - 2rem)) !important;
  }
}

/* High Contrast Mode */
.high-contrast {
  /* --v-theme-background: #000 !important;
  --v-theme-surface: #111 !important;
  --v-theme-primary: #FFD700 !important;
  --v-theme-on-primary: #000 !important;
  filter: contrast(1.4); */
}

/* Focus States */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--v-theme-primary) !important;
  outline-offset: 2px;
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Drawer Padding Fix */
.accessibility-drawer .v-list {
  padding-bottom: 96px; /* Space for mobile nav bars */
}

.drawer-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(var(--v-theme-background), 0.9);
  backdrop-filter: blur(4px);
}
</style>
