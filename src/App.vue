<template>
  <div>
    <div id="app" class="columns">
      
      <div class="column is-one-quarter aside hero is-fullheight is-hidden-mobile">
        <navbar :menus="router"></navbar>
      </div>

      <div class="column">
        <router-view ></router-view>
      </div>

    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>

import Router from './router/index.js'

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'


export default {

  name: 'app',
  components: {
    'navbar' : Navbar,
    'my-footer' : Footer
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
  padding : 0
  margin : 0

.column
  padding : 0
  margin : 0




</style>
