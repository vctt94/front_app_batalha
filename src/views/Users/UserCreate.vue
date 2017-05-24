<template>
  <div class="users column is-half is-offset-one-quarter">

    <div class="field" style="width: 50%">
      <label class="label">MC ____ : </label>
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="nome/mais conhecido como" v-model="name">
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
        <input class="input" type="text" placeholder="email" >
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
          <input type="radio" value="male" name="genero" v-model="gender">
          Mano
        </label>
        <label class="radio">
          <input type="radio" value="female" name="genero" v-model="gender">
          Mina
        </label>
      </p>
    </div>

    <br /><br />
    <div class="hero field is-grouped">
      <p class="control">
        <button class="button is-primary" style="background-color: black"> Cadastrar MC </button>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'


  export default {
    name: 'UserCreate',

    data () {
      return {
          name : null,
          email : null,
          gender : null,
          groups : [],

      }
    },


    methods : {



    }
  }
</script>

<style scoped lang="sass">
  .users
    width : 100%
    border-width: 10em
    align-items: center
</style>
