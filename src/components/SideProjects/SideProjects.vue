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
        :style="{ backgroundImage: 'url(' + project.preview + ')' }"
      >
        <div class="card-overlay"></div>
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
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.project-card {
  position: relative;
  display: block;
  text-decoration: none;
  color: white;
  border-radius: 8px;
  overflow: hidden;
  min-height: 300px;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translateY(-5px);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.project-card:hover .card-overlay {
  opacity: 0.6;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.card-content p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
  
  .project-card {
    min-height: 250px;
  }
}
</style>