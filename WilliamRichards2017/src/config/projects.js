export default [

  {
    id: 'tetris-ai',
    title: 'AI-Powered Tetris Evolution',
    component: () => import('./../components/Games/tetris.vue'),
    featured: true,
    description: 'Modern Tetris with evolutionary AI that learns through generations. Includes live training mode to observe population optimization in real-time.',
    preview: new URL('./../assets/tetris.webp', import.meta.url).href,
    highlights: ['AWS', 'Cloudfront', 'Lambda', 'DynamoDB', 'Svelte'],
  },

]
