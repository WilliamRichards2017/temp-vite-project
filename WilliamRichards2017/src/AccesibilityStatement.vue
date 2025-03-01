<!-- AccessibilityStatement.vue -->
<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title>Accessibility Statement</v-toolbar-title>
      <v-btn icon="mdi-close" @click="$emit('close')" aria-label="Close accessibility statement"></v-btn>
    </v-toolbar>

    <v-card-text class="pa-4">
      <div class="text-h6 mb-4">Commitment to Digital Inclusion</div>

      <p class="mb-4">
        I believe the web should be accessible to everyone. As a developer passionate about inclusive design,
        I've implemented WCAG 2.2 AA standards throughout this portfolio. While perfection is elusive,
        I'm committed to continuous improvement through user feedback and emerging best practices.
      </p>

      <v-list class="mb-4">
        <v-list-item
          v-for="feature in implementedFeatures"
          :key="feature.title"
        >
          <template v-slot:prepend>
            <v-icon :icon="feature.icon" :color="feature.color"></v-icon>
          </template>
          <v-list-item-title>{{ feature.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ feature.description }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <div class="text-h6 mt-6 mb-4">Your Feedback Matters</div>
      <p class="mb-4">
        Encountered an accessibility barrier? Please help me improve:
      </p>

      <v-form @submit.prevent="submitFeedback">
        <v-textarea
          v-model="feedback"
          label="Describe the issue"
          rows="3"
          auto-grow
          required
          aria-label="Accessibility feedback description"
        ></v-textarea>

        <v-text-field
          v-model="email"
          label="Contact email (optional)"
          type="email"
          class="mb-4"
          aria-label="Contact email for follow-up"
        ></v-text-field>

        <v-btn type="submit" color="primary">Send Feedback</v-btn>
      </v-form>

      <v-divider class="my-6"></v-divider>

      <div class="text-caption text-medium-emphasis">
        <p>
          <strong>Technical Specifications:</strong><br>
          HTML5, ARIA, CSS3, Vue.js 3, Vuetify 3.6<br>
          Tested across modern browsers and screen reader (VoiceOver)
        </p>
        <p class="mt-2">
          Last updated: Friday, Feb 28, 2025
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({
  name: 'AccessibilityStatement'
});

const emit = defineEmits(['close']);

const implementedFeatures = ref([
  {
    title: 'Adaptable Interface',
    icon: 'mdi-accessibility',
    color: 'primary',
    description: 'Text scaling, contrast controls, and motion reduction'
  },
  {
    title: 'Semantic HTML',
    icon: 'mdi-code-tags',
    color: 'secondary',
    description: 'Proper heading structure and ARIA landmarks'
  },
  {
    title: 'Focus Management',
    icon: 'mdi-cursor-default-click',
    color: 'success',
    description: 'Visible focus indicators and logical tab order'
  },
  {
    title: 'Alt Text',
    icon: 'mdi-image-text',
    color: 'warning',
    description: 'Descriptive alternatives for meaningful images'
  }
]);


const feedback = ref('');
const email = ref('');

const submitFeedback = () => {
  // Implement your feedback submission logic
  console.log('Feedback submitted:', { feedback: feedback.value, email: email.value });
  emit('close');
};
</script>

<style scoped>
.v-list-item__title {
  font-weight: 600;
}

.v-list-item__subtitle {
  opacity: 0.8;
  font-size: 0.875rem;
}
</style>
