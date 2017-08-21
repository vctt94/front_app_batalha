<template>
  <div>
    <div>
      <h1>Escolha os MCs Para batalhar!</h1>
    </div>
    <div class="columns">
      <div class="column">
        <table>
          <thead>
          <tr>
            <th>Nome MC</th>
          </tr>
          </thead>
          <tfoot>

          </tfoot>
          <tbody>

          <tr v-for="user in users" v-if="user">

            <td>
              {{user.name}}
            </td>
            <td>
              <a class="btn" @click="subscribe(user)"><i class="fa fa-arrow-right" style="color: grey" aria-hidden="true"></i></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="column is-one-third is-offset-4">
        <table>
          <thead>
          <tr>
            <th>Sorteando</th>
          </tr>
          </thead>
          <tfoot>

          </tfoot>
          <tbody>
          <tr v-for="user in usersSubscribed" v-if="user">

            <td>
              {{user.name}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <fab
        bg-color="#0e2449"
        position="top-right"
        :actions="actions"
        @newUser="newUser"
        @listUsers="listUsers"
        style="padding-top: 2em"
      />

    </div>
  </div>

</template>



<script>
  import fab from 'vue-fab'

  export default {

    props: {
      users: {
        Type: Object
      }
    },

    data() {
      return {
        usersSubscribed : [],
        actions: [
          {
            name: 'newUser',
            icon: 'add'
          },
          {
            name: 'listUsers',
            icon: 'list'
          }
        ]
      }
    },

    methods: {
      subscribe(user) {
        this.usersSubscribed.push(user)
      },
    }
  }

</script>


<style>

</style>
