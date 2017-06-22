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

        const temp = '{"_id":"594bc61626ff9561ef7f1298","brackets":{"_id":"594bc61626ff9561ef7f1297","__v":0,"modified":"2017-06-22T13:28:54.041Z","created":"2017-06-22T13:28:54.041Z","finale":[],"semi_final":[],"quarter_final":[{"_id":"594bc61626ff9561ef7f1293","first":{"_id":"594a69f27f3d1c20dece3667","name":"qwdqwdq","email":"qwdqwd","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-21T12:43:30.470Z","created":"2017-06-21T12:43:30.470Z","_group":[],"virgin":false},"stage":0,"__v":0,"modified":"2017-06-22T13:28:54.040Z","created":"2017-06-22T13:28:54.040Z","third":null,"second":{"_id":"59443bd2d6b7b83a2cf7618d","name":"eafaef","email":"eafaef","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-16T20:13:06.895Z","created":"2017-06-16T20:13:06.895Z","_group":[],"virgin":false}},{"_id":"594bc61626ff9561ef7f1294","first":{"_id":"594a6a207f3d1c20dece3668","name":"zzzzzzzzzzzz","email":"zzzzzz","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-21T12:44:16.960Z","created":"2017-06-21T12:44:16.960Z","_group":[],"virgin":false},"stage":0,"__v":0,"modified":"2017-06-22T13:28:54.041Z","created":"2017-06-22T13:28:54.041Z","third":null,"second":{"_id":"5949cc217f3d1c20dece3664","name":"qweqwe","email":"qwwqe","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-21T01:30:09.804Z","created":"2017-06-21T01:30:09.804Z","_group":[],"virgin":false}}],"first_stage":[{"_id":"594bc61626ff9561ef7f1293","first":{"_id":"594a69f27f3d1c20dece3667","name":"qwdqwdq","email":"qwdqwd","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-21T12:43:30.470Z","created":"2017-06-21T12:43:30.470Z","_group":[],"virgin":false},"stage":0,"__v":0,"modified":"2017-06-22T13:28:54.040Z","created":"2017-06-22T13:28:54.040Z","third":null,"second":{"_id":"59443bd2d6b7b83a2cf7618d","name":"eafaef","email":"eafaef","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-16T20:13:06.895Z","created":"2017-06-16T20:13:06.895Z","_group":[],"virgin":false}},{"_id":"594bc61626ff9561ef7f1294","first":{"_id":"594a6a207f3d1c20dece3668","name":"zzzzzzzzzzzz","email":"zzzzzz","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-21T12:44:16.960Z","created":"2017-06-21T12:44:16.960Z","_group":[],"virgin":false},"stage":0,"__v":0,"modified":"2017-06-22T13:28:54.041Z","created":"2017-06-22T13:28:54.041Z","third":null,"second":{"_id":"5949cc217f3d1c20dece3664","name":"qweqwe","email":"qwwqe","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-21T01:30:09.804Z","created":"2017-06-21T01:30:09.804Z","_group":[],"virgin":false}},{"_id":"594bc61626ff9561ef7f1295","first":{"_id":"594a69837f3d1c20dece3665","name":"MC doidao","email":"qwe@qwe.com","gender":"mina","user_level":1,"__v":0,"modified":"2017-06-21T12:41:39.966Z","created":"2017-06-21T12:41:39.966Z","_group":[],"virgin":false},"stage":0,"__v":0,"modified":"2017-06-22T13:28:54.041Z","created":"2017-06-22T13:28:54.041Z","third":null,"second":{"_id":"5949cbef7f3d1c20dece3663","name":"teste","email":"teste","gender":"mina","user_level":1,"__v":0,"modified":"2017-06-21T01:29:19.332Z","created":"2017-06-21T01:29:19.332Z","_group":[],"virgin":false}},{"_id":"594bc61626ff9561ef7f1296","first":{"_id":"594a69b17f3d1c20dece3666","name":"zzzzz","email":"zzzz","gender":"mina","user_level":1,"__v":0,"modified":"2017-06-21T12:42:25.007Z","created":"2017-06-21T12:42:25.007Z","_group":[],"virgin":false},"stage":0,"__v":0,"modified":"2017-06-22T13:28:54.041Z","created":"2017-06-22T13:28:54.041Z","third":null,"second":{"_id":"594a6d92bf9f4e425a36a8e8","name":"tttt","email":"ttt","gender":"mano","user_level":1,"__v":0,"modified":"2017-06-21T12:58:58.344Z","created":"2017-06-21T12:58:58.345Z","_group":[],"virgin":false}}]},"__v":0,"modified":"2017-06-22T13:28:54.042Z","created":"2017-06-22T13:28:54.042Z"}'
        const parsedtemp = JSON.parse(temp)

        scope.battle      = parsedtemp
        scope.stages[0]  = parsedtemp.brackets.first_stage
        scope.stages[1]  = parsedtemp.brackets.quarter_final
        scope.showBracket = true
        scope.loading     = false
        scope.stepper     = 2

//        this.axios.post('api/battle/make-battle', this.usersSubscribed).then(response => {
//          console.log(JSON.stringify(response.data.data))
//          scope.battle      = response.data.data
//          scope.stages[0]  = response.data.data.brackets.first_stage
//          scope.showBracket = true
//          scope.loading     = false
//          scope.stepper     = 2
//        }).catch( err => {
//          console.log(err)
//        })
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
