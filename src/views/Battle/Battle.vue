<template>
  <div >

    <content-navbar />
    <main id="tournament">
        <bracket
          v-if="!loading"
          :rounds-number="firstStage.length"
          :first-rounds = "firstStage"></bracket>
    </main>
  </div>
</template>

<script>

  import Bracket from '../Components/Bracket.vue'
  import ContentNavbar from '../../components/ContentNavbar.vue'

  export default {

    components : {Bracket,ContentNavbar},

    data () {
      return {
        firstStage   : [],
        loading      : true,
        total_rounds : 0,

      }
    },

    mounted(){
//
      let scope = this;
      this.axios.get('/api/bracket/make-bracket').then(response => {
        scope.firstStage = response.data.first_stage
        scope.loading = false
        // this.total_rounds =response.data.data.first_stage.length
      })

    },

    methods : {

    }
  }
</script>

<style scoped lang="scss">



  /*
   *  General Styles
  */


</style>
