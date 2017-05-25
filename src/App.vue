<template>
  <div id="app" class="hero is-fullheight">

    <div class="hero-head">
      <navbar></navbar>
    </div>

    <div class="columns ">
      <div class="column is-2">
        <sidebar
          :menus="router"
        ></sidebar>
      </div>
      <section class="column is-offset-2 hero-body container">
          <router-view class="" ></router-view>
      </section>
    </div>
    <my-footer class="hero-foot"></my-footer>
  </div>
</template>

<script>

  import Router from './router/index.js'
  import Sidebar from './components/Sidebar.vue'
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'


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

  .app-main {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transform: translate3d(0, 0, 0);
    text-align : center;

    @include mobile() {
      margin-left: 0;
    }

  }

  .router-link-active {
    color: #f6f7f7 !important;
    font-weight: bold;
  }
  /*@import "../node_modules/bulma/bulma"*/
  /*@import '../node_modules/bulma/sass/utilities/initial-variables'*/


  /*#app*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif*/
  /*-webkit-font-smoothing: antialiased*/
  /*-moz-osx-font-smoothing: grayscale*/
  /*text-align : center*/

  /*padding : 0*/
  /*margin : 0*/

  /*.column*/
  /*padding : 0*/
  /*margin : 0*/

  /*.reset-margin*/
  /*margin : 0 !important*/

  /*.font-white*/
  /*color : white*/

  /*.font-gray*/
  /*color : rgb(170, 170, 170) !important*/

  /*.router-link-active*/
  /*color : #f6f7f7 !important*/
  /*font-weight: bold*/

  /*.hero-body*/
  /*margin-top: 2em*/


</style>
