<template>
  <div id="app">
    <navbar :menus="router" class="navbar"></navbar>
    <router-view ></router-view>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
import Router from './router/index.js'

export default {

  name: 'app',
  components: {
    'navbar': Navbar,
  },
  data (){
    return{
      router : null,

    }
  },
  mounted(){
    this.router = Router.options.routes

  }
}
</script>

<style lang="sass">
@import "../node_modules/bulma/bulma";
@import '../node_modules/bulma/sass/utilities/initial-variables'

#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

.navbar
  width : 20em;


</style>
