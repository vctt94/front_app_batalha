<template>
<div class="home">
	<h1>home</h1>
  <a class="button" v-on:click="updateSideBarStatus">desligar navbar</a>
</div>
</template>

<script>
import Menu from '../components/Menu'
import { mapMutations, mapGetters } from 'vuex'


export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
  },
  mounted(){
  	console.log('home mounted')
    this.$store.commit({
      type: 'UPDATE_SIDEBAR_ACTIVE_STATUS',
      status: true
    })

  },
  methods : {
    updateSideBarStatus(){
        this.$store.commit({
        type: 'UPDATE_SIDEBAR_ACTIVE_STATUS',
        status: !this.sidebar.activeStatus
      })
    }


  }
}
</script>

<style scoped lang="sass">
.home
	width : 100%

</style>
