<template>
  <div>
    <modal-user-form
      :show       = "showModalForm"
      :edit       = "false"
      v-on:submit = "showModalForm = false"
      v-on:close  = "closeModal"
    ></modal-user-form>

    <div class="column is-offset-3">
      <el-steps :space="350" :active="stepper" style="color: black">
        <el-step title="Sorteio" icon="search"></el-step>
        <el-step title="Chaves" icon="share"></el-step>
      </el-steps>

    </div>
    <div v-if="loading">
      <lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>
    </div>
    <div v-else>

      <br /><br />
      <div v-if="!showBracket" class="column is-half is-offset-2">

        <a class="button" @click="sendUsersSubscribed">Show usersSubscribed</a>
        <br /><br />
        <div class="columns" style="padding-top: 2em" >
          <div class="column is-two-thirds">
            <table class="table">
              <thead>
              <tr>
                <th>nome MC</th>
              </tr>
              </thead>
              <tfoot>
              </tfoot>
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
          <div class="column is-two-thirds is-offset-2">
            <table class="table">
              <thead>
              <tr>
                <th>na disputa !</th>
                <th>
                  estreiante?
                </th>
              </tr>
              </thead>
              <tfoot>
              </tfoot>
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

        <fab
          bg-color="#0e2449"
          position="top-right"
          :actions="actions"
          @newUser="newUser"
          @listUsers="listUsers"
          style="padding-top: 2em"
        />

      </div>
      <!-- <modal-confirm ></modal-confirm> -->
      <main id="tournament" class="column" style="padding-left: 10em;">
        <bracket
          v-if="showBracket"
          :stages = "stages"
          v-on:getWinner="showWinner"
        />
      </main>

    </div>




  </div>

</template>

<script>

  import fab from 'vue-fab'
  import Bracket from '../Components/Bracket.vue'
  import ModalConfirm from '../../templates/ModalConfirm.vue'
  import ModalUserForm from '../Components/ModalUserForm.vue'
  import Lottie from '../../templates/Lottie.vue'
  import * as animationData from '../../assets/volume_shaker.json'

  export default {

    components : {Bracket, fab, ModalConfirm, Lottie, ModalUserForm},

    data () {
      return {
        defaultOptions  : {animationData: animationData},
        battle          : null,
        stages          : [],
        users           : [],
        usersSubscribed : [],
        total_rounds    : 0,
        stepper         : 1,
        loading         : true,
        showBracket     : false,
        showModalForm   : false,
        actions         : [
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

    mounted(){
      let scope = this;

      this.axios.get('/api/user/get-all-users').then(response=>{
        const users = response.data.data

        for(let id in users){
          scope.users.push(users[id])
        }
        scope.loading = false
      })

    },

    methods : {
      closeModal(user){
        this.showModalForm = false
        this.reloadUsers()
      },

      handleAnimation(anim) {
        this.anim = anim;
      },

      reloadUsers(){
        let scope = this
        this.axios.get('/api/user/get-all-users').then(response=>{
          scope.users = response.data.data
//               scope.users = scope.users.reverse()
        })
      },

      getWinner(data) {
        console.log(data)
        let user_id = data.person._id
      },

      newUser() {
        this.showModalForm = true
      },

      listUsers() {
        alert('listing users')
      },

      sendUsersSubscribed(){
        let scope = this
        this.loading = true
        // let users = this.remakeUsersArray()

        this.axios.post('api/battle/make-battle', this.usersSubscribed).then(response => {
          scope.battle      = response.data.data
          scope.stages[0]  = response.data.data.brackets.first_stage
          scope.showBracket = true
          scope.loading     = false
          scope.stepper     = 2
        }).catch( err => {
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

      },

      showWinner(data){
        console.log(data)
      }

    }
  }
</script>

<style scoped lang="scss">

  .fab-button {
    padding-top: 10em;
  }

  i :hover {
    color: black;
  }

  a :hover {
    color: black;
  }

  .blackhover {
    color: black;

  }

  .box {
    width: 320px;
    padding: 10px;
    border: 5px solid gray;
    margin: 0;
  }
  /*
  *  General Styles
  */


</style>
