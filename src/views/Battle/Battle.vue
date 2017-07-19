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

      <div class="create-battle" v-if="stepNumber==0">
        <form>
          <h2 class="title is-2">Batalha !</h2>

          <div class="field ">
            <label class="label">Nova Saga</label>
            <input class="input  " type="text" placeholder="ex.: Nº 42" v-model="battleName">
          </div>

          <div class="field ">
            <label class="label">Descrição</label>
            <textarea class="textarea" placeholder="convidados especiais, evento, acontecimento inédito ..." v-model="battleDesc"></textarea>
          </div>

          <a class="button is-large is-orange" @click="createBattle">Criar Batalha</a>
        </form>
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
  import ModalConfirm from '../../templates/ModalConfirm.vue'
  import ModalUserForm from '../Components/ModalUserForm.vue'
  import Stepper from '../Components/Stepper'
  import Lottie from '../../templates/Lottie.vue'
  import * as animationData from '../../assets/loader.json'
  import * as soundData from '../../assets/volume_shaker.json'

  const StepNames = ['Criar Batalha', 'Inscrever Usuários', 'Batalhar!']


  export default {

    components : {Bracket, fab, ModalConfirm, Lottie, ModalUserForm,Stepper},

    data () {
      return {

        defaultOptions  : {animationData: animationData},
        soundOptions    : {animationData: soundData},
        battle          : null,
        battleName      : '',
        battleDesc      : '',
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

      this.axios.get(API_URL + '/battle/get-latest-battle').then(response => {
        if(response.data.data.length === 0 || !response.data.data[0].active ) {
          this.loading = false;
          return;
        }

        this.stepNumber = 2;
        this.battle   = response.data.data[0]
        this.brackets = response.data.data[0].brackets
        this.showBracket = true
        this.loading = false
      })

    },

    methods : {

      quitBattle(){
        this.axios.put(API_URL + '/battle/end-battle', {
          'battle_id': this.battle._id,
          'winner_id': null
        }).then(response => {
          console.log(response)
        })

        this.$router.push('/')
      },

      createBattle(){
        this.loading = true;

        this.axios.get(API_URL + '/user/get-all-users').then(response=>{
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

        this.axios.get(API_URL + '/user/get-all-users').then(response=>{
          this.loading = false;
          this.users = response.data.data
          this.users = this.users.reverse()
        })
      },

      /*  DEPRECATED !!!!!!!!!!!! */
    //   setWinner(data) {
    //     console.log(data)
    //     let request = {
    //       battle_id : this.battle._id,
    //       round_id  : data.round._id[0],
    //       user_id   : data.person[0]._id
    //     }
    //     let scope = this
      //
    //     this.axios.post(API_URL + '/battle/update-battle', request).then(response => {
    //       this.current.rounds = response.data.data.rounds
    //       this.current.round  = response.data.data.round
    //       this.current.stage  = response.data.data.name
    //       console.log(this.current)
    //     }).catch( err => {
    //       console.log(err)
    //     })
    //   },

      newUser() {
        this.showModalForm = true
      },

      listUsers() {
        alert('listing users')
      },

      sendUsersSubscribed(){

        this.loading = true

        let battle = {
            'name': this.battleName,
            'description': this.battleDesc,
            'usersSubscribed': this.usersSubscribed
        }


        this.axios.post(API_URL + '/battle/make-battle', battle).then(response => {
            console.log(response.data)
          this.battle      = response.data.data
          this.brackets    = response.data.data.brackets
          this.showBracket = true
          this.loading     = false
          this.stepNumber = 2
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
