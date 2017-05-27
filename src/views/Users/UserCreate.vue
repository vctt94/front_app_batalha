<template>
  <div class="users">

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

    <br /><br />
    <div class="hero field is-grouped">
      <p class="control">
        <button class="button is-primary" @click="createUser" style="background-color: black"> Cadastrar MC </button>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    name: 'UserCreate',

    data () {
      return {
        user: {
          name : null,
          email : null,
          gender : null,
          user_leve: 1
        }
      }
    },


    methods : {

      createUser() {
        axios.post('http://localhost:3000/user/create-user', {
          body: this.user
        }).then( response => {
          console.log(response)
        }).catch(e => {
          console.log(e)
        })
      }


    }
  }
</script>

<style scoped lang="sass">
  .users
    width : 100%
    border-width: 10em
    align-items: center
</style>
