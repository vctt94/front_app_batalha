<template>
  <form>
    <h2 class="title is-2">Batalha !</h2>

    <div class="field ">
      <label class="label">Nova Saga</label>
      <input class="input  " type="text" placeholder="ex.: Nº 42" v-model="create.name">
    </div>

    <div class="field ">
      <label class="label">Descrição</label>
      <textarea class="textarea" placeholder="convidados especiais, evento, acontecimento inédito ..." v-model="create.description"></textarea>
    </div>

    <a class="button is-large is-orange" @click="nextStep(create)">Escolher Participantes</a>
  </form>
</template>

<script>

  import {mapGetters,mapMutations} from 'vuex'
  import {INCREMENT_CREATE_STEP, SET_BATTLE_NAME, SET_BATTLE_DESCRIPTION} from '../../store/mutations'

  export default {
    mounted(){
      console.log(this.battle)
    },

    data(){
      return{
        create:{
          name: null,
          description: null
        }
      }
    },

    computed: {
      ...mapGetters({
        battle: 'battle'
      })
    },
    methods:{
      ...mapMutations({
        incrementStep: INCREMENT_CREATE_STEP,
        setBattleName: SET_BATTLE_NAME,
        setBattleDescription: SET_BATTLE_DESCRIPTION,
      }),
      nextStep(create){
        this.setBattleName(create);
        this.setBattleDescription(create);
        this.incrementStep();
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
