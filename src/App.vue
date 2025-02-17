<template>
  <div id="app">
    <div id="content-wrap">

      <contact class="sticky-header"/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import About from './components/Home/about.vue'
import Contact from './components/contact.vue'

export default {
  name: 'App',
  components: {
    About,
    Contact
  },

}
</script>

<style>

body {
  margin: 0 
}

a {
  cursor: pointer;
}

#wrapper {
  margin: 0 auto;
  position: relative;
  width: 100%;
  justify-content: center;
}

p {
  font-size: 1.2em;
}

/* mouse over link */
a:hover {
  color: #9068be !important;
  text-decoration: none;
  text-shadow: 0px 0px 0px transparent !important;
}

/* selected link */
a:active {
  color: darkgrey;
}

h1 {
  color: #9068be;
  margin: 0 0 10px;
  padding-top: .1em;
  padding-bottom: .2em;
  font: normal 24px Georgia, serif;
  border-bottom: 1px solid #efece7;
}

h3 {
  margin: 10px 0;
  padding-bottom: 5px;
  font: bold 14px Arial, Helvetica, sans-serif;
  border-bottom: 1px solid #efece7;
}

ul {
  padding: 0;
  margin: 0 0 0 17px;
}

.sticky-header {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white; /* Adjust as needed */
}

</style>
