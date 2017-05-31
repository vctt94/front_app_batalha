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

  <aside v-if="getSidebarActiveStatus" class="app-sidebar aside hero is-fullheight is-hidden-mobile">
  <div>
    <div class="logo">
      <img src="../assets/006.svg" alt="Bulma logo">
    </div>


    <hr>

    <div class="main">

      <ul class="menu-list">
        <li v-for="item in menus" v-on:click="toggleActive(item)">
          <router-link class="font-gray" :to="item.path" :exact="true">{{item.meta.label}}</router-link>
          <!-- <ul v-if="item.children && item.isActive">
            <li v-for="child in item.children" v-on:click="toggleActive(child)">
              <router-link class="font-gray" :to="item.path + '/' +child.path">{{child.meta.label}}</router-link>
            </li>
          </ul> -->
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

<style scoped lang="scss">

.app-sidebar {
  position: fixed;
  top: 50px;
  width: 15em;
  background: black;
  box-shadow: 5px 43px 22px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  height: 100%;


  .icon {
    vertical-align: baseline;
    &.is-angle {
      position: absolute;
      right: 10px;
      transition: transform .377s ease;
    }
  }

  .menu-label {
    padding-left: 5px;
  }

  .menu-list {
    li a {
      &[aria-expanded="true"] {
        .is-angle {
          transform: rotate(180deg);
        }
      }
    }

    li a + ul {
      margin: 0 10px 0 15px;
    }
  }
}
.menu-list a:hover {
  color: black !important;
  font-weight: bold
}

.logo {
  background-color: white;
}
.router-link-active {
  color: #f6f7f7 !important;
  font-weight: bold;
}

</style>
