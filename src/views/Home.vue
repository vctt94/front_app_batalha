<template>
  <div >
  </div>
</template>

<script>
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

<style scoped lang="scss">

</style>
