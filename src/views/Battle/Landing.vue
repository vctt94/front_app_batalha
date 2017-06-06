<template>
  <div>
      <img src="../../assets/003.svg" alt="Bulma logo" style="width: 50%">
      <h2>Nº 42</h2>
      <br /><br /><br />

      <div v-if="loading" class="fa fa-spinner fa-pulse fa-5x fa-fw" style="font-size: 130px;">
      </div>
      <div v-else>
          <a @click="createBattle"style="color:grey"><i class="fa fa-microphone fa-5x" style="font-size: 200px;" aria-hidden="true"></i></a>
      </div>
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
