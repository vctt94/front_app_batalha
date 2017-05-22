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
  <section class="hero is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <div class="hero-head">

    <nav class="nav" >
        <div class="container">
          <div class="nav-left">
            <div class="nav-item" >
              <h1 class="title">{{title}}</h1>
            </div>
          </div>


          <a href="#" class="nav-item is-hidden-mobile">
              Logout
          </a>
        </div>
      </nav>

    </div>
  </section>
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
  	}
  },
  methods :{

  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

}

.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

.container {
  margin: auto 10px;
}

.nav-right {
  align-items: stretch;
  align-items: stretch;
  flex: 1;
  justify-content: flex-end;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
}
}

.hero-brand {
.vue {
  margin-left: 10px;
  color: #36AC70;
}
.admin {
  color: #28374B;
}
}
</style>


