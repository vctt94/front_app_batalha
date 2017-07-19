<template>
  <div class="main-wrapper">
    <div v-if="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw">
    </div>

    <div class="user-main" v-else>

      <content-navbar
        v-on:update="setContentNavbarSection"
        string = "MC's cadastrados"
      />

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
        :users      = "listUsers"
        :user       = "userEdit"
        :edit       = "edit"
        v-on:submit = "showModalForm = false"
        v-on:close  = "closeModal"
      ></modal-user-form>

      <div class="rendered-content">

        <div v-if="this.section == 'list'" class="table-wrapper">

          <table class="table  is-striped is-narrow">
            <thead>
            <tr>
              <th>Nome</th>
              <th class="is-hidden-touch">Email</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
            </thead>
            <tfoot>
              <th>Nome</th>
              <th class="is-hidden-touch">Email</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tfoot>
            <tbody>

            <tr v-for="user in listUsers" v-if="user">
              <td>
                {{user.name}}
              </td>
              <td class="is-hidden-touch" >
                {{user.email}}
              </td>
              <td>
                <a class="fa fa-book" v-on:click="openEditModal(user)">
                </a>
              </td>
              <td>
                <a class="fa fa-trash" v-on:click="openDeleteModal(user)">
                </a>
              </td>
            </tr>
            </tbody>
          </table>

        </div>

        <div v-if="this.section == 'create'">
          <div class="column is-half is-offset-2">

            <div class="field" >
              <label class="label">MC ____ : </label>
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="nome/mais conhecido como" v-model="user.name">
                <span class="icon is-small is-left">
                                    <i class="fa fa-user"></i>
                                </span>
                <span class="icon is-small is-right">
                                    <i class="fa fa-check"></i>
                                </span>
              </p>
            </div>

            <div class="field">
              <label class="label">Email : </label>
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="email" v-model="user.email" >
                <span class="icon is-small is-left">
                                    <i class="fa fa-envelope"></i>
                                </span>
                <span class="icon is-small is-right">
                                    <i class="fa fa-warning"></i>
                                </span>
              </p>
            </div>


            <div class="field">
              <p class="control">
                <label class="radio">
                  <input type="radio" value="mano" name="genero" v-model="user.gender">
                  Mano
                </label>
                <label class="radio">
                  <input type="radio" value="mina" name="genero" v-model="user.gender">
                  Mina
                </label>
              </p>
            </div>

            <br /><br />
            <div class="hero field is-grouped">
              <p class="control">
                <button class="button is-primary" @click="createUser" > Cadastrar MC </button>
              </p>
            </div>
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ModalConfirm from '../Components/Modal.vue'
  import ModalUserForm from '../Components/ModalUserForm.vue'
  import ContentNavbar from '../../templates/ContentNavbar.vue'

  const headers = {
    'Content-Type': 'application/json'
  }

  export default {
    name: 'UsersMain',

    components: {ContentNavbar, ModalConfirm, ModalUserForm},

    data () {
      return {
        listUsers: {},
        section: 'list',
        user: {
          name : '',
          email : '',
          gender : '',
          user_level : 1
        },
        showDelete    : false,
        showModalForm : false,
        modalProps    : [],
        edit          : null,
        userEdit      : null,
        loading: true,
        string: 'MCs cadastrados'
      }
    },

    mounted() {
      const scope = this;

      this.axios.get('https://murmuring-meadow-23071.herokuapp.com/user/get-all-users').then(response=>{
        scope.listUsers = response.data.data
        scope.loading = false
      })


    },

    methods : {

      setContentNavbarSection(value) {
        const scope = this;

        if(value == 'list') {
          this.loading = true
          this.axios.get('https://murmuring-meadow-23071.herokuapp.com/user/get-all-users').then(response=>{
            scope.listUsers = response.data.data
            scope.loading = false
          })
        }
        this.section = value
      },

      createUser() {
        let jsonUser = JSON.stringify(this.user)

        this.axios.post(API_URL + '/user/create-user', jsonUser, {
          headers: headers
        }).then( response => {
          console.log(response)

          this.$notify({
            title: 'Mil trutas mil tretas',
            message: 'MC recrutado com sucesso',
            type: 'success'
          });

        }).catch( err => {
          console.log(err)

          this.$notify({
            title: 'Zero truta zero treta',
            message: 'Erro interno ao recrutar MC. Causa: ' + err.message,
            type: 'error'
          });
        })
      },

      openDeleteModal(user){
        this.modalProps.content = "Tem certeza que deseja deletar "+user.name +"?"
        this.modalProps.submitButton = "Deletar"
        this.modalProps.title = "Confirmar"
        this.modalProps.user = user
        this.showDelete = true
      },

      openEditModal(user){

        this.edit = true
        this.userEdit = user
        this.showModalForm = true
      },

      openCreateModal(){
        this.edit = false
        this.showModalForm = true
      },

      closeModal(user){
        if(user)
          this.listUsers[user._id] = user
        this.edit          = false
        this.showModalForm = false
        this.userEdit      = null
      },

      deleteUser(id){
        this.listUsers[id] = null
        this.axios.delete(API_URL + '/user/delete-user-by-id/'+id).then( response => {
          window.location.reload()
        })
      }


    }
  }
</script>

<style scoped lang="scss">

  .main-wrapper{
    margin-top: 4em;
    max-width: 100%;
  }
  .table-wrapper{
    max-width: 100% !important;
  }
  table{
  }
  .user-main{
    width: 90%;
    margin-left: 5%;
  }




</style>
