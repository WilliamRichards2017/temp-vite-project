<template>
  <div id="app">
    <div id="content-wrap">
      <div id="wrapper">
    </div>
    <router-view></router-view> 
    </div>
  </div>
</template>

<script>

import about from './components/Home/about.vue'



  export default {
    name: 'App',
    components: {
      about,
      
    }
  }
</script>

<style>

    a{
      cursor: pointer;
    }
  #wrapper {
    margin:0 auto;
    position: relative;
    width:100%;
    justify-content: center;
  }


p {
  font-size: 1.2em;
}

  /* mouse over link */
  a:hover {
    color:#9068be !important;
    text-decoration:none;
    text-shadow: 0px 0px 0px transparent !important;

  }

  /* selected link */
  a:active {
    color: darkgrey;
  }

  h1 {
    color:#9068be;
    margin:0 0 10px;
    padding-top:.1em;
    padding-bottom:.2em;
    font:normal 24px Georgia, serif;
    border-bottom:1px solid #efece7;
  }



  h3 {
    margin:10px 0;
    padding-bottom:5px;
    font:bold 14px Arial, Helvetica, sans-serif;
    border-bottom:1px solid #efece7;
  }

  ul {
    padding:0;
    margin:0 0 0 17px;
  }



</style>
