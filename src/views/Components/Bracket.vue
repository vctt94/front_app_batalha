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

        <li class="game game-top"
            v-if="mData[j-1][i-1][0].first"
        >
          <draggable :options="{group:'people'}" :move="cloneWinner" :list="mData[j-1][i-1]" >
            <div class="game-content" v-for="data in mData[j-1][i-1]">{{data.first.name}}</div>
          </draggable>
        </li>
        <li class="game game-top"
            v-else
        >
          <draggable :list="mData[j-1][i-1]"  :options="{group:'people'}">
            <div class="square" v-for="data in mData[j-1][i-1]">{{data}}</div>
          </draggable>
        </li>

        <li class="game game-spacer" >&nbsp;</li>

        <li class="game game-bottom"
            v-if="mData[j-1][i-1][0].second"
        >
          <draggable :optins="options" v-model="mData[j-1][i-1]" :options="{group:'people'}">
            <div class="game-content">{{mData[j-1][i-1][0].second.name}}</div>
          </draggable>
        </li>
        <li class="game game-bottom"
            v-else>
          <draggable v-model="mData[j-1][i-1]" :options="{group:'people'}">
            <div class="square"></div>
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
      roundsNumber : {
        type : Number
      },
      firstRound : {
        type: Array
      }
    },
    data () {
      return {
        loading: true,
        matriz: [],
        mData : [],
        iTotal : 0,
        jTotal : 1,
        options : {

          clone : true
        }

      }
    },

    mounted(){

      this.iTotal = this.roundsNumber

      this.initMatrix();

      console.log(this.mData)
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
          this.mData[j]  = []

          fBegin = parseInt(k)
          fFinal = parseInt(this.iTotal - k)

          for(i = fBegin; i < fFinal ; i++){
            if(j === 0) {
              this.matriz[j][i] = this.firstRound[n]
              this.mData[j][i]  = []
              this.mData[j][i].push(this.firstRound[n])
              n++;
            }
            else {
              this.matriz[j][i] = true
              this.mData[j][i] = []
              this.mData[j][i].push([])
            }
          }
          k += (iTotalBefore/4)
          iTotalBefore = iTotalBefore/2

        }
      },

      cloneWinner(){
        console.log(this.mData)
      }

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
    margin: 0.2em;
    margin-right: 1em;
    border : 1px solid #aaa;
  }
  .game-content{
    float: left;
  }




</style>
