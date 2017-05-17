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
<nav class="nav has-shadow" id="top">
        <div class="container">
          <div class="nav-left">
            <div class="nav-item" >
              <h1 class="title">{{title}}</h1>
            </div>
          </div>
          <span class="nav-toggle" :class="[isActive ? 'is-active' : '' ]" v-on:click="isActive = !isActive">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div class="nav-right nav-menu is-hidden-tablet" :class="[isActive ? 'is-active' : '' ]">
			  <div class="main">
			    <ul class="menu-list">
			      <li v-for="item in menus" v-on:click="toggleActive(item)">
			        <router-link class="font-white"  :to="item.path" :class="[item.isActive ? 'is-active' : '' ]">{{item.nameToShow}}</router-link>
			        <ul v-if="item.children && item.isActive">
			          <li v-for="child in item.children" v-on:click="toggleActive(child)">
			            <router-link class="font-white" :to="item.path + child.path">{{child.nameToShow}}</router-link>
			          </li>
			        </ul>
			      </li>    
			    </ul>
			  </div> 
              <a href="#" class="nav-item">
	            Logout
	          </a>
          </div>

          <a href="#" class="nav-item is-hidden-mobile">
              Logout
          </a>
        </div>
      </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props : [
  	'title',
  	'menus'
  ],
  data(){
  	return{
  		isActive : false
  	}
  },
  methods :{
  	toggleActive(item){
            for(let item of this.menus){
              item.isActive = false;
            }
            item.isActive = true
          }
  }
}
</script>

<style scoped>

</style>


