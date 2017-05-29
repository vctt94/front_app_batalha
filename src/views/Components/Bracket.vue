<template>
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
</template>
