<template>
  <div>
    <p>
      <a class="button is-large is-orange" @click="sendUsersSubscribed">Começar Batalha!</a>
    </p>

    <h1>Escolha os Integrantes</h1>

    <div class="columns">

      <div class="column is-3 is-offset-3 margin-right-1">
        <table class="table is-bordered is-striped">
          <thead>
          <tr>
            <th>MCs Cadastrados</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="user in users" v-if="user">
            <td>
              {{user.name}}
            </td>
            <td >
              <a class="btn" @click="subscribe(user)"><i class="fa fa-arrow-right blackhover" style="color: grey" aria-hidden="true"></i></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="column is-3">
        <table class="table is-bordered is-striped">
          <thead>
          <tr>
            <th>MCs na disputa !</th>
            <th>
              estreiante?
            </th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="user in usersSubscribed">
            <td>
              <a class="btn" @click="unsubscribe(user)"><i class="fa fa-arrow-left blackhover" style="color: grey" aria-hidden="true"></i></a>
              &nbsp&nbsp
              &nbsp&nbsp
              &nbsp&nbsp
              {{user.name}}
            </td>
            <td>
              <a @change="setVirgin(user)"><el-checkbox></el-checkbox></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

  import requestHelper from '../../utils/requestHelper'
  export default {
    name: "subscribe-users",

    mounted(){
      requestHelper.getUsers().then(response=>{
        this.loading = false;
        this.users = response.data.data
        this.users = this.users.reverse()
        this.stepNumber++;
      })
    },

    data(){
      return{
        loading         : true,
        users           : [],
        usersSubscribed : [],
      }
    },
    methods: {
      sendUsersSubscribed(){

        const battle = {
          'name': this.battleName,
          'description': this.battleDesc,
          'usersSubscribed': this.usersSubscribed
        }

        const jsonBattle = JSON.stringify(battle);

        requestHelper.makeBattle(jsonBattle).then(response => {
          console.log(response.data)
          this.battle      = response.data.data
          this.brackets    = response.data.data.brackets
          this.showBracket = true
          this.loading     = false
          this.stepNumber = 2
        }).catch( err => {
          this.loading     = false
          console.log(err)
        })

      },
      subscribe(user) {
        let index = this.users.indexOf(user)
        this.users.splice(index, 1)
        this.usersSubscribed.push(user)
      },

      unsubscribe(user) {
        let index = this.usersSubscribed.indexOf(user)
        this.usersSubscribed.splice(index, 1)
        this.users.unshift(user)
      },

      setVirgin(user) {
        let index = this.usersSubscribed.indexOf(user)
        if(this.usersSubscribed[index].virgin === undefined)
          this.usersSubscribed[index].virgin = true
        else
          this.usersSubscribed[index].virgin = !this.usersSubscribed[index].virgin

      }
    }

  }
</script>

<style scoped>

</style>
