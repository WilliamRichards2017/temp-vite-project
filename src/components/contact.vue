<template>
  <div class="contact-container">
    <div class="contact-content">
      <a @click="$router.push('/')" class="icon-link home-icon" aria-label="Return to home page">
        <svg class="icon" viewBox="0 0 24 24" role="img">
          <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </a>

      <div class="right-section">
        <div class="icon-grid">
                                <a href="mailto:richardsw2017@gmail.com" class="icon-link" aria-label="Email William Richards">
            <svg class="icon" viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
            </svg>
            </a>
            <a href="https://github.com/williamrichards2017" class="icon-link" aria-label="William Richards GitHub Profile">
            <svg class="icon" viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.07.63-1.31-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
            </a>
            <a title="resume" download="William-Richards-resume.pdf" target="_blank" href="https://github.com/WilliamRichards2017/WilliamRichards2017.github.io/raw/master/public/resume.pdf" class="icon-link" aria-label="Download William Richards' Resume">
            <svg class="icon" viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
            </svg>
            </a>
        </div>
        
        <div class="toggle-container">
          <label for="toggle-animations" class="toggle-label">
            <span class="label-text">Disable Animations</span>
            <div class="toggle-switch">
              <input type="checkbox" id="toggle-animations" v-model="disableAnimations" @change="toggleAnimations">
              <span class="slider"></span>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'Contact',
  data() {
    return {
      // Default to enabled animations (false) if no cookie exists
      disableAnimations: Cookies.get('disableAnimations') === 'true'
    }
  },
  methods: {
    toggleAnimations() {
      Cookies.set('disableAnimations', this.disableAnimations, { expires: 365 });
      if (this.disableAnimations) {
        document.body.classList.add('no-animations');
      } else {
        document.body.classList.remove('no-animations');
      }
    }
  },
  mounted() {
    // Only disable if cookie exists and is true
    if (this.disableAnimations) {
      document.body.classList.add('no-animations');
    }
  }
}
</script>

<style>

body.no-animations .animated-element {
  animation: none !important;
  transition: none !important;
}

.contact-container {
  height: 72px;
  z-index: 999;
  background: #ffffff;
  position: sticky;
  top: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); /* Enhanced shadow */
  backdrop-filter: blur(8px); /* Optional subtle blur effect */
}


.contact-container {
  height: 72px;
  z-index: 999;
  background: #ffffff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
}

.contact-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.icon-grid {
  display: flex;
  gap: 1.5rem;
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

.toggle-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.toggle-label:hover {
  opacity: 0.8;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e0e0e0;
  transition: .3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

input:checked + .slider {
  background-color: #2a70c2;
}

input:checked + .slider:before {
  transform: translateX(18px);
}

@media (max-width: 768px) {
  .contact-content {
    padding: 0 1rem;
  }
  
  .icon {
    width: 28px;
    height: 28px;
  }
  
  .toggle-label {
    font-size: 0.8rem;
  }
}
</style>






