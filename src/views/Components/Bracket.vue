<template>
  <div class="main">
    <ul
      v-for="j in jTotal"
      :class="['round round-'+j, j==jTotal ? 'is-last' : '']"
    >
      <h4 class="title">Round {{j}}</h4>

      <template v-for="i in iTotal"
                v-if="!loading && matriz[j-1][i-1]"
      >


        <li class="spacer">&nbsp;</li>

        <li class="game game-top" >
          <draggable :options="{group:{ name:'people',  pull:'clone'}}"
                     :list="rounds[j-1][i-1]"
                     :move="cloneWinnerTop"
                     class="square"
          >

            <div class="game-content" v-for="data in rounds[j-1][i-1][0]"
                 v-if="data"
            >
              {{data.name}}
            </div>

          </draggable>
        </li>

        <li class="game game-spacer" >&nbsp;</li>

        <li class="game game-bottom" >
          <draggable :options="{group:{ name:'people',  pull:'clone'}}"
                     :move="cloneWinnerBottom"
                     :list="rounds[j-1][i-1]"
                     class="square"
          >

            <div class="game-content" v-for="data in rounds[j-1][i-1][1]"
                 v-if="data">
              {{data.name}}
            </div>
            <div v-else>
              <!--{{data}}-->

            </div>

          </draggable>
        </li>


        <!--<li class="game game-bottom">-->
        <!--<draggable :options="{group:{ name:'people',  pull:'clone'}}" :move="cloneWinner" :list="mData[j-1][i-1].second" >-->
        <!--<div class="game-content" v-for="data in mData[j-1][i-1]"-->
        <!--v-if="data.second">{{data.second.name}}</div>-->
        <!--<div v-else class="square">Arraste para ca</div>-->
        <!--</draggable>-->
        <!--</li>-->


      </template>

      <li class="spacer">&nbsp;</li>
    </ul>
    <a v-on:click="showRounds">show rounds</a>
  </div>
</template>


<script>

  import draggable from 'vuedraggable'

  export default {

    components: {
      draggable
    },

    props: {
      roundsNumber: {
        type: Number
      },
      firstRounds: {
        type: Array
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

        battle: [],

        iTotal: 0,
        jTotal: 1,

        currentRound: 0,

        options: {
          clone: true
        }


      }
    },

    computed : {
//      rounds(){
//        let rounds = []
//        for (let j = 0; j < this.jTotal; j++) {
//          rounds[j] = []
//          for (let i = 0; i < this.iTotal; i++) {
//
//            if (this.matriz[j][i]) {
//              const data = {
//                firstPerson: null,
//                secondPerson: null,
//                j: j,
//                i: i
//              }
//              rounds[j][i] = [data]
//            }
//
//          }
//        }
//        return rounds
//      },
      matriz (){
        let matriz = []
        let k = 0;

        let tempITotal = this.iTotal;

        let iTotalBefore = this.iTotal

        while (tempITotal > 1) {
          tempITotal /= 2
          this.jTotal++;
        }
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

      this.iTotal = this.roundsNumber

      const scope = this;

      this.initMatrixData();

      this.drawStage(0,this.firstRounds);

      this.loading = false
    },

    methods: {

      onUpdate(evt){
        console.log(evt)
      },


      initMatrixData(){
        for (let j = 0; j < this.jTotal; j++) {
          this.rounds[j] = []
          for (let i = 0; i < this.iTotal; i++) {

            if (this.matriz[j][i]) {
              const data = {
                firstPerson: null,
                secondPerson: null,
                j: j,
                i: i
              }
              this.rounds[j][i] = []
            }

          }
        }
      },

      drawStage(roundNumber, rounds){
        const j = roundNumber

        let tempJ;
        let tempI

        for(let i=0;i<this.firstRounds.length;i++){
          for(let k=0;k<this.rounds[j][i].length;k++){

            if(this.rounds[j][i][k].j !== undefined)
              tempJ = this.rounds[j][i][k].j

            if(this.rounds[j][i][k].i !== undefined)
              tempI = this.rounds[j][i][k].i
          }
          let data = {
            firstPerson : rounds[i].first,
            secondPerson : rounds[i].second,
            j  : tempJ,
            i  : tempI
          }
          this.rounds[j][i][0] = [data.firstPerson];
          this.rounds[j][i][1] = [data.secondPerson];
        }

      },

      showRounds(){
        console.log(this.rounds)
      },
      cloneWinnerTop(evt){
        console.log(evt)
        console.log(this.rounds)
//        const first = evt
//        const j = evt.draggedContext.element.j
//        const i = evt.draggedContext.element.i
//        const n = this.matriz[j].length
//
//        const futureJ = j+1;
//        const futureI = (n/4)+i;

//        let firstPerson, secondPerson
//
//
//        for(let data of this.rounds[j][i].firstPerson){
//          if(data !== undefined)
//            firstPerson = data;
//
//        }
//
//        this.rounds[futureJ][futureI] = {
//          firstPerson : firstPerson,
//          secondPerson : null,
//          j : futureJ,
//          i : futureI
//        }
        this.rounds = Object.assign({}, this.rounds)

      },

      cloneWinnerBottom(evt){
//        console.log('bottom')
//        console.log(evt)
//        console.log(this.rounds)
//        this.rounds = Object.assign({},this.rounds)


      },


    }
  }
</script>

<style scoped lang="scss">

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
    flex-grow:1;
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

  .game.winner{
    font-weight:bold;
  }
  .game span{
    float:right;
    margin-right:5px;
  }

  .game-top{
    border-bottom:1px solid #aaa;
  }

  .game-spacer{
    border-right:1px solid #aaa;
    min-height:40px;
  }

  .game-bottom{
    border-right: 1px solid #aaa;
    border-bottom:1px solid #aaa;
  }

  .is-last{
    /*margin-top: 5em !important;*/

  }
  .square{
    min-height: 2em;
    min-width: 2em;
    margin: 0em;
    border : 1px solid #aaa;
    color: #aaa;
    font-size: 8pt
  }
  .game-content{
    float: left;
  }




</style>
