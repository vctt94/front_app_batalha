<template>
  <div >
    <h1>2013 NCAA Tournament - Midwest Bracket</h1>
    <main id="tournament">


      <div v-for="j in jTotal" >

        <div v-for="i in iTotal">
          <br />
          <div v-if="!loading && matriz[j-1][i-1]">
            <div style="padding-right:1em">
              <!--{{j-1}}{{i-1}}-->
              <ul :class="'round round-'+j">
                <li class="spacer">&nbsp;</li>

                <li class="game game-top winner">asd <span></span></li>
                <li class="game game-spacer">&nbsp;</li>
                <li class="game game-bottom ">asd <span></span></li>

                <li class="spacer">&nbsp;</li>
              </ul>
            </div>

          </div>
        </div>
      </div>


    </main>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        firstStage: [],
        total_rounds: 0,
        matriz: [],
        loading: true,
        iTotal : 8,
        jTotal : 1,

      }
    },

    mounted(){
//
//      this.axios.get('/api/bracket/make-bracket').then(response => {
//        this.firstStage = response.data.data.first_stage
//        console.log(this.firstStage)
//        // this.total_rounds =response.data.data.first_stage.length
//      })

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

      matriz(i, j) {
        //   for()

      }
    }
  }
</script>

<style scoped lang="scss">
  /*
   *  Flex Layout Specifics
  */
  main{
    display:flex;
    flex-direction:row;
  }
  .round{
    display:flex;
    flex-direction:column;
    justify-content:center;
    width:200px;
    list-style:none;
    padding:0;
  }
  .round .spacer{ flex-grow:1; }
  .round .spacer:first-child,
  .round .spacer:last-child{ flex-grow:.5; }

  .round .game-spacer{
    flex-grow:1;
  }

  /*
   *  General Styles
  */
  body{
    font-family:sans-serif;
    font-size:small;
    padding:10px;
    line-height:1.4em;
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

</style>
