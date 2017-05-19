<!--
@Component:
    nav-bar-vue
@Description:
    Simple collapsible and toggleable top navbar to paginate through tabs.
    'Entrar' and 'Sair' buttons included according to name and avatar info
    passed by props
@CalledComponents:
@ApiRoutes:
@WebRoutes:
@Props:
    avatar: string of the user image url. If it is null or man.jpg, a default
        avatar icon is shown
    name:   string containing users name
    tabs:   JSON passed as string, containing tab name and link that goes to.
            Ex: tabs = '[{"name": "home", "url": "/home"},
                         {"name": "exit", "url": "/exit"}]'
@TODO:
    1 - Pass background color by props;
    2 - Pass style by props
    3 - Top or bottom option by props
    4 - Toggleable option by props
    5 - Pass logo by props
-->

<template>
<aside v-if="getSidebarActiveStatus" class="menu  teste aside hero is-fullheight is-hidden-mobile">
  <div>
    <div>
      <h1 class="title font-white">Batalha da Escada</h1>
    </div>
    <div class="logo">
      <img src="../assets/logo.png" alt="Bulma logo">
    </div>
    
    <hr>

    <div class="main">

      <ul class="menu-list">
        <li v-for="item in menus" v-on:click="toggleActive(item)">
          <router-link class="font-gray" :to="item.path" :exact="true">{{item.nameToShow}}</router-link>
          <ul v-if="item.children && item.isActive">
            <li v-for="child in item.children" v-on:click="toggleActive(child)">
              <router-link class="font-gray" :to="item.path + child.path">{{child.nameToShow}}</router-link>
            </li>
          </ul>
        </li>    
      </ul>
    </div> 

  </div>
</aside>
</template>


<script>

import { mapMutations, mapGetters } from 'vuex'

export default {
  props : [
      'menus',
  ],

  data(){
      return {
      }
  },

  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    getSidebarActiveStatus(){
      return this.sidebar.activeStatus
    }
  },


  mounted() {
    console.log('menu sidebar mounted')
    this.active = this.getSidebarActiveStatus
  },

  methods : {
    
    ...mapMutations({
      updateSideBarActiveStatus : 'UPDATE_SIDEBAR_ACTIVE_STATUS'
    }),

    toggleActive(item){
      for(let item of this.menus){
        item.isActive = false;
      }
      item.isActive = true
    },
    
  }
}
</script>

<style scoped lang="sass">

.teste
  background : rgb(53,64,82)
  margin  : 0
  padding : 0
  padding-top : 2em
  padding-bottom : 5em

.menu-list a:hover 
  color : black !important
  font-weight : bold


</style>

