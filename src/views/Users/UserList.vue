<template>
  <div class="container">
		<table class="table is-bordered">
		  <thead>
		    <tr>
		      <th>MC</th>
		      <th><abbr >Email</abbr></th>
		      <th><abbr >Gênero</abbr></th>
		      <th><abbr title="Participações ">Participações</abbr></th>
		      <th><abbr title="Vitórias">Venceu</abbr></th>
		    </tr>
		  </thead>

		  <tbody>
		    <tr v-for="user in users">
		      <th>{{user.name}}</th>
		      <td>{{user.email}}</td>
					<td>{{user.gender}}</td>
		    </tr>
		  </tbody>
		</table>
  </div>
</template>

<script>

  export default {

    data () {
      return {
				users: {}
      }
    },

		mounted() {
			let scope = this

			this.$http.get('api/user/get-all-users').then(response=>{
        scope.users = JSON.parse(response.bodyText)
				console.log(scope.users)
      })

		},

    methods : {

    }
  }
</script>

<style scoped lang="sass">
  .users
    width : 100%
    margin-top: 10em
    border-width: 10em
</style>
