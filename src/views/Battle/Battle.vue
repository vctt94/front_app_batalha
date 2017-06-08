<template>
    <div>
        <br /><br />
        <div class="column is-half is-offset-2">
            <div class="column is-offset-3">
                <el-steps :space="350" :active="1" style="color: black">
                    <el-step title="Sorteio" icon="search"></el-step>
                    <el-step title="Chaves" icon="share"></el-step>
                </el-steps>

            </div>
            <a class="button" @click="showSubscribeds">Show usersSubscribed</a>
            <br /><br />
          <div class="columns" style="padding-top: 2em" >
             <div class="column is-two-thirds">
                  <table class="table">
                      <thead>
                          <tr>
                             <th>nome MC</th>
                         </tr>
                     </thead>
                     <tfoot>

                     </tfoot>
                     <tbody>

                         <tr v-for="user in users" v-if="user">

                             <td>
                                  {{user.name}}
                              </td>
                              <td >
                                 <a class="btn" @click="subscribe(user)"><i class="fa fa-arrow-right blackhover" style="color: grey" aria-hidden="true"></i></a>
                              </td>
                          </tr>
                      </tbody>

                  </table>
              </div>
             <div class="column is-two-thirds is-offset-2">
                 <table class="table">
                     <thead>
                         <tr>
                             <th>na disputa !</th>
                             <th>
                                 estreiante?
                             </th>
                         </tr>
                     </thead>
                     <tfoot>

                     </tfoot>
                     <tbody>
                         <tr v-for="user in usersSubscribed">
                             <td>
                                <a class="btn" @click="unsubscribe(user)"><i class="fa fa-arrow-left blackhover" style="color: grey" aria-hidden="true"></i></a>
                                &nbsp&nbsp
                                &nbsp&nbsp
                                &nbsp&nbsp
                                 {{user.name}}
                             </td>
                             <td>
                                    <a @change="setVirgin(user)"><el-checkbox></el-checkbox></a>
                             </td>
                         </tr>
                     </tbody>
                 </table>
              </div>
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
            usersSubscribed : [],
            loading         : true,
            total_rounds    : 0,
            value2 : null

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

        showSubscribeds(){
            console.log(this.usersSubscribed)
        },

        subscribe(user) {
            if(this.usersSubscribed.indexOf(user) == -1)
                this.usersSubscribed.push(user)
        },

        unsubscribe(user) {
            let index = this.usersSubscribed.indexOf(user)
            this.usersSubscribed.splice(index, 1)
        },

        setVirgin(user) {
            let index = this.usersSubscribed.indexOf(user)
            if(this.usersSubscribed[index].virgin == undefined)
                this.usersSubscribed[index].virgin = true
            else
                this.usersSubscribed[index].virgin = !this.usersSubscribed[index].virgin

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

a :hover {
    color: black;
}

.blackhover {
    color: black;

}

.box {
    width: 320px;
    padding: 10px;
    border: 5px solid gray;
    margin: 0;
}
/*
*  General Styles
*/


</style>
