<template>
  <div >
    <h1>2013 NCAA Tournament - Midwest Bracket</h1>
    <main id="tournament">
        <bracket
        :rounds-number="32"></bracket>
    </main>
  </div>
</template>

<script>

  import Bracket from '../Components/Bracket.vue'

  export default {

    components : {Bracket},

    data () {
      return {
        firstStage: [],
        total_rounds: 0,

      }
    },

    mounted(){
//
//      this.axios.get('/api/bracket/make-bracket').then(response => {
//        this.firstStage = response.data.data.first_stage
//        console.log(this.firstStage)
//        // this.total_rounds =response.data.data.first_stage.length
//      })

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
