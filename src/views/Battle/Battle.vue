<template>
    <div>
        <div v-if="loading">
            <lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>
        </div>
        <div v-else>

            <br /><br />
            <div v-if="!showBracket" class="column is-half is-offset-2">
                <div class="column is-offset-3">
                    <h2>Sorteio</h2>

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

            </div>
            <!-- <modal-confirm ></modal-confirm> -->
            <main id="tournament" class="column" style="padding-left: 10em;">
                <bracket
                v-if="showBracket"
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
import Lottie from '../../components/Lottie.vue';
import * as animationData from '../../assets/volume_shaker.json';

export default {

    components : {Bracket, fab, ModalConfirm, Lottie},

    data () {
        return {
            defaultOptions  : {animationData: animationData},
            firstStage      : [],
            users           : [],
            usersSubscribed : [],
            loading         : true,
            total_rounds    : 0,
            showBracket     : false,
            stepper         : 1,
            value2 : null

        }
    },
    mounted(){
        let scope = this;

        // this.axios.post(API_URL + '//battle/make-battle', users).then(response=>{
        //     scope.firstStage = response.data.data.brackets.first_stage
        //     console.log(scope.firstStage)
        // })


        this.axios.get(API_URL + '/user/get-all-users').then(response=>{
           scope.users = response.data.data
           scope.loading = false
       })

    },

    methods : {
        handleAnimation: function (anim) {
            this.anim = anim;
          },

        showWinner(v) {
            console.log(v)
        },

        newUser() {
            alert('creating new user')
        },

        listUsers() {
            alert('listing users')
        },

        sendUsersSubscribed(){
            let scope = this
            this.loading = true
            // let users = this.remakeUsersArray()

            this.axios.post(API_URL + '/battle/make-battle', this.usersSubscribed).then(response => {
                scope.firstStage  = response.data.data.brackets.first_stage
                console.log(scope.firstStage)
                scope.showBracket = true
                scope.loading       = false
                scope.stepper     = 2
            }).catch( err => {
                console.log(err)
            })
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
            if(this.usersSubscribed[index].virgin === undefined)
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
