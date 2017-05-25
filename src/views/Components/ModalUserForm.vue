<template>

  <div class="modal" :class="[ show ? 'is-active' : '' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Cadastrar MC</p>
        <button class="delete" v-on:click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">

        <div class="users column is-half is-offset-one-quarter">

          <div class="field" style="width: 50%">
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

          <div class="field" style="width: 50%">
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

  const headers = {
    'Content-Type': 'application/json'
  }

  export default {
    name: 'UserCreate',

    data () {
      return {
        user: {
          name : null,
          email : null,
          gender : null,
          user_level: 1
        }
      }
    },

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

    methods : {

      closeModal(){
        this.$emit('close')

      },

      submitForm(){

        const scope = this;
        let jsonUser = JSON.stringify(this.user)

        if(this.edit){

          const oldId = this.group._id

          this.axios.put('/api/group/update-group-by-id/'+scope.user._id,jsonUser,{
            headers: headers
          }).then(response=>{
            this.$emit('close')
          }).catch(error=>{
            console.log(error)
          })

        }
        else {
          console.log(jsonUser)

          this.axios.post('api/user/create-user',jsonUser,{
              headers: headers
            }).then( response => {
            console.log(response)
          }).catch(e => {
            console.log(e)
          })
        }

      }


    }

  }
</script>

<style scoped lang="sass">

</style>

