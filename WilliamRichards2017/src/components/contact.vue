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

  </div>
</template>

<script>

export default {
  name: "Contact",

};
</script>

<style>
body.no-animations .animated-element {
  animation: none !important;
  transition: none !important;
}

.icon-link {
  color: #666;
  transition: transform 0.2s ease, color 0.2s ease;
  padding: 8px;
}

.icon-link:hover {
  color: #2a70c2 !important;
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
</style>
