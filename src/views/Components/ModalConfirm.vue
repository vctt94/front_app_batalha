<template>
  <section class="modal-card-body">
    <p v-show="text">{{text}}</p>
  </section>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {

    name: 'app',

    computed: {
      ...mapGetters(['modal']),
      text(){
        return this.modal.data
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
