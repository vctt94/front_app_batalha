<template>
  <div class="main">

    <div v-for="j in jTotal" >

      <div v-for="i in iTotal">


        <div
          v-if="!loading && matriz[j-1][i-1]">
            <!--{{j-1}}{{i-1}}-->
            <ul :class="['round round-'+j, j==jTotal ? 'is-last' : '']" style="min-height: 10em; ">

              <li class="spacer">&nbsp;</li>

              <i v-if="j==jTotal" class="fa fa-trophy"></i>
              <li class="game game-top winner">MC 1 <span>79</span></li>

              <li class="game game-spacer" >&nbsp;</li>

              <li class="game game-bottom ">MC 2 <span>48</span></li>


              <li class="spacer">&nbsp;</li>
            </ul>

        </div>
        <div v-else style="min-height:10em"></div>

      </div>

    </div>

  </div>
</template>


<script>


  export default {


    props: [
      'roundsNumber'
    ],
    data () {
      return {
        firstStage: [],
        total_rounds: 0,
        matriz: [],
        loading: true,
        iTotal : 0,
        jTotal : 1,

      }
    },

    mounted(){

      this.iTotal = this.roundsNumber

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
      this.loading = false
    },

    methods : {

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

  .game{
  }

  .game.winner{
    font-weight:bold;
  }
  .game span{
    float:right;
  }


  .game-spacer{
    border-right:1px solid #aaa;
    min-height: 2em;

  }

  .game-top{ border-bottom:1px solid #aaa; }

  .game-bottom{
    border-top:1px solid #aaa;
  }

  .is-last{
    margin-top: 5em !important;

  }
  .round{
    width: 10em;
    display: flex;
    flex-direction:column;
    list-style:none;
    margin: 0;
  }
  .round .spacer{ flex-grow:1; }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow:.5; }

  .round .game-spacer{
    flex-grow:1;
  }


</style>
