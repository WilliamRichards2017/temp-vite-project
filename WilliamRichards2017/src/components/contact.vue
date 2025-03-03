<template>
  <div class="contact-container">
    <v-btn
      @click="$router.push('/')"
      class="icon-link home-icon"
      aria-label="Return to home page"
      icon
    >
      <Icon :path="mdiHome" :color="iconColor" size="24" />
    </v-btn>

    <div class="right-group">
      <v-btn
        href="mailto:richardsw2017@gmail.com"
        class="icon-link"
        aria-label="Email William Richards"
        icon
      >
        <Icon :path="mdiEmailOutline" :color="iconColor" size="24" />
      </v-btn>
      <v-btn
        href="https://github.com/williamrichards2017"
        class="icon-link"
        aria-label="William Richards GitHub Profile"
        icon
      >
        <Icon :path="mdiGithub" :color="iconColor" size="24" />
      </v-btn>
      <v-btn
        title="resume"
        download="William-Richards-resume.pdf"
        target="_blank"
        href="https://github.com/WilliamRichards2017/WilliamRichards2017.github.io/raw/master/public/resume.pdf"
        class="icon-link"
        aria-label="Download William Richards' Resume"
        icon
      >
        <Icon :path="mdiFileAccount" :color="iconColor" size="24" />
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
  mdiEmailOutline,
  mdiGithub,
  mdiFileAccount,
  mdiCog,
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
  padding: 1rem;
}

.v-switch {
  margin-left: 2em;
}

body.no-animations .animated-element {
  animation: none !important;
  transition: none !important;
}

.icon-link {
  color: rgba(var(--v-theme-text-secondary), var(--v-medium-emphasis-opacity));
  transition: transform 0.2s ease, color 0.2s ease;
  padding: 8px;
}

.icon-link:hover {
  color: rgb(var(--v-theme-primary)) !important;
  filter: brightness(1.1);
  transform: translateY(-2px);
}

.toggle-container {
  margin-bottom: 0 !important;
}

.icon {
  width: 32px;
  height: 32px;
}

@media (max-width: 768px) {
  .contact-content {
    padding: 0 1rem;
  }

  .icon {
    width: 28px;
    height: 28px;
  }
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

.right-group {
  display: flex;
  align-items: center;
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
