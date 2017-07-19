<template>
  <div class="content">
    <div class="nav-head is-pulled-right">
      <a class="nav-item is-tab" :class="state == 1 ? 'is-active' : ''" @click = "state = 1">
				<span class="icon-btn">
					<i class="fa fa-plus">
					</i>
				</span>
      </a>
      <a class="nav-item is-tab" :class="state == 2 ? 'is-active' : ''" @click = "state = 2">
				<span class="icon-btn">
				  <i class="fa fa-list-ul "></i>
				</span>
      </a>
    </div>

    <div v-show="state==1">
      <img src="../../assets/003.svg" alt="Bulma logo" style="width: 50%">
      <p>Comece uma nova batalha agora! Clique no microfone</p>
      <a @click="createBattle" style="color:grey">
        <i class="fa fa-microphone fa-5x" :class="loading ? 'animated fadeOutLeft' : ''" style="font-size: 200px;" aria-hidden="true"></i>
      </a>
    </div>

    <div v-show="state==2">
      <battle-table></battle-table>

    </div>
  </div>
</template>

<script>

  import Navbar from '../../templates/ContentNavbar'
  import BattleTable from './BattleTable'


  export default {

    components: {
      Navbar,
      BattleTable
    },
    data() {
      return {
        loading: false,
        state: 1
      }
    },

    methods: {

      createBattle() {
        this.loading = true

        this.$router.push('Batalha')
      },

    }

  }
</script>

<style type="scss">

  a :hover {
    color: black;
  }
  .nav-head{
    display: flex;
  }

</style>
