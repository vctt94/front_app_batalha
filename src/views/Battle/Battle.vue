<template>
    <div>
        <div class="column is-half is-offset-2">
            <el-steps :space="350" :active="1" style="color: black">
                <el-step title="Batalha" icon="plus">asdasd</el-step>
                <el-step title="Sorteio" icon="search"></el-step>
                <el-step title="Chaves" icon="share"></el-step>
            </el-steps>

        </div>

        <h2>Sorteio dos MC's</h2>
        <div class="columns" style="padding-top: 2em">
            <div class="column is-one-third is-offset-1">
                <table>
                    <thead>
                        <tr>
                            <th>Nome MC</th>
                        </tr>
                    </thead>
                    <tfoot>

                    </tfoot>
                    <tbody>

                        <tr v-for="user in users" v-if="user">

                            <td>
                                {{user.name}}
                            </td>
                            <td>
                                <a class="btn" @click="subscribe(user)"><i class="fa fa-arrow-right" style="color: grey" aria-hidden="true"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="column is-one-third is-offset-4">
                <table>
                    <thead>
                        <tr>
                            <th>Sorteando</th>
                        </tr>
                    </thead>
                    <tfoot>

                    </tfoot>
                    <tbody>
                        <tr v-for="user in usersSubscribed" v-if="user">

                            <td>
                                {{user.name}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <fab
                bg-color="#0e2449"
                position="top-right"
                :actions="actions"
                @newUser="newUser"
                @listUsers="listUsers"
                style="padding-top: 2em"
            />

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
import ContentNavbar from '../../components/ContentNavbar.vue'
import fab from 'vue-fab'

export default {

    components : {Bracket, ContentNavbar, fab},

    data () {
        return {
            firstStage      : [],
            users           : [],
            usersSubscribed : [],
            loading         : true,
            total_rounds    : 0,
            actions: [
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
        subscribe(user) {
            this.usersSubscribed.push(user)
            console.log(this.usersSubscribed)
        },

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
