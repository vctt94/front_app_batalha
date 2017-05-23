<template>
  <div class="container">
    <h1 class="title">Cadastrar Grupo</h1>

    <div class="field">
      <label class="label">Nome: </label>
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Nome do grupo:" v-model="name">
        <span class="icon is-small is-left">
          <i class="fa fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fa fa-check"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">Escolher Integrantes: </label>
      <multiselect
        v-model="peopleOnGroup"
        :options="people"
        :multiple="true"
        :hideSelected = "true"
        track-by="_id"
        :custom-label="customLabel"
      >
      </multiselect>
    </div>

    <div class="field is-grouped">
      <p class="control">
        <button class="button is-primary" v-on:click="insertBand"> Cadastrar Banda </button>
      </p>
    </div>

  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import { mapMutations, mapGetters } from 'vuex'


  export default {
    name: 'BandCreate',
    components: { Multiselect },

    data () {
      return {
        name          : null,
        people        : [],
        peopleOnGroup : [],

      }
    },
    mounted(){
      let scope = this
      this.$http.get('/api/user/get-all-users').then(response=>{
        scope.people = response.body
      })
    },

    methods : {
      customLabel (option) {
        return `${option.name}`
      },


      insertBand(){

        let band = {}
        band.name = this.name
        band.members = this.peopleOnGroup
        let jsonBand = JSON.stringify(band)
        console.log(jsonBand)

        this.$http.post('/api/group/create-group',jsonBand,{
          headers: {
            Accept: "application/json"
          }
        }).then(response=>{
            console.log(response)
        })

      }


    }
  }
</script>

<style scoped lang="sass">

</style>
