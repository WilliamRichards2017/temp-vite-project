<template>
  <v-app>
    <!-- Screen reader announcement -->
    <div aria-live="polite" class="sr-only">
      This portfolio implements WAI-ARIA standards and offers multiple accessibility controls.
    </div>

    <v-app-bar>
      <contact />
    </v-app-bar>

    <v-main>
      <router-view />

      <!-- Dynamic FAB -->
      <v-btn
        v-if="!showAccessibilityStatement && !showKeyboardHelp"
        class="fab-button"
        app
        title="Accessibility Controls"
        aria-label="Open detailed accessibility controls"
        @click="drawer = !drawer"
      >
        <icon :path="mdiHuman" size="24" />
      </v-btn>

      <!-- Accessibility Drawer -->
      <v-navigation-drawer
        v-model="drawer"
        location="right"
        temporary
        width="400"
        class="accessibility-drawer"
      >
        <v-toolbar color="background">
          <v-toolbar-title class="text-h6">
            Accessibility Controls
          </v-toolbar-title>
          <v-btn @click="drawer = false" aria-label="Close accessibility controls">
            <icon :path="mdiClose" />
          </v-btn>
        </v-toolbar>

        <ul class="py-0">
          <!-- Motion Control -->
          <li class="v-list-item">
            <div class="v-list-item__prepend">
              <icon :path="mdiMotion" class="mr-2" />
            </div>
            <div class="v-list-item__content">
              <div class="v-list-item-title">Motion Reduction</div>
              <div class="v-list-item-subtitle">
                System preference: {{ systemPrefersReducedMotion ? 'Enabled' : 'Disabled' }}
              </div>
            </div>
            <div class="v-list-item__append">
              <v-switch
                v-model="disableAnimations"
                color="primary"
                role="switch"
                :aria-label="`Motion reduction ${disableAnimations ? 'enabled' : 'disabled'}`"
              />
            </div>
          </li>

          <!-- Text Scaling -->
          <li class="v-list-item">
            <div class="v-list-item__prepend">
              <icon :path="mdiFormatSize" class="mr-2" />
            </div>
            <div class="v-list-item__content">
              <label for="text-scaling-slider">Text Scaling</label>
              <div class="v-list-item-subtitle">
                Current scale: {{ textScale }}x
              </div>
            </div>
            <div class="v-list-item__append">
              <div class="slidecontainer">
                <input
                  type="range"
                  id="text-scaling-slider"
                  class="slider"
                  v-model="textScale"
                  min="0.8"
                  max="1.5"
                  step="0.1"
                  aria-label="Text Scaling"
                  style="width: 120px"
                />
              </div>
            </div>
          </li>

          <!-- Contrast Control -->
          <li class="v-list-item">
            <div class="v-list-item__prepend">
              <icon :path="mdiContrastCircle" class="mr-2" />
            </div>
            <div class="v-list-item__content">
              <div class="v-list-item-title">High Contrast</div>
              <div class="v-list-item-subtitle">
                {{ highContrast ? 'Enabled' : 'System default' }}
              </div>
            </div>
            <div class="v-list-item__append">
              <v-switch
                v-model="highContrast"
                color="primary"
                role="switch"
                :aria-label="`High contrast mode ${highContrast ? 'enabled' : 'disabled'}`"
              />
            </div>
          </li>
        </ul>

        <!-- Drawer Footer -->
        <div class="drawer-footer pa-4">
          <p class="text-caption">
            <icon :path="mdiInformation" size="16" class="mr-1" />
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

      <!-- Dialogs -->
      <v-dialog v-model="showAccessibilityStatement" max-width="600">
        <accessibility-statement @close="showAccessibilityStatement = false" />
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

import { ref, watch, onMounted, defineComponent } from 'vue';
import Cookies from 'js-cookie';

import {
  mdiHuman,
  mdiClose,
  mdiMotion,
  mdiFormatSize,
  mdiContrastCircle,
  mdiInformation
} from '@mdi/js';

const Icon = defineComponent({
  props: {
    path: { type: String, required: true },
    size: { type: [Number, String], default: 24 },
    color: { type: String, default: 'currentColor' }
  },
  setup(props) {
    return () => h('svg', {
      viewBox: "0 0 24 24",
      width: props.size,
      height: props.size,
      fill: props.color,
      class: "inline-block align-middle"
    }, [
      h('path', { d: props.path })
    ]);
  }
});

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

.v-list-item-subtitle {
  -webkit-line-clamp: unset !important;
  color: rgba(var(--v-theme-text-secondary));
  font-size: 0.875rem
}

html {
  font-size: calc(1rem * var(--text-scale));
}

/* FAB Positioning Fix */
.fab-button {
  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 1000;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  background-color: var(--v-theme-primary);
  color: var(--v-theme-on-primary);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  padding: 8px;
}

.fab-button:hover {
  background-color: var(--v-theme-primary-darken-1);
}

.fab-button:active {
  background-color: var(--v-theme-primary-darken-2);
}

.fab-adjusted {
  transform: translateX(calc(-320px + -2rem)) !important;
}

@media (max-width: 960px) {
  .fab-adjusted {
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
.accessibility-drawer ul {
  padding-bottom: 96px; /* Space for mobile nav bars */
}

.drawer-footer {
  width: 100%;
  background: rgba(var(--v-theme-background), 0.9);
  backdrop-filter: blur(4px);
  padding: 16px;
}

/* List Item Styles */
.v-list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.v-list-item__prepend {
  margin-right: 16px;
}

.v-list-item__content {
  flex: 1;
}

.v-list-item__append {
  margin-left: 16px;
}

.slidecontainer {
  width: 100%; /* Width of the outside container */
}


.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary));
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}


</style>
