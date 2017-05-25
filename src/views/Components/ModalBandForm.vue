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
          <div>
            <div v-if="peopleOnGroup">
                <div v-for="personInGroup in peopleOnGroup">
                  <div v-if="personInGroup">
                    {{personInGroup.name}}
                    <span class="fa fa-remove" v-on:click="removePersonFromGroup(personInGroup)"></span>
                  </div>
                </div>
            </div>
            <hr>
            <label class="label">Pesquisar Integrante </label>
            <input class="input" type="text" v-model="search" v-on:keyup="searchUser">

            <div v-if="loadingSearch" class="fa fa-cog fa-spin fa-3x fa-fw">
            </div>
            <div v-else>
              <h4 class="title">Integrantes: </h4>
              <ul v-if="people">
                <li v-for="person in people" v-if="person" v-on:click="addPersonToGroup(person)">
                  {{person.name}}
                </li>
              </ul>
            </div>
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

  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

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
        people        : {},
        peopleOnGroup : {},
        search        : null,
        loadingSearch : false
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
      removePersonFromGroup(person){
        this.peopleOnGroup[person._id] = null
        this.people[person._id]        = person
      },
      addPersonToGroup(person){
        this.peopleOnGroup[person._id] = person
        this.people[person._id] = null

      },
      searchUser(){

        const scope = this
        this.loadingSearch = true
        this.axios.post('/api/user/search-user-by-name',{name : this.search},headers).then(response => {
          scope.people = response.data.data
          scope.loadingSearch = false
        })

      },

      closeModal(){
        this.$emit('close')
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
