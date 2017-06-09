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
            <a class="button" @click="sendUsersSubscribed">Show usersSubscribed</a>
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


            <modal-confirm ></modal-confirm>
            <!-- <content-navbar /> -->
            <main v-if="firstStage.length != 0" id="tournament">
            <bracket
                  v-if="!loading"
                  :rounds-number="firstStage.length"
                  :first-round = "firstStage"
                  v-on:getWinner="showWinner">

                </bracket>
            </main>


    </div>

        </div>

</template>

<script>

import Bracket from '../Components/Bracket.vue'
import ModalConfirm from '../../components/ModalConfirm.vue'
import fab from 'vue-fab'

export default {

    components : {Bracket, fab, ModalConfirm},

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

        sendUsersSubscribed(){
            let scope = this

            let users = this.remakeUsersArray()

            this.axios.post('http://localhost:3000/battle/make-battle', users).then(response => {
                console.log(response.data)
                // scope.firstStage = response.data.brackets.first_stage

            }).catch( err => {
                console.log(err)
            })
        },

        remakeUsersArray() {
            let usersnew = []

            this.usersSubscribed.forEach(function(user) {
                let u = {
                    'created'    : user.created,
                    'email'      : user.email,
                    'gender'     : user.gender,
                    'modified'   : user.modified,
                    'name'       : user.name,
                    'user_level' : user.user_level,
                    'virgin'     : user.virgin,
                    '_id'        : user._id,
                    '_group'     : user._group
                }
                usersnew.push(u)
            });

            return usersnew
        },

        subscribe(user) {
            delete this.users[user._id]
            let index = this.usersSubscribed.indexOf(user)
            this.usersSubscribed.push(user)
        },

        unsubscribe(user) {
            let index = this.usersSubscribed.indexOf(user)
            this.usersSubscribed.splice(index, 1)
            this.users[user._id] = user
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
