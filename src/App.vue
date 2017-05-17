<template>
  <div class="hero is-fullheight">
    <div id="app" class="columns is-gapless">
      
      <div class="column is-2 aside is-fullheight is-hidden-mobile">
        <my-menu :menus="router"></my-menu>
      </div>

      <div class="column hero-head is-10">
        <navbar title  = "Home"
                :menus = "router"
        >
        </navbar>

      </div>

      <div class="column is-10">
        <router-view class="hero-body "></router-view>
      </div>

    </div>
    <my-footer class="hero-foot"></my-footer>
  </div>
</template>

<script>

import Router from './router/index.js'
import Menu from './components/Menu.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'


export default {

  name: 'app',
  components: {
    'my-menu'   : Menu,
    'navbar'    : Navbar,
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
  text-align : center;
  color: #2c3e50;
  padding : 0
  margin : 0

.column
  padding : 0
  margin : 0

.font-white
  color : white





</style>
