<template>
  <div>
    <modal></modal>
    <div id="app" class="hero">
      <div class="hero-head">
        <navbar></navbar>
      </div>

      <main>
        <sidebar
          class="column"
          :menus="router"
        ></sidebar>
        <div  class="column"
              :class="activeSideBar ? 'offset-sidebar' : ''">
          <router-view

          >
          </router-view>
        </div>
      </main>

      <my-footer class="hero-foot"></my-footer>
    </div>

  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import Router from './router/index.js'
  import Modal from './views/Components/ModalCard.vue'
  import Sidebar from './templates/Sidebar.vue'
  import Navbar from './templates/Navbar.vue'
  import Footer from './templates/Footer.vue'

  export default {

    name: 'app',

    components: {
      'sidebar'   : Sidebar,
      'navbar'    : Navbar,
      'my-footer' : Footer,
      Modal
    },

    computed: {
      ...mapGetters(['sidebar']),
      activeSideBar(){
        return this.sidebar.activeStatus
      }
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

  .offset-sidebar{
    margin-left: 15em;
  }
  .content{
    margin-top: 2em;
    padding-top: 3em;
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
  .margin-right-1{
    margin-right: 1em;
  }

</style>
