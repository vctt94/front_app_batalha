
<template>

  <aside v-if="getSidebarActiveStatus" class="app-sidebar aside hero is-fullheight  animated slideInLeft">
  <div>
    <div class="logo">
      <img src="../assets/006.svg" alt="Bulma logo">
    </div>


    <hr>

    <div class="main">

      <ul class="menu-list">
        <li v-for="item in menus" >
            <div v-if="item.meta.sidebar">
                <router-link class="font-gray" :to="item.path" :exact="true">{{item.meta.label}}</router-link>
            </div>
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
import { TOGGLE_SIDEBAR} from '../store/mutations'

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
  },

  methods : {

    ...mapMutations({
      updateSideBarActiveStatus : TOGGLE_SIDEBAR
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
