<template>
  <div class="contact-container">
    <v-btn
      @click="$router.push('/')"
      class="icon-link home-icon"
      aria-label="Return to home page"
      icon
    >
      <v-icon large>mdi-home</v-icon>
    </v-btn>
    <v-btn
      href="mailto:richardsw2017@gmail.com"
      class="icon-link"
      aria-label="Email William Richards"
      icon
    >
      <v-icon large>mdi-email-outline</v-icon>
    </v-btn>
    <v-btn
      href="https://github.com/williamrichards2017"
      class="icon-link"
      aria-label="William Richards GitHub Profile"
      icon
    >
      <v-icon large>mdi-github</v-icon>
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
      <v-icon large>mdi-file-account</v-icon>
    </v-btn>

  <v-switch
    v-model="isDark"
    inset
    color="secondary"
    :prepend-icon="isDark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny'"
    @click.prevent="toggleTheme"
    class="theme-switch"
    hide-details
  >
    <template v-slot:label>
      <div class="switch-label">
        <transition name="fade" mode="out-in">
        <span :key="isDark ? 'dark' : 'light'">
            {{ isDark ? 'Dark theme' : 'Light theme' }}
          </span>        </transition>
      </div>
    </template>
  </v-switch>

  </div>
</template>

<script setup>


import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify/lib/framework.mjs'

const theme = useTheme()
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme.global.name.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light'
  isDark.value = savedTheme === 'dark'
  theme.global.name.value = savedTheme
})
</script>

<style>

.contact-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
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
  /* color: rgb(var(--v-theme-primary)) !important; */
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

.switch-label {
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-left: 8px;
  min-width: 85px;
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
