<template>

<div class="contact-wrapper">
  <div class="contact-container container">

    <v-btn
      @click="$router.push('/')"
      class="icon-link home-icon"
      aria-label="Return to home page"
      icon
            variant="text"

    >
      <Icon :path="mdiHome" :color="iconColor" size="24" />
    </v-btn>


            <v-switch
              v-model="isDark"
              color="primary"
              @click.prevent="toggleTheme"
              class="theme-switch"
              hide-details
              aria-label="Toggle theme"
            >
              <template #prepend>
                <div class="icon-container">
                  <transition name="orbit">
                    <Icon
                      :key="isDark ? 'moon' : 'sun'"
                      :path="isDark ? mdiMoonWaningCrescent : mdiWhiteBalanceSunny"
                        :size="24"
                        :color="isDark ?  '#2196F3' : '#FB8C00'"
                        :hover="false"
                      class="theme-icon"
                    />
                  </transition>
                </div>
              </template>
            </v-switch>
    </div>
    </div>
</template>

<script lang="ts" setup>
import {
  mdiHome,
  mdiMoonWaningCrescent,
  mdiWhiteBalanceSunny
} from '@mdi/js';

import { ref, computed, onMounted } from 'vue';
import Icon from './Icon.vue';
import { useTheme } from 'vuetify/lib/framework.mjs';

const theme = useTheme();
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? "dark" : "light";
  localStorage.setItem("theme", theme.global.name.value);
};

const iconColor = computed(() => (isDark.value ? 'white' : 'black'));

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  isDark.value = savedTheme === "dark";
  theme.global.name.value = savedTheme;
});
</script>

<style scoped>
.icon-container {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}


.orbit-enter-active,
.orbit-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
}

.orbit-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.5);
}

.orbit-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.5);
}

/* Optional: Add hover effects to the icon */
.theme-icon {
  transition: transform 0.3s ease;
}

.theme-icon:hover {
  transform: scale(1.1);
}

.contact-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 1em;
}

.contact-wrapper {
  background-color: rgb(var(--v-theme-surface));

}

.v-switch {
  margin-left: 2em;
}

body.no-animations .animated-element {
  animation: none !important;
  transition: none !important;
}


.theme-switch {
  padding: 8px;
  border-radius: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}



.theme-switch:hover {
  transform: scale(1.05);
}

.theme-switch:active {
  transform: scale(0.95);
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.v-switch__thumb) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.v-switch__track) {
  background-image: linear-gradient(
    to right,
    var(--v-theme-primary),
    var(--v-theme-secondary)
  ) !important;
  opacity: 0.8 !important;
}

:deep(.v-switch__loader) {
}
</style>
