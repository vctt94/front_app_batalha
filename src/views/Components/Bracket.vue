<template>
  <div>
    <div class="main">

      <ul
        v-for="j in jTotal"
        v-if="!loading"
        :class="['round round-'+j, j==jTotal ? 'is-last' : '']"
      >
        <h4 v-if="j == 1" class="title">Primeira Etapa</h4>
        <h4 v-if="j == 2" class="title">Quartas</h4>
        <h4 v-if="j == 3" class="title">Semis</h4>
        <h4 v-if="j == 4" class="title">Final</h4>

        <template v-for="i in iTotal"
                  v-if="matriz[j-1][i-1] && j!= jTotal"
        >
          <li class="spacer">&nbsp;</li>

          <li class="game game-top"
              :class="[rounds[j-1][i-1].winner == 0 ? 'winner' : '', j-1 == 0 ? 'no-border' : '' ]"
          >
            <draggable :options="{group:{ name:'people',  pull:'clone'}}"
                       :list="rounds[j-1][i-1][0]"
                       v-on:clone = "cloneWinner(j-1,i-1, 0, $event)"
                       class="square"
            >
              <div class="game-content" v-for="data in rounds[j-1][i-1][0]"
                   v-if="data.person"
              >
                <p class="player-style">
                  &nbsp&nbsp{{data.person.name}}
                </p>
              </div>

            </draggable>
          </li>

          <li class="game game-spacer" >&nbsp;</li>

          <li class="game game"
              :class="[rounds[j-1][i-1].winner == 2 ? 'winner' : '' ]"
              v-if="rounds[j-1][i-1][2]"
          >
            <draggable :options="{group:{ name:'people',  pull:'clone'}}"
                       v-on:clone="cloneWinner(j-1,i-1, 2, $event)"
                       :list="rounds[j-1][i-1][2]"
                       class="square"
            >

              <div class="game-content" v-for="data in rounds[j-1][i-1][2]"
                   v-if="data.person">
                <p class="player-style">
                  &nbsp&nbsp{{data.person.name}}
                </p>
              </div>

            </draggable>
          </li>

          <li class="game game-spacer" v-if="rounds[j-1][i-1][2]">&nbsp;</li>

          <li class="game game-bottom"
              :class="[ j-1 == 0 ? 'no-border' : '']"
          >
            <draggable :options="{group:{ name:'people',  pull:'clone'}}"
                       :class="rounds[j-1][i-1].winner == 1 ? 'winner' : ''"
                       v-on:clone="cloneWinner(j-1,i-1, 1, $event)"
                       :list="rounds[j-1][i-1][1]"
                       class="square"
            >
              <div class="game-content" v-for="data in rounds[j-1][i-1][1]"
                   v-if="data.person">
                <p class="player-style">
                  {{data.person.name}}
                  &nbsp&nbsp
                </p>
              </div>

            </draggable>
          </li>

        </template>

        <template
          v-else-if="matriz[j-1][i-1] && j == jTotal"
        >
          <li class="spacer">&nbsp;</li>

          <li class="game game-top">
            <p><i class="fa fa-trophy"></i></p>

            <draggable :options="{group:{ name:'people',  pull:'clone'}}"
                       :list="rounds[j-1][i-1][0]"
                       v-on:clone = ""
                       class="square"
            >

              <div class="game-content" v-for="data in rounds[j-1][i-1][0]"
                   v-if="data"
              >
                <p class="player-style">
                  &nbsp&nbsp{{data.person.name}}
                </p>
              </div>

            </draggable>
          </li>

        </template>

        <li class="spacer">&nbsp;</li>
      </ul>
    </div>

    <a class="button is-black" v-on:click="finishBattle">Finalizar Batalha</a>

  </div>
</template>


<script>

  import {mapGetters, mapActions} from 'vuex'
  import draggable from 'vuedraggable'
  import requestHelper from '../../utils/requestHelper'

  export default {

    components: {
      draggable
    },

    data () {
      return {
        loading: true,

        game: {
          firstPerson: null,
          secondPerson: null,
          j: null,
          i: null
        },

        round: [],

        rounds : [],

        iTotal: 0,
        jTotal: 1,

        currentRound: 0,

        options: {
          clone: true
        }


      }
    },

    computed : {
      ...mapGetters({
        battle: 'battle'
      }),

      matriz (){
        let matriz = []
        let k = 0;

        let tempITotal = this.iTotal;

        let iTotalBefore = this.iTotal

        while (tempITotal > 1) {
          tempITotal /= 2
          this.jTotal++;
        }
        //adding final round winner
        this.jTotal++;

        for (let j = 0; j < this.jTotal; j++) {

          matriz[j] = []

          let fBegin = parseInt(k)
          let fFinal = parseInt(this.iTotal - k)

          for (let i = fBegin; i < fFinal; i++) {
            matriz[j][i] = true
          }
          k += (iTotalBefore / 4)
          iTotalBefore = iTotalBefore / 2

        }

        return matriz;
      },
      brackets(){
        return this.battle.brackets;
      },

    },

    mounted(){

      this.iTotal = this.battle.brackets.first_stage.length
      this.initMatrixData();

      this.drawStage(0, this.battle.brackets.first_stage)
      this.drawStage(1, this.battle.brackets.quarter_final)
      this.drawStage(2, this.battle.brackets.semi_final)
      this.drawStage(3, this.battle.brackets.finale)

      this.loading = false
    },

    methods: {
      ...mapActions({
        quitBattle: 'quitBattle'
      }),

      initMatrixData(){

        for (let j = 0; j < this.jTotal; j++) {
          this.rounds[j] = []
          for (let i = 0; i < this.iTotal; i++) {

            if (this.matriz[j][i]) {
              this.rounds[j][i] = []
              this.rounds[j][i][0] = []
              this.rounds[j][i][1] = []
            }

          }
        }

      },

      drawStage(roundNumber, rounds){

        const j = roundNumber

        let k = 0;
        let is3People = false;

        for(let i=0;i<this.iTotal;i++){

          if(this.matriz[j][i]) {
            if(!rounds[k])
              break;

            let firstPerson = {
              round_id: rounds[k]._id,
              person: rounds[k].first ? rounds[k].first : '',
            };
            let secondPerson = {
              round_id: rounds[k]._id,
              person: rounds[k].second ? rounds[k].second : '',
            };
            let thirdPerson = {
              round_id: rounds[k]._id,
              person: rounds[k].third ? rounds[k].third : '',
            };

            if (rounds[k].third) {
              is3People = true;
              this.rounds[j][i][0]  = [firstPerson];
              this.rounds[j][i][1]  = [secondPerson];
              this.rounds[j][i][2]  = [thirdPerson];
            }

            else {
              this.rounds[j][i][0]  = [firstPerson];
              this.rounds[j][i][1]  = [secondPerson];

            }
            k++;
          }
        }


        // set third person in all games of round so they have same size and flex grow, grow right
        if(is3People) {
          for (let i = 0; i < rounds.length; i++) {
            if(!this.rounds[j][i][2])
              this.rounds[j][i][2] = []
          }
        }

      },
      showRounds(){
        console.log(this.rounds)
      },

      finishBattle(){
        console.log(this.battle)
        this.quitBattle(this.battle.id)
        this.$router.push('/')
      },

      /**
       * emit data to parent
       * round starts in 0
       * person is array of people
       * game is the game position on the round
       */
      cloneWinner(j,i, position, evt){

        this.rounds[j][i].winner = position

        const winnerObj = this.rounds[j][i][position][0];

        if(j+1 === this.jTotal-1)
          this.setBattleWinner(this.battle._id,winnerObj.person._id)
        else
          this.updateBattle(this.battle._id,winnerObj)

        this.rounds = Object.assign({}, this.rounds)
      },

      updateBattle: function (battleId, winnerObj) {
        const request = {
          battle_id : this.battle._id,
          round_id  : winnerObj.round_id,
          user_id   : winnerObj.person._id
        }
        requestHelper.updateBattle(JSON.stringify(request)).then(response=>{
          const round = response.data.data.round
          winnerObj.round_id = round._id
        }).catch(err=>{
          console.log(err)
        })
      },
      setBattleWinner(battleId,userId){
        const request = {
          battle_id : battleId,
          user_id   : userId
        }
        requestHelper.updateBattleWinner( JSON.stringify(request) ).then(response=>{
          console.log(response)
        }).catch(err=>{
          console.log(err)
        })
      }

    }
  }
</script>

<style scoped lang="scss">

  .player-style {
    font-size: 15px;
  }

  .main{
    display:flex;
    flex-direction:row;
    margin-left: 2em;
  }
  .round{
    width: 10em;
    display: flex;
    flex-direction:column;
    list-style:none;
    margin: 0;
  }

  .spacer{
    flex-grow:.8;
  }


  .round .game-spacer{
    flex-grow:1;
  }

  .no-border{
    border:0 !important;
  }

  body{
    font-family:sans-serif;
    font-size:small;
    padding:10px;
    line-height:1.4em;
  }

  .game{
    padding-left:10px;
    margin: 0;
  }

  .winner{
    font-weight:bold;
  }
  .game span{
    float:right;
    margin-right: 15px;
  }

  .game-top{
    border-bottom: 0.5px solid #000000;
  }

  .game-spacer{
    border-right:1px solid #000000;
    min-height:40px;
  }

  .game-bottom{
    border-right: 1px solid #000000;
    border-bottom:1px solid #000000;
  }

  .is-last{
    /*margin-top: 5em !important;*/

  }
  .square{
    min-height: 4em;
    width: 150px;
    box-shadow: 5px 5px #afafaf;
    border-radius: 5%;
    background: #efefef;
    margin: 0 !important;
    border-bottom : 1px solid #000000;
    border-right : 1px solid #000000;
    color: #000000;
    padding: 1em;
    font-size: 8pt
  }
  .game-content{
    float: left;
  }




</style>
