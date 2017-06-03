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
                     :move="cloneWinner"
                     :list="rounds[j-1][i-1]"
                     class="square"
          >

            <div class="game-content" v-for="data in rounds[j-1][i-1]"
                 v-if="data.firstPerson">
              {{data.firstPerson.name}}
            </div>
            <div v-else>
              <!--{{data}}-->

            </div>

          </draggable>
        </li>

        <li class="game game-spacer" >&nbsp;</li>

        <li class="game game-bottom" >
          <draggable :options="{group:{ name:'people',  pull:'clone'}}"
                     :move="cloneWinner"
                     :list="rounds[j-1][i-1]"
                     class="square"
          >

            <div class="game-content" v-for="data in rounds[j-1][i-1]"
                 v-if="data.secondPerson">
              {{data.secondPerson.name}}
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

  </div>
</template>


<script>

  import draggable from 'vuedraggable'

  export default {

    components: {
      draggable
    },

    props: {
      roundsNumber : {
        type : Number
      },
      firstRounds : {
        type: Array
      }
    },
    data () {
      return {
        loading: true,
        matriz: [],

        game   : {
          firstPerson  : null,
          secondPerson : null
        },

        round : [],

        rounds : [],

        battle : [],

        iTotal : 0,
        jTotal : 1,
        options : {
          clone : true
        }

      }
    },

    watch : {
      mData(){
      }
    },

    mounted(){

      this.iTotal = this.roundsNumber

      const scope = this;

      for(let i=0;i<this.firstRounds.length;i++){
        let data = {
          firstPerson : this.firstRounds[i].first,
          secondPerson : this.firstRounds[i].second
        }
        this.round.push(data);
      }

      this.initMatrix();
      this.initMatrixData();

      this.loading = false
    },

    methods : {

      initMatrix(){

        let n = 0;
        let k = 0;
        let iTotalBefore = this.iTotal

        let fBegin;
        let fFinal;

        let i,j

        let tempITotal = this.iTotal;

        while(tempITotal > 1){
          tempITotal /= 2
          this.jTotal++;
        }

        for(j=0; j< this.jTotal;j++){

          this.matriz[j] = []

          fBegin = parseInt(k)
          fFinal = parseInt(this.iTotal - k)

          for(i = fBegin; i < fFinal ; i++){
            this.matriz[j][i] = true
          }
          k += (iTotalBefore/4)
          iTotalBefore = iTotalBefore/2

        }
      },

      initMatrixData(){
        for(let j=0;j<this.jTotal;j++){
          this.rounds[j] = []
          for(let i=0;i< this.iTotal;i++){
            if(this.matriz[j][i]){
              if(j===0) {
//                console.log(this.round[i])
                this.rounds[0][i] = [this.round[i]]
              }
              else
                this.rounds[j][i] = [this.game]
            }
          }
        }
//        console.log(this.rounds)
      },

      cloneWinner(evt){
        console.log(evt)
        console.log(this.mData)
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
