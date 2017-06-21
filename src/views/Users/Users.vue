<template>
  <div class="">

      <content-navbar



      >

      </content-navbar>

    <modal-confirm
      :show="showDelete"
      :title = "modalProps.title"
      :content = "modalProps.content"
      :submitButton="modalProps.submitButton"
      v-on:submit="deleteUser(modalProps.user._id); showDelete = false"
      v-on:cancel="showDelete = false"
    ></modal-confirm>

    <modal-user-form
      :show       = "showModalForm"
      :title      = "modalProps.title"
      :users     = "users"
      :user      = "user"
      :edit       = "edit"
      v-on:submit = "showModalForm = false"
      v-on:close  = "closeModal"
    ></modal-user-form>
    <a class="fa fa-plus" v-on:click="openCreateModal">Adicionar novo</a>
    <div class="table is-bordered is-striped is-narrow">
      <table>
        <thead>

        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>

        </thead>
        <tfoot>

        </tfoot>
        <tbody>
        <tr v-for="user in users" v-if="user">
          <td>{{user.name}}</td>
          <td >
            {{user.email}}
          </td>
          <td>
            <a class="fa fa-book" v-on:click="openEditModal(user)">

            </a>
          </td>
          <td v-on:click="openDeleteModal(user)">
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
  import ModalUserForm from '../Components/ModalUserForm.vue'
  import ContentNavbar from '../../components/ContentNavbar.vue'



  export default {
    name: 'users',

    components : {ModalConfirm,ModalUserForm,ContentNavbar},

    data () {
      return {
        users        : {},
        showDelete    : false,
        showModalForm : false,
        modalProps    : [],
        user         : null,
        edit          : null

      }
    },
    mounted(){
      const scope = this;
      this.axios.get(API_URL + '/user/get-all-users').then(response=>{
        scope.users = response.data.data
      })

    },

    methods : {

      openDeleteModal(user){
        this.modalProps.content = "Tem certeza que deseja deletar "+user.name +"?"
        this.modalProps.submitButton = "Deletar"
        this.modalProps.title = "Confirmar"
        this.modalProps.user = user
        this.showDelete = true
      },

      openEditModal(user){

        this.edit = true
        this.user = user
        this.showModalForm = true
      },

      openCreateModal(){
        this.edit = false
        this.showModalForm = true
      },

      closeModal(user){
        if(user)
          this.users[user._id] = user
        this.edit          = false
        this.showModalForm = false
        this.user         = null
      },

      deleteUser(id){

        console.log(this.users)
        console.log(this.users[id])
        this.users[id] = null

        this.$http.delete(API_URL + '/user/delete-user-by-id/'+id)
      },



    }
  }
</script>

<style scoped lang="scss">

</style>
