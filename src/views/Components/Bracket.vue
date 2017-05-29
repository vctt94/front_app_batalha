<template>
  <div class="main">

    <div v-for="j in jTotal" >

      <div v-for="i in iTotal">


        <div style=""  v-if="!loading && matriz[j-1][i-1]">
          <div style="padding-right:1em">
            <!--{{j-1}}{{i-1}}-->
            <ul :class="'round round-'+j">
              <li class="spacer">&nbsp;</li>

              <li class="game game-top winner">MC 1 <span>79</span></li>
              <li class="game game-spacer">&nbsp;</li>
              <li class="game game-bottom ">MC 2 <span>48</span></li>

              <li class="spacer">&nbsp;</li>
            </ul>
          </div>
        </div>
        <div v-else style="min-height: 2em;margin-top:8em"></div>

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
    padding:10px;
    line-height:1.4em;
  }
  .main{
    display:flex;
    flex-direction:row;
  }

  li.game{
    padding-left:20px;
  }

  li.game.winner{
    font-weight:bold;
  }
  li.game span{
    float:right;
    margin-right:5px;
  }

  li.game-top{ border-bottom:1px solid #aaa; }

  li.game-spacer{
    border-right:1px solid #aaa;
    min-height:40px;
  }

  li.game-bottom{
    border-top:1px solid #aaa;
  }

  .round{
    display:flex;
    width: 10em;
    flex-direction:column;
    justify-content:center;
    list-style:none;
    padding: 0;
    margin: 0;
  }
  .round .spacer{ flex-grow:1; }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow:.5; }

  .round .game-spacer{
    flex-grow:1;
  }

</style>
