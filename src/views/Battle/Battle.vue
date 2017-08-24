<template>
  <div class="battle-wrapper content">
    <modal-user-form
      :show       = "showModalForm"
      :edit       = "false"
      v-on:submit = "showModalForm = false"
      v-on:close  = "closeModal"
    ></modal-user-form>
    <stepper
      :steps="steps"
      :step-number="stepNumber"
      :offset="1"
    >
    </stepper>
    <br />
    <div v-if="loading" class="column">
      <lottie :options="defaultOptions" :height="500" :width="500" v-on:animCreated="handleAnimation"/>
    </div>

    <div v-else>

      <create-battle></create-battle>
      <div class="create-battle" v-if="stepNumber==0">
      </div>

      <div v-else-if="stepNumber == 1" class="subscribe-user">
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

        <fab
            bg-color="#0e2449"
            position="top-right"
            :actions="actions"
            @newUser="newUser"
            @listUsers="listUsers"
            style="padding-top: 2em"
         />
      </div>

      <div v-else-if="stepNumber == 2">
        <main id="tournament" class="column">
          <bracket
            :brackets      = "brackets"
            :battle        = "battle"
          />
        </main>
        <a class="button is-black" v-on:click="quitBattle">Finalizar Batalha</a>
      </div>
    </div>

  </div>

</template>

<script>

  import fab from 'vue-fab'
  import Bracket from '../Components/Bracket.vue'
  import Create from './create.vue'
  import ModalConfirm from '../../templates/ModalConfirm.vue'
  import ModalUserForm from '../Components/ModalUserForm.vue'
  import Stepper from '../Components/Stepper'
  import Lottie from '../../templates/Lottie.vue'
  import * as animationData from '../../assets/loader.json'
  import * as soundData from '../../assets/volume_shaker.json'
  import requestHelper from '../../utils/requestHelper'

  const StepNames = ['Criar Batalha', 'Inscrever Usuários', 'Batalhar!']

  export default {

    components : {
      createBattle: Create,

      Bracket, fab, ModalConfirm, Lottie, ModalUserForm,Stepper},

    data () {
      return {

        defaultOptions  : {animationData: animationData},
        soundOptions    : {animationData: soundData},
        battle          : null,
        brackets        : [],
        users           : [],
        usersSubscribed : [],
        total_rounds    : 0,
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
        ],
        steps:[],
        step: {
          number: null,
          name: null
        },
        stepNumber: 0

      }
    },


    mounted(){

      const numberOfSteps = 3;
      for(let i=0;i < numberOfSteps;i++){
        this.steps.push({number: i, name: StepNames[i]})
      }

      requestHelper.getLatestBattle().then(response => {
        if(response.data.data.length === 0 || !response.data.data[0].active ) {
          this.loading = false;
          return;
        }

        this.stepNumber = 2;
        this.battle   = response.data.data[0]
        this.brackets = response.data.data[0].brackets
        this.showBracket = true
        this.loading = false
      }).catch(err=>{
        console.log(err)
        this.loading = false;
      })

    },

    methods : {

      quitBattle(){
        const data = {
          'battle_id': this.battle._id,
          'winner_id': null
        }

        requestHelper.finishBattle( JSON.stringify(data) ).then(response => {
          console.log(response)
        })
        this.$router.push('/')
      },

      createBattle(){
        this.loading = true;

        requestHelper.getUsers().then(response=>{
          this.loading = false;
          this.users = response.data.data
          this.users = this.users.reverse()
          this.stepNumber++;
        })
      },

      closeModal(user){
        this.showModalForm = false
        this.reloadUsers()
      },

      handleAnimation(anim) {
        this.anim = anim;
      },

      reloadUsers(){
        this.loading = true;

        requestHelper.getUsers().then(response=>{
          this.loading = false;
          this.users = response.data.data
          this.users = this.users.reverse()
        })
      },

      newUser() {
        this.showModalForm = true
      },

      listUsers() {
        alert('listing users')
      },

      sendUsersSubscribed(){

        this.loading = true

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

<style scoped lang="scss">

  .battle-wrapper{
  }
  .create-battle{
    width: 80%;
    margin-left: 10%;
    padding: 50px;
  }
  .subscribe-user{
  }
  input{
    width: 50%;
  }
  .textarea{

  }
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
