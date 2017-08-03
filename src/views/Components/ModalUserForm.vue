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

          <div class="field" >
            <label class="label">MC ____ : </label>
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="nome/mais conhecido como" v-model="localUser.name">
              <span class="icon is-small is-left">
          <i class="fa fa-user"></i>
        </span>
              <span class="icon is-small is-right">
          <i class="fa fa-check"></i>
        </span>
            </p>
          </div>

          <div class="field" >
            <label class="label">Email : </label>
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="email" v-model="localUser.email" >
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
                <input type="radio" value="mano" name="genero" v-model="localUser.gender">
                Mano
              </label>
              <label class="radio">
                <input type="radio" value="mina" name="genero" v-model="localUser.gender">
                Mina
              </label>
            </p>
          </div>

        </div>


      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" v-on:click="submitForm" v-if="!edit">Cadastrar</a>
        <a class="button is-success" v-on:click="submitForm" v-else>Editar</a>
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
        localUser: {
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
        default: "Cadastro de MC"
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
      user: {
        type: Object
      },
      edit : {
        type: Boolean
      }
    },

    watch : {
      user(){
        if(this.user)
          this.localUser = this.user
      }
    },

    methods : {

      closeModal(){
        this.$emit('close')

      },

      submitForm(){

        const scope = this;
        let jsonUser = JSON.stringify(this.localUser)

        if(this.edit){

          this.axios.put('/api/user/update-user-by-id/'+scope.user._id,jsonUser,{
            headers: headers
          }).then(response=>{
            this.$emit('close')
          }).catch(error=>{
            console.log(error)
          })

        }
        else {
          console.log(jsonUser)

          this.axios.post('/api/user/create-user',jsonUser,{
              headers: headers
          }).then( response => {
            this.$notify({
                title: 'Mil trutas mil tretas',
                message: 'MC recrutado com sucesso',
                type: 'success'
            });
            this.$emit('close')
          }).catch(e => {
            this.$notify({
                title: 'Zero truta zero treta',
                message: 'Erro interno ao recrutar MC. Causa: ' + err.message,
                type: 'error'
            });
            this.$emit('close')
          })
        }

      }


    }

  }
</script>

<style scoped lang="scss">
    .modal {
        padding-bottom: 30em;
    }
</style>
