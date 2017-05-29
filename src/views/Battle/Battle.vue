<template>
  <div >
	  <h1>2013 NCAA Tournament - Midwest Bracket</h1>
<main id="tournament">


			<div v-for="j in 7" style="padding-left: 5em">

					<div v-for="i in 4">
							<br />
							{{ i}} {{j}}
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
		total_rounds: 0
    }
  },

  mounted(){

	  this.axios.get('/api/bracket/make-bracket').then(response => {
	  	this.firstStage = response.data.data.first_stage
		// this.total_rounds =response.data.data.first_stage.length
	  })

	  console.log(this.firstStage)
  },

  methods : {

	  matrixLeft(i, j) {
		  

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
