<template>
  <div id="dataViz">
    <!-- Navigation -->
    <div v-if="activeHomework" id="hwListContainer" class="inline">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a @click="activeHomework = null">Data Visualizations</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ activeHomeworkTitle }}</li>
        </ol>
      </nav>
    </div>

    <!-- Content -->
    <div v-if="!activeHomework" class="homework-list">
      <div v-for="hw in homeworks" 
           :key="hw.id" 
           class="homework-preview"
           @click="activeHomework = hw.id">
        <div class="preview-content">
          <h3>{{ hw.title }}</h3>
          <p class="description">{{ hw.description }}</p>
        </div>
        <img :src="hw.previewImage" :alt="hw.title">
      </div>
    </div>

    <!-- Dynamic component -->
    <component :is="activeComponent" v-if="activeHomework"/>
  </div>
</template>

<script>
import hw6 from './hw6/hw6.vue'
import hw5 from './hw5/hw5.vue'
import hw4 from "./hw4/hw4.vue";

export default {
  components: { hw4, hw5, hw6 },
  
  data() {
    return {
      activeHomework: null,
      homeworks: [
        {
          id: 'hw6',
          title: 'Political Word Choice',
          component: 'hw6',
          description: 'Interactive beeswarm plot and bar chart to show...',
          previewImage: require('../../assets/beeswarm.png')
        },
        {
          id: 'hw5',
          title: 'World Cup Results',
          component: 'hw5',
          description: 'Interactive stats table and bracket tournament...',
          previewImage: require('../../assets/worldcup.png')
        },
        {
          id: 'hw4',
          title: 'Global Data Correlations',
          component: 'hw4',
          description: 'Interactive world map and scatter-plot...',
          previewImage: require('../../assets/globaldata.png')
        }
      ]
    }
  },

  computed: {
    activeComponent() {
      const hw = this.homeworks.find(h => h.id === this.activeHomework)
      return hw ? hw.component : null
    },
    activeHomeworkTitle() {
      const hw = this.homeworks.find(h => h.id === this.activeHomework)
      return hw ? hw.title : ''
    }
  }
}
</script>

<style scoped>
.homework-preview {
  display: flex;
  padding: 25px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.homework-preview:hover {
  background-color: #f9f9f9;
}

.preview-content {
  width: 50%;
  padding-right: 30px;
}


.homework-preview img {
  width: 50%;
  max-height: 200px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.homework-preview:hover img {
  transform: scale(1.02);
}

.active a {
  color: #ac7ce3;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  list-style: none;
  border-bottom: 2px solid #ddd;
}

.breadcrumb-item + .breadcrumb-item::before {
  display: inline-block;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #6c757d;
  content: ">";
}

.breadcrumb-item > a {
  color: #4a90e2;
  text-decoration: none;
  background-color: transparent;
}

.breadcrumb-item > a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.breadcrumb-item.active {
  color: #6c757d;
}
</style>