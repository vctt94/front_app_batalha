<template>
  <div class="container">
    <div class="column table is-bordered is-striped is-narrow">
      <modal-confirm
        :show="showDelete"
        :title = "modalProps.title"
        :content = "modalProps.content"
        :submitButton="modalProps.submitButton"
        v-on:submit="deleteBand(modalProps.group._id); showDelete = false"
        v-on:cancel="showDelete = false"
      ></modal-confirm>

      <modal-band-create
        :show  = "showCreate"
        :title = "modalProps.title"
        :groups = "groups"
        v-on:submit="showCreate = false"
        v-on:cancel="showCreate = false"
      ></modal-band-create>

      <a class="fa fa-plus" v-on:click="showCreate = true">Adicionar novo</a>

      <table>
        <thead>

        <tr>
          <th>Nome</th>
          <th>Integrantes</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>

        </thead>
        <tfoot>
        <tr>
          <th>Nome</th>
          <th>Integrantes</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
        </tfoot>
        <tbody>
        <tr v-for="group in groups" v-if="group">
          <td>{{group.name}}</td>
          <td >
            <ul>
              <li v-for="member in group._members">{{member.name}}</li>
            </ul>
          </td>
          <td>
            <a class="fa fa-book">

            </a>
          </td>
          <td v-on:click="openModal(group)">
            <a class="fa fa-trash">

            </a>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
    <div class="column">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  import ModalConfirm from '../Components/Modal.vue'
  import ModalBandCreate from '../Components/ModalBandCreate.vue'

  export default {
    name: 'BandCreate',

    components : {ModalConfirm,ModalBandCreate},

    data () {
      return {
        groups : {},
        showDelete : false,
        showCreate : false,
        modalProps : [],
      }
    },
    mounted(){
      let scope = this
      this.$http.get('/api/group/get-all-groups').then(response=>{
        scope.groups = JSON.parse(response.bodyText)
      })
    },

    methods : {

        openModal(group){
            this.modalProps.content = "Tem certeza que deseja deletar "+group.name +"?"
            this.modalProps.submitButton = "Deletar"
            this.modalProps.title = "Confirmar"
            this.modalProps.group = group
            this.showDelete = true
        },
      deleteBand(id){

        console.log(this.groups)
        console.log(this.groups[id])
        this.groups[id] = null

//          this.$http.delete('api/group/delete-group-by-id/'+id)
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
