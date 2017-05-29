<template>
  <div>
    <div v-for="j in jTotal" >

        <div v-for="i in iTotal">
          <br>
          <div v-if="!loading && matriz[j-1][i-1]">
              {{j-1}}{{i-1}}
          </div>
        </div>


    </div>
  </div>

</template>


<script>


  export default {


    props: [
      'roundTotal'
    ],
    data () {
      return {
        firstStage: [],
        total_rounds: 0,
        matriz: [],
        loading: true,
        iTotal : 8,
        jTotal : 8,

      }
    },

    mounted(){

//      this.iTotal = this.roundTotal

      let k = 0;
      let iTotalBefore = this.iTotal

      let fBegin;
      let fFinal;

      let i,j

      for(j=0;j<this.iTotal;j++) {
        this.matriz[j] = []
        for (i = 0; i < this.jTotal; i++) {
          this.matriz[j][i] = true;
        }
      }
//
//      let tempITotal = this.iTotal;
//
//      while(tempITotal > 1){
//        tempITotal /= 2
//        this.jTotal++;
//      }
//
//      for(j=0; j< this.jTotal;j++){
//
//        this.matriz[j] = []
//
//        fBegin = parseInt(k)
//        fFinal = parseInt(this.iTotal - k)
//
//        for(i = fBegin; i < fFinal ; i++){
//          this.matriz[j][i] = true
//        }
//        k += (iTotalBefore/4)
//        iTotalBefore = iTotalBefore/2
//      }
      this.loading = false
    },

    methods : {

    }
  }
</script>
