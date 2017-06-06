<template>
  <div class="column is-offset-2">
      <content-navbar
        v-on:update="setContentNavbarSection"
        string = "Bandas cadastradas"
      />

    <modal-confirm
      :show="showDelete"
      :title = "modalProps.title"
      :content = "modalProps.content"
      :submitButton="modalProps.submitButton"
      v-on:submit="deleteBand(modalProps.group._id); showDelete = false"
      v-on:cancel="showDelete = false"
    ></modal-confirm>

    <modal-band-form
      :show       = "showModalForm"
      :title      = "modalProps.title"
      :groups     = "groups"
      :group      = "group"
      :edit       = "edit"
      v-on:submit = "showModalForm = false"
      v-on:close  = "closeModal"
    ></modal-band-form>
    <div class="rendered-content table is-bordered is-striped is-narrow">
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
            <a class="fa fa-book" v-on:click="openEditModal(group)">

            </a>
          </td>
          <td v-on:click="openDeleteModal(group)">
            <a class="fa fa-trash">

            </a>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>

</template>

<script>

import ModalConfirm from '../Components/Modal.vue'
import ModalBandForm from '../Components/ModalBandForm.vue'
import ContentNavbar from '../../components/ContentNavbar.vue'

export default {
    name: 'BandCreate',

    components : {ModalConfirm, ModalBandForm, ContentNavbar},

    data () {
        return {
            groups        : {},
            showDelete    : false,
            showModalForm : false,
            modalProps    : [],
            group         : null,
            edit          : null,
            section       : 'list'

        }
    },
    mounted(){
        const scope = this;
        this.axios.get('/api/group/get-all-groups').then(response=>{
            scope.groups = response.data.data
        })

    },

    methods : {
        setContentNavbarSection(value) {
            this.section = value
        },

        openDeleteModal(group){
            this.modalProps.content = "Tem certeza que deseja deletar "+group.name +"?"
            this.modalProps.submitButton = "Deletar"
            this.modalProps.title = "Confirmar"
            this.modalProps.group = group
            this.showDelete = true
        },

        openEditModal(group){

            this.edit = true
            this.group = group
            this.showModalForm = true
        },

        openCreateModal(){
            this.edit = false
            this.showModalForm = true
        },

        closeModal(group){
            if(group)
            this.groups[group._id] = group
            this.edit          = false
            this.showModalForm = false
            this.group         = null
        },

        deleteBand(id){

            console.log(this.groups)
            console.log(this.groups[id])
            this.groups[id] = null

            //          this.$http.delete('api/group/delete-group-by-id/'+id)
        },



    }
}
</script>

<style scoped lang="sass">
    .rendered-content
      padding-top: 4em
</style>
