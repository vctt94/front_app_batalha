<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
  import Menu from '../../components/Menu'
  import { mapMutations, mapGetters } from 'vuex'


  export default {
    name: 'users',

    data () {
      return {
      }
    },


    methods : {



    }
  }
</script>

<style scoped lang="sass">
  .users
    width : 100%
    margin-top: 10em
    border-width: 10em
</style>
