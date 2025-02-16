export default [
  {
    id: 'hw6',
    title: 'Political Word Choice',
    component: () => import('./../components/dataViz/hw6/hw6.vue'),
    description: 'Interactive beeswarm plot and bar chart visualizing political word choices.',
    preview: new URL('./../assets/beeswarm.png', import.meta.url).href,
  },
  {
    id: 'hw4',
    title: 'Gap Minder inspired world health data',
    component: () => import('./../components/dataViz/hw4/hw4.vue'),
    description: 'Interactive visualization of world health data with a world map and scatter plot, featuring sliders for year selection.',
    preview: new URL('./../assets/globaldata.png', import.meta.url).href,
  },
  {
    id: 'hw5',
    title: 'World Cup 2018 Score Table',
    component: () => import('./../components/dataViz/hw5/hw5.vue'),
    description: 'Interactive score table and knockout round bracket for the World Cup 2018, featuring sortable tables and expandable brackets.',
    preview: new URL('./../assets/worldcup.png', import.meta.url).href,
  },

  {
    id: 'minesweeper',
    title: 'Minesweeper Game',
    component: () => import('./../components/Games/minesweeper.vue'),
    description: 'Classic Minesweeper game with selectable difficulty levels and interactive gameplay.',
    preview: new URL('./../assets/minesweeper.png', import.meta.url).href,
  }
]