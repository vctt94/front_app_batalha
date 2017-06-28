<template>
  <div class="main">
    <a class="button" @click="showRounds">showRounds</a>

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
            :class="[rounds[j-1][i-1].winner == 0 ? 'winner' : '' ]"
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
            :class="[rounds[j-1][i-1].winner == 1 ? 'winner' : '' ]"
        >
          <draggable :options="{group:{ name:'people',  pull:'clone'}}"
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
        <p>Vencedor PIK</p>

        <draggable :options="{group:{ name:'people',  pull:'clone'}}"
                     :list="rounds[j-1][i-1][0]"
                     v-on:clone = "battleWinner"
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
</template>


<script>

  import draggable from 'vuedraggable'

  export default {

    components: {
      draggable
    },

    props: {
      battle: {
        type: [Object, Array]
      },

      brackets: {
          type: [Object, Array]
      }

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
      }

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

      /**
       * emit data to parent
       * round starts in 0
       * person is array of people
       * game is the game position on the round
       */
      cloneWinner(j,i, position, evt){

        this.rounds[j][i].winner = position

        const winnerObj = this.rounds[j][i][position][0];

        let request = {
            battle_id : this.battle._id,
            round_id  : winnerObj.round_id,
            user_id   : winnerObj.person._id
        }

        this.axios.post(API_URL + '/battle/update-battle', request)

        if(j+1 === this.jTotal-1)
          this.battleWinner()

        this.rounds = Object.assign({}, this.rounds)
      },

      battleWinner(){
        console.log('winner')
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
  }
  .round{

    width: 10em;
    display: flex;
    flex-direction:column;
    list-style:none;
    margin: 0;
  }

  .spacer{
    flex-grow:0.555;
  }


  .round .game-spacer{
    flex-grow:1;
  }


  body{
    font-family:sans-serif;
    font-size:small;
    padding:10px;
    line-height:1.4em;
  }

  .game{
    padding-left:20px;
    margin:0;

  }

  .winner{
    font-weight:bold;
  }
  .game span{
    float:right;
    margin-right: 10px;
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
    min-height: 3em;
    min-width: 3em;
    margin: 0em;
    border : 1px solid #000000;
    color: #000000;
    font-size: 8pt
  }
  .game-content{
    float: left;
  }




</style>
