<template>

  <div class="modal" :class="[ show ? 'is-active' : '' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Cadastrar Grupo</p>
        <button class="delete" v-on:click="$emit('cancel')"></button>
      </header>
      <section class="modal-card-body">

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
          <div>
            <multiselect
              v-model="peopleOnGroup"
              :options="people"
              :multiple="true"
              :hideSelected = "true"
              track-by="_id"
              :label = "name"
              :custom-label="customLabel"
            >
            </multiselect>
          </div>
        </div>


      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" v-on:click="insertBand">Cadastrar Banda</a>
        <a class="button"  v-on:click="$emit('cancel')">{{cancelButton}}</a>
      </footer>
    </div>
  </div>

</template>

<script>
  import Multiselect from 'vue-multiselect'
  import { mapMutations, mapGetters } from 'vuex'


  export default {
    name: 'BandCreate',
    components: { Multiselect },

    props : {
      show: {
        type: Boolean,
        default: true
      },
      title:{
        type: String,
      },
      content:{
        type: String,
      },
      submitButton:{
        type: String,
        default: "Enviar"
      },
      cancelButton:{
        type: String,
        default: "Cancelar"
      },
      groups:{
          type: Object
      }
    },

    data () {
      return {
        name          : null,
        people        : [],
        peopleOnGroup : [],

      }
    },
    mounted(){
        console.log(this.groups)
      let scope = this
      this.$http.get('/api/user/get-all-users').then(response=>{
        scope.people = response.body
      })
    },

    methods : {
      customLabel (option) {
        return `${option.name}`
      },

      submitModal(){
        this.$emit('submit')
        this.$emit('close')
      },

      insertBand(){

        let band = {}
        band.name = this.name
        band.members = this.peopleOnGroup
        let jsonBand = JSON.stringify(band)

        this.$http.post('/api/group/create-group',jsonBand,{
          headers: {
            Accept: "application/json"
          }
        }).then(response=>{
            this.groups[response.body.group._id] = response.body.group
            alert('cadastrado com sucesso')
        })

      }


    }
  }
</script>

<style scoped lang="css">

</style>
