<template>
  <div class="side-projects">
    <h2>Projects</h2>
    <div class="project-grid">
      <router-link 
        v-for="project in projects"
        :key="project.id"
        :to="{
          name: 'ProjectDetail',
          params: { id: project.id }
        }"
        class="project-card"
      >
        <img :src="project.preview" alt="Preview">
        <div class="card-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import projects from './../../config/projects'

export default {
  data() {
    return {
      projects
    }
  }
}
</script>

<style>
/* Ensure router-link renders as block */
.project-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

/* Fix click target issues */
.card-content {
  pointer-events: none;
}
</style>