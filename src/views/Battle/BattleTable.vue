<template>
  <div class="">
    <div v-if="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw" >
    </div>
    <div v-else>


      <h1 class="title is-2">Batalhas Anteriores</h1>
      <table class="table is-bordered is-striped is-narrow">
        <thead>

        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>

        </thead>
        <tfoot>
        <th>Nome</th>
        <th>Email</th>
        <th>Editar</th>
        <th>Deletar</th>
        </tfoot>

        <tbody>
        <tr v-for="battle in battles" v-if="battle">
          <td>{{battle.name}}</td>
          <td >
            {{battle.description}}
          </td>
          <td>
            <a class="fa fa-book" v-on:click="openEditModal(battle)">
            </a>
          </td>
          <td v-on:click="openDeleteModal(battle)">
            <a class="fa fa-trash">

            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>

<script>
  import Modal from '../Components/ModalConfirm.vue'
  import {TOGGLE_MODAL} from '../../store/mutations'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'BattleTable',

    components:{
    },

    data () {
      return {
        battles: [],
        loading: false,
        showDelete: false,
        modalProps    : [],


      }
    },
    mounted(){
      this.getAllBattles()
    },

    methods : {
      ...mapMutations({
        toggleModal: TOGGLE_MODAL
      }),
      getAllBattles(){
        this.loading = true;
        this.axios.get('https://murmuring-meadow-23071.herokuapp.com/battle/get-battles').then(response=>{
          this.battles = response.data.data
          this.loading = false
        })
      },
      openDeleteModal(battle){
        const modal = {
          status: true,
          title: "Deletar Batalha " + battle.name,
          component: Modal,
          submitButton: {
            text: "Deletar",
            submitFunction: () =>{
              return this.deleteBattle(battle._id)
            },
          },
          data: "Tem certeza que deseja deletar a Batalha "+ battle.name
        }
        this.toggleModal(modal)

      },
      deleteBattle(id){
        console.log(id)
//        this.battles[id] = null
//        this.axios.delete(API_URL + '/battle/'+id)
      }

    }
  }
</script>

<style scoped lang="scss">

</style>
