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

      <create-battle v-if="status == 'creating' "></create-battle>

      <main id="tournament" v-if="status == 'battling' " class="column">
          <bracket
            :brackets      = "brackets"
            :battle        = "battle"
          />
        </main>
        <a class="button is-black" v-on:click="quitBattle">Finalizar Batalha</a>
    </div>

  </div>

</template>

<script>

  import {mapGetters} from 'vuex'
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
      Bracket, fab, ModalConfirm, Lottie, ModalUserForm,Stepper
    },

    mounted(){

      const numberOfSteps = 3;
      for(let i=0;i < numberOfSteps;i++){
        this.steps.push({number: i, name: StepNames[i]})
      }

      requestHelper.getLatestBattle().then(response => {
        this.loading = false
        if(response.data.data.length === 0 || !response.data.data[0].active ) {
          return;
        }
        this.battle   = response.data.data[0]
        this.brackets = response.data.data[0].brackets
      }).catch(err=>{
        this.loading = false
        console.log(err)
      })

    },

    data () {
      return {

        defaultOptions  : {animationData: animationData},
        soundOptions    : {animationData: soundData},
        brackets        : [],
        loading         : true,

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

    computed : {
      ...mapGetters(['battle']),

//      step(){
//        return this.battle.create.step
//      },
      status(){
        return this.battle.status
      }
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

</style>
