/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

import ProjectDetail from '../components/SideProjects/projectDetail.vue';
import Home from '../components/Home/home.vue';
// Define your routes
const routes = [


  {
    path: '/',
    name: 'Home',
    component: Home,
  },



  {
    path: '/project/:id', // Dynamic route parameter
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true // Automatically pass route params as props
  },

  // Add a catch-all route for 404 pages
  {
    path: '/:pathMatch(.*)*', // Vue Router 4 syntax for catch-all
    redirect: '/', // Redirect to home or a 404 component
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes, // Short for `routes: routes`
});
// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router


