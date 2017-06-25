<template>
    <div>
        <modal-user-form
        :show       = "showModalForm"
        :edit       = "false"
        v-on:submit = "showModalForm = false"
        v-on:close  = "closeModal"
        ></modal-user-form>

        <div v-if="loading" class="column"  style="padding-botton: 100em;">
            <lottie :options="defaultOptions" :height="500" :width="500" v-on:animCreated="handleAnimation"/>
        </div>
        <div v-else>

            <br /><br />
            <div v-if="!showBracket" class="column is-half is-offset-2">

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

                <fab
                bg-color="#0e2449"
                position="top-right"
                :actions="actions"
                @newUser="newUser"
                @listUsers="listUsers"
                style="padding-top: 2em"
                />

            </div>
            <!-- <modal-confirm ></modal-confirm> -->
            <div v-if="loading">
                <lottie :options="soundOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>
            </div>

            <main id="tournament" class="column" style="padding-left: 10em;">
                <bracket
                v-if           = "showBracket"
                :brackets      = "brackets"
                v-on:getWinner = "setWinner"
                />
            </main>

            <a class="button is-black" v-on:click="quitBattle">Finalizar Batalha</a>


        </div>




    </div>

</template>

<script>

import fab from 'vue-fab'
import Bracket from '../Components/Bracket.vue'
import ModalConfirm from '../../templates/ModalConfirm.vue'
import ModalUserForm from '../Components/ModalUserForm.vue'
import Lottie from '../../templates/Lottie.vue'
import * as animationData from '../../assets/loader.json'

export default {

    components : {Bracket, fab, ModalConfirm, Lottie, ModalUserForm},

    data () {
        return {
            defaultOptions  : {animationData: animationData},
            battle          : null,
            brackets        : [],
            users           : [],
            usersSubscribed : [],
            total_rounds    : 0,
            stepper         : 1,
            loading         : true,
            showBracket     : false,
            showModalForm   : false,
            actions         : [
                {
                    name: 'newUser',
                    icon: 'add'
                },
                {
                    name: 'listUsers',
                    icon: 'list'
                }
            ]

        }
    },

    mounted(){
        let scope = this;

        this.axios.get('/api/battle/get-latest-battle').then(response => {
            if(response.data.data.length > 0 && response.data.data[0].active){
                scope.battle   = response.data.data[0]
                scope.brackets = response.data.data[0].brackets
                scope.showBracket = true
            } else {
                this.axios.get('/api/user/get-all-users').then(response=>{
                    scope.users = response.data.data
                    scope.users = scope.users.reverse()
                })
            }
            scope.loading = false
        })

    },

    methods : {

        quitBattle(){
            this.axios.put('/api/battle/end-battle', {
                'battle_id': this.battle._id,
                'winner_id': null
            }).then(response => {
                console.log(response)
            })

            this.$router.push('/')
        },

        closeModal(user){
            this.showModalForm = false
            this.reloadUsers()
        },

        handleAnimation(anim) {
            this.anim = anim;
        },

        reloadUsers(){
            let scope = this
            this.axios.get('/api/user/get-all-users').then(response=>{
                scope.users = response.data.data
                scope.users = scope.users.reverse()
            })
        },

        setWinner(data) {
            console.log(data)
            let request = {
                battle_id : this.battle._id,
                round_id  : data.round._id[0],
                user_id   : data.person[0]._id
            }
            console.log(request)
            let scope = this

            this.axios.post('/api/battle/update-battle', request).then(response => {
                console.log(response)
            }).catch( err => {
                console.log(err)
            })
        },

        newUser() {
            this.showModalForm = true
        },

        listUsers() {
            alert('listing users')
        },

        sendUsersSubscribed(){
            let scope = this
            this.loading = true

            this.axios.post('/api/battle/make-battle', this.usersSubscribed).then(response => {
                scope.battle      = response.data.data
                scope.brackets    = response.data.data.brackets
                scope.showBracket = true
                scope.loading     = false
                scope.stepper     = 2
            }).catch( err => {
                console.log(err)
            })

        },
        subscribe(user) {
            let index = this.users.indexOf(user)
            this.users.splice(index, 1)
            this.usersSubscribed.push(user)
        },

        unsubscribe(user) {
            let index = this.usersSubscribed.indexOf(user)
            this.usersSubscribed.splice(index, 1)
            this.users.unshift(user)
        },

        setVirgin(user) {
            let index = this.usersSubscribed.indexOf(user)
            if(this.usersSubscribed[index].virgin === undefined)
            this.usersSubscribed[index].virgin = true
            else
            this.usersSubscribed[index].virgin = !this.usersSubscribed[index].virgin

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
