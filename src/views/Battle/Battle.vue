<template>
    <div>
        <div class="column is-half is-offset-2">
            <el-steps :space="350" :active="1" style="color: black">
                <el-step title="Batalha" icon="plus">asdasd</el-step>
                <el-step title="Sorteio" icon="search"></el-step>
                <el-step title="Chaves" icon="share"></el-step>
            </el-steps>

            <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="State Abbreviations"
                v-model="value2"
                :data="users">
              </el-transfer>
        </div>



            <!-- <content-navbar /> -->
            <!-- <main id="tournament">
            <bracket
                  v-if="!loading"
                  :rounds-number="firstStage.length"
                  :first-round = "firstStage"
                  v-on:getWinner="showWinner">

                </bracket>
            </main> -->


    </div>

</div>

</template>

<script>

import Bracket from '../Components/Bracket.vue'
import fab from 'vue-fab'

export default {

    components : {Bracket, fab},

    data () {
        return {
            firstStage      : [],
            users           : [],
            loading         : true,
            total_rounds    : 0,

        }
    },

    mounted(){
        let scope = this;

        this.axios.get('/api/bracket/make-battle').then(response => {
            scope.firstStage = response.data.brackets.first_stage
            console.log(response.data)

        })

        this.axios.get('/api/user/get-all-users').then(response=>{
            scope.users = response.data.data
            scope.loading = false
        })

    },

    methods : {


        newUser() {
            alert('creating new user')
        },

        listUsers() {
            alert('listing users')
        },

        showWinner(data){
            console.log(data)
        }

    }
}
</script>

<style scoped lang="scss">

.fab-button {
    padding-top: 10em;
}

i :hover {
    color: black;
}
/*
*  General Styles
*/


</style>
