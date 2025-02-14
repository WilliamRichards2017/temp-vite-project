<template>
  <div class="project-detail">
    <button @click="$router.push('/')" class="back-button">
      ← Back to Home
    </button>
    
    <component 
      :is="loadedComponent" 
      v-if="loadedComponent"
      class="project-component"
    />
  </div>
</template>

<script>
import projects from './../../config/projects'

export default {
  props: ['id'],
  
  data() {
    return {
      loadedComponent: null
    }
  },

  computed: {
    project() {
      return projects.find(p => p.id === this.id)
    }
  },

  watch: {
    id: {
      immediate: true,
      handler() {
        this.loadProjectComponent()
      }
    }
  },

methods: {
  async loadProjectComponent() {
    if (!this.project) {
      this.$router.replace('/not-found')
      return
    }

    try {
      // Handle Webpack's require syntax
      const componentLoader = this.project.component
      this.loadedComponent = (await componentLoader()).default
    } catch (error) {
      console.error('Failed to load component:', error)
      this.$router.replace('/not-found')
    }
  }
}
}
</script>