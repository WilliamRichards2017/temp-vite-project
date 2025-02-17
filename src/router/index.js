import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import About from '../components/Home/about.vue';
import Contact from '../components/contact.vue';
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
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
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

export default router;