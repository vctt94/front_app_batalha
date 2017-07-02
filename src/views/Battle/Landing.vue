<template>
  <div>
    <div>
      <img src="../../assets/003.svg" alt="Bulma logo" style="width: 50%">
    </div>
    <div>
      <p>Comece uma nova batalha agora! Clique no microfone</p>
      <a @click="createBattle" style="color:grey">
        <i class="fa fa-microphone fa-5x" :class="loading ? 'animated fadeOutLeft' : ''" style="font-size: 200px;" aria-hidden="true"></i>
      </a>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>


  export default {

    data() {
      return {
        loading: false
      }
    },

    methods: {

      createBattle() {
        this.loading = true

        this.$router.push('Batalha')
      }
    }

  }
</script>

<style type="scss">

  a :hover {
    color: black;
  }

</style>
