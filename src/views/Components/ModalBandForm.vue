<template>

  <div class="modal" :class="[ show ? 'is-active' : '' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Cadastrar Grupo</p>
        <button class="delete" v-on:click="$emit('close')"></button>
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
            <multiselect v-if="people"
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
        <a class="button is-success" v-on:click="submitForm" v-if="!edit">Cadastrar Banda</a>
        <a class="button is-success" v-on:click="submitForm" v-else>Editar Banda</a>
        <a class="button"  v-on:click="$emit('close')">{{cancelButton}}</a>
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
      },
      group: {
        type: Object
      },
      edit : {
        type: Boolean
      }
    },

    data () {
      return {
        name          : null,
        people        : [],
        peopleOnGroup : [],
      }
    },

    watch : {
      group(){
        if(this.group) {
          this.name = this.group.name
          this.peopleOnGroup = this.group._members
        }
      }

    },
    mounted(){
      if(this.group){
        this.name = this.group.name
        this.peopleOnGroup = this.group._members
      }

      let scope = this
      this.axios.get('/api/user/get-all-users').then(response=>{
        scope.people = response.data.data
      })
    },

    methods : {
      closeModal(){
        this.$emit('close')

      },
      customLabel (option) {
        return `${option.name}`
      },

      submitForm(){

        let band = {}
        band.name    = this.name
        band.members = this.peopleOnGroup
        let jsonBand = JSON.stringify(band)

        if(this.edit){

          const oldId = this.group._id

          this.axios.put('/api/group/update-group-by-id/'+this.group._id,jsonBand,{
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response=>{
            this.$emit('close')
          }).catch(error=>{
            console.log(error)
          })

        }
        else {

          this.axios.post('/api/group/create-group', jsonBand,{
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response => {
            this.groups[response.data.data._id] = response.data.data
            alert('cadastrado com sucesso')
          })
        }

      }


    }
  }
</script>

<style scoped lang="css">

</style>
