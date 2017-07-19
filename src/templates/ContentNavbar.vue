<template>
	<div class="nav menu">
	  <div class="container">
		<div class="nav-left">

			<a class="nav-item is-tab" :class="state == 1 ? 'is-active' : ''" @click = "updateNavbarSection('list')">
				<span class="icon-btn">
				  <i class="fa fa-list-ul "></i>
				</span>
		  </a>

		  <a class="nav-item is-tab" :class="state == 2 ? 'is-active' : ''" @click = "updateNavbarSection('create')">
				<span class="icon-btn">
					<i class="fa fa-plus">
					</i>
				</span>
			</a>

		  <!-- <a class="nav-item is-tab" :class="states.edit ? 'is-active' : ''" @click = "updateNavbarSection('edit')">
				<span class="icon-btn thin">
				  <i class="fa fa-pencil"></i>
				</span>
		  </a>
		  <a class="nav-item is-tab" :class="states.del ? 'is-active' : ''" @click = "updateNavbarSection('del')">
				<span class="icon-btn">
				  <i class="fa fa-trash"></i>
				</span>
		  </a> -->

		  <div class="nav-item is-tab">
			<strong>{{total}} {{string}}</strong>
		  </div>
		</div>
		<div class="nav-right is-hidden-mobile">
		  <a class="nav-item is-tab">Name</a>
		  <a class="nav-item is-tab">Size</a>
		  <a class="nav-item is-tab">Views</a>
		  <a class="nav-item"><span class=" button is-success">Uploaded</span></a>
		</div>
	  </div>
	</div>
</template>

<script>

export default {
	name: 'ContentNavbar',

	props: {
		total: {
			type: Number
		},
		string: {
			type: String
		},
    state:{
		  type: Number
    }
	},

	data(){
		return {
			states: {
				'list' 	 : true,
				'create' : false,
			}
		}
	},

	mounted() {
	},

	methods :{

		updateNavbarSection(sec) {
			this.mapState(sec)
			this.$emit('update', sec)
		},

		mapState(sec) {
			for(var st in this.states) {
				if(st == sec) this.states[st] = true
				else this.states[st] = false
			}
		}
	}
}

</script>

<style lang="scss" scoped>

</style>
