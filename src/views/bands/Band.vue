<template>
  <div class="table is-bordered is-striped is-narrow">
    <table></table>
    <thead>
    <tr>
      <th>Nome</th>
      <th>Integrantes</th>
      <th>Editar</th>
      <th>Deletar</th>
    </tr>
    </thead>
    <tfoot>
    <tr>
      <th>Nome</th>
      <th>Integrantes</th>
    </tr>
    </tfoot>
    <tbody>
    <tr v-for="group in groups" v-if="group">
      <td>{{group.name}}</td>
      <td >
        <ul>
          <li v-for="member in group._members">{{member.name}}</li>
        </ul>
      </td>
      <td>
        Editar
      </td>
      <td v-on:click="deleteBand(group._id)">
        deletar
      </td>
    </tr>
    </tbody>

  </div>
</template>

<script>
  export default {
    name: 'BandCreate',

    data () {
      return {
        groups : {}
      }
    },
    mounted(){
      let scope = this
      this.$http.get('/api/group/get-all-groups').then(response=>{
        scope.groups = JSON.parse(response.bodyText)
        console.log(scope.groups)
      })
    },

    methods : {

      deleteBand(id){

          console.log(this.groups)
          console.log(this.groups[id])
        this.groups[id] = null

//          this.$http.delete('api/group/delete-group-by-id/'+id)
      },

      insertBand(){

        let band = {}
        band.name = this.name
        band.members = this.peopleOnGroup
        let jsonBand = JSON.stringify(band)
        console.log(jsonBand)

        this.$http.post('/api/group/create-group',jsonBand,{
          headers: {
            Accept: "application/json"
          }
        }).then(response=>{
          console.log(response)
        })

      }


    }
  }
</script>

<style scoped lang="sass">

</style>
