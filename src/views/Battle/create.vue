<template>
  <div>
    <battle-form v-if="step == 0"></battle-form>
    <subscribe-users v-if="step == 1"></subscribe-users>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import Form from './form.vue'
  import SubscribeUsers from './subscribeUsers.vue'

  export default {
    name: "battle-create",
    components : {
      battleForm: Form,
      SubscribeUsers
    },
    mounted(){
      console.log(this.battle)
    },
    computed: {
      ...mapGetters(['battle']),
      step(){
        return this.battle.create.step
      }
    },
    data(){
      return{

      }
    }
  }

</script>

<style scoped lang="scss">

</style>
