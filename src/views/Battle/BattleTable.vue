<template>
  <div class="">
    <div v-if="loading" class="fa fa-spinner fa-pulse fa-3x fa-fw" >
    </div>
    <div v-else>
      <modal-confirm
        :show="showDelete"
        :title = "modalProps.title"
        :content = "modalProps.content"
        :submitButton="modalProps.submitButton"
        v-on:submit="deleteBattle(modalProps.battle._id); showDelete = false"
        v-on:cancel="showDelete = false"
      ></modal-confirm>

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
  import ModalConfirm from '../Components/Modal.vue'

  export default {
    name: 'BattleTable',

    components:{
      ModalConfirm
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
      getAllBattles(){
        this.loading = true;
        this.axios.get('https://murmuring-meadow-23071.herokuapp.com/battle/get-battles').then(response=>{
          console.log(response)
          this.battles = response.data.data
          this.loading = false
        })
      },
      openDeleteModal(battle){
        this.modalProps.content = "Tem certeza que deseja deletar "+battle.name +"?"
        this.modalProps.submitButton = "Deletar"
        this.modalProps.title = "Confirmar"
        this.modalProps.battle = battle
        this.showDelete = true
      },
      deleteBattle(id){
        this.battles[id] = null
        this.axios.delete('/api/battle/'+id)
      }

    }
  }
</script>

<style scoped lang="scss">

</style>
