<template>
  <section class="hero is-bold app-navbar animated slideInDown">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item is-hidden-tablet" @click="toggleSidebar(!sidebar.opened)">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
        </div>
        <div class="nav-center">
          <a class="nav-item hero-brand" href="/">
            <!-- <img src="../assets/003.svg" > -->
              <div class="is-hidden-mobile">
                <span>Batalha da </span> <strong class="admin">Escada</strong>
              </div>
          </a>
        </div>
        <div class="nav-right is-flex">

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
  	    show : false
  	}
  },
  methods :{

  }
}
</script>

<style lang="scss" scoped>

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
