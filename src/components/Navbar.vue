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

<template xmlns:v-model="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
<aside class="menu">
    
    <a class="nav-item">
      <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
    </a>

  <p class="menu-label">
    admin
  </p>

  <ul class="menu-list">
    <li  v-for="item in menus" v-on:click="toogleActive(item)">
      <router-link  :to="item.path" :class="[item.isActive ? 'is-active' : '' ]">{{item.nameToShow}}</router-link>
      <ul v-if="item.children && item.isActive">
        <li v-for="child in item.children" v-on:click="toogleActive(child)">
          <router-link  :to="item.path + child.path">{{child.nameToShow}}</router-link>
        </li>
      </ul>
    </li>    
  </ul>
</aside>
</template>

<script>
    export default {
        props : [
            'menus',
        ],

        data(){
            return {
                user:false,
                localAvatar: "",
                dropMenu: false,
                parsedTabs: ""
            }
        },

        mounted() {

        },
        methods : {
          toogleActive(tab){
            for(let item of this.menus){
              item.isActive = false;
            }
            tab.isActive = true;
          }
        }
    }
</script>

<style scoped lang="sass">


</style>
