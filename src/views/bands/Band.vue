<template>
  <div class="table is-bordered is-striped is-narrow">

    <modal-confirm
      :show="showDelete"
      :title = "modalProps.title"
      :content = "modalProps.content"
      :submitButton="modalProps.submitButton"
      v-on:submit="deleteBand(modalProps.group._id); showDelete = false"
      v-on:cancel="showDelete = false"
    ></modal-confirm>

    <table></table>
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
        Editar
      </td>
      <td v-on:click="openModal(group)">
        deletar
      </td>
    </tr>
    </tbody>

  </div>
</template>

<script>

  import ModalConfirm from '../Components/Modal.vue'

  export default {
    name: 'BandCreate',

    components : {ModalConfirm},

    data () {
      return {
        groups : {},
        showDelete : false,
        modalProps : [],
      }
    },
    mounted(){
      let scope = this
      this.$http.get('/api/group/get-all-groups').then(response=>{
        scope.groups = JSON.parse(response.bodyText)
        console.log(scope.groups)
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
