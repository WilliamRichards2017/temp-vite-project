<template>
  <div class="side-projects">
    <h1 class="section-title">Side Projects</h1>
    <div class="project-grid">
      <router-link 
        v-for="project in projects"
        :key="project.id"
        :to="{
          name: 'ProjectDetail',
          params: { id: project.id }
        }"
        :class="['project-card', 'animated-element', { 'featured-project': project.featured }]"
        :style="{ backgroundImage: 'url(' + project.preview + ')' }"
      >
        <div  class="card-overlay"></div>
        <div class="card-content">
          <div v-if="project.featured" class="featured-badge">Featured Project</div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div v-if="project.featured" class="featured-highlights">
            <div v-for="highlight in project.highlights" :key="highlight" class="highlight-item">{{ highlight }}</div>
          </div>
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
  border: 1px solid black;
}

.project-card:hover {
  transform: translateY(-5px);
  color: white !important;
  mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/350% 100%;
  animation: shimmer 2.5s infinite;
}


.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(20, 37, 49, 0.9), rgba(12, 22, 30, 0.7)) !important;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}


@keyframes shimmer {
  100% {
    mask-position: left
  }
}

.project-card:hover .card-overlay:hover {
  opacity: 0.5;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  height: calc(100% - 2.5rem);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
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
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

@media (max-width: 768px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
  
  .project-card {
    min-height: 250px;
  }
}

.featured-project {
  grid-column: 1 / -1 !important;
  min-height: 400px;
  animation: subtle-pulse 6s infinite;
    border: 2px solid rgba(255, 212, 82) !important;

}




.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 212, 82, 0.9);
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9rem;
  text-shadow: none;
}

.featured-highlights {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.highlight-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

@keyframes subtle-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.005); }
}

@media (min-width: 1024px) {
  .featured-project {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .featured-project {
    min-height: 300px;
  }
  .featured-highlights {
    gap: 0.5rem;
  }
  .highlight-item {
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
  }
}
</style>