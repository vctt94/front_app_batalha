<template>
  <div class="main">
    <ul
      v-for="j in jTotal"
      :class="['round round-'+j, j==jTotal ? 'is-last' : '']"
    >
      <h4 class="title">Round {{j}}</h4>

      <template v-for="i in iTotal"
                v-if="!loading && matriz[j-1][i-1]"
                class="test"
      >
        <li class="spacer">&nbsp;</li>

        <li class="game game-top"
            v-if="matriz[j-1][i-1].first"
        >
          {{matriz[j-1][i-1].first.name}} <span></span></li>
        <li class="game game-top"
            v-else>
        </li>

        <li class="game game-spacer" >&nbsp;</li>

        <li class="game game-top"
            v-if="matriz[j-1][i-1].second"
        >
          {{matriz[j-1][i-1].second.name}} <span></span></li>
        <li class="game game-top"
            v-else>
        </li>

      </template>

      <li class="spacer">&nbsp;</li>
    </ul>

  </div>
</template>


<script>


  export default {


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
        iTotal : 0,
        jTotal : 1,

      }
    },

    mounted(){

      this.iTotal = this.roundsNumber

      this.initMatrix();

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
            if(j === 0)
              this.matriz[j][i] = this.firstRound[n++]
            else
              this.matriz[j][i] = true
          }
          k += (iTotalBefore/4)
          iTotalBefore = iTotalBefore/2

        }
      }

    }
  }
</script>

<style scoped lang="scss">

  body{
    font-family:sans-serif;
    font-size:small;
    line-height:1.4em;
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
    flex-grow:1;
  }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow:.5; }

  .round .game-spacer{
    flex-grow:1;
  }

  .game{
  }

  .game-spacer{
    border-right:1px solid #aaa;
    min-height: 2em;
  }

  .game.winner{
    font-weight:bold;
  }
  .game span{
    float:right;
  }

  .game-top{ border-bottom:1px solid #aaa; }

  .game-bottom{
    border-top:1px solid #aaa;
  }

  .is-last{
    /*margin-top: 5em !important;*/

  }




</style>
