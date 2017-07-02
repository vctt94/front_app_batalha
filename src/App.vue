<template>
  <div id="app" class="hero">

    <div class="hero-head">
      <navbar></navbar>
    </div>

    <div class="columns ">

      <div class="column is-2 aside sidebar is-hidden-touch">
          <sidebar
            :menus="router"
          ></sidebar>
      </div>

      <main class="column is-10">
        <div class="content">
            <router-view></router-view>
        </div>
      </main>
    </div>
    <my-footer class="hero-foot"></my-footer>
  </div>
</template>

<script>

  import Router from './router/index.js'
  import Sidebar from './templates/Sidebar.vue'
  import Navbar from './templates/Navbar.vue'
  import Footer from './templates/Footer.vue'


  export default {

    name: 'app',

    components: {
      'sidebar'   : Sidebar,
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

<style lang="scss">
  @import "../node_modules/bulma/bulma";
  @import "../node_modules/bulma/sass/utilities/initial-variables";


  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translate3d(0, 0, 0);
    text-align : center;

  }
  .columns{
    margin: 0;
    padding: 0;
  }

  .column{
    margin: 0;
    padding: 0;
  }

  .content{
    margin-top: 2em;
    padding-top: 3em;
    margin-right: 5em;
    max-width: 80%;

    min-height:100vh
  }
  .is-orange{
    background:orange;
    color: white;

  }
  .is-orange:hover{
    background:white;
    border: 1px solid orange;
    color: orange;

  }
  .is-bold{
    font-weight: bold;
  }

</style>
