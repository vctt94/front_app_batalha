
<template >
<nav class="nav">


  <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
  <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
  <span class="nav-toggle">
    <span></span>
    <span></span>
    <span></span>
  </span>


  </div>
</nav>
</template>


<script>
    export default {
        props : [
        ],

        data(){
            return {
            }
        },

        mounted() {
            // parses JSON received as props
            // linking direct with props was not working
            // this.parsedTabs = JSON.parse(this.tabs)
            // // check if username was passed
            // if(this.name != null){
            //     if(this.name.length > 1)
            //         this.user = true;
            // }

            // // check if avatar link exists
            // if(this.avatar != null){
            //     if(this.avatar.length <= 1 || this.avatar.slice(-7) == "man.jpg")
            //         this.localAvatar = "/assets/images/avatar_user.png"
            //     else
            //         this.localAvatar = this.avatar
            // }

            // //set activated link
            // for(let i in this.parsedTabs){
            //     if(this.parsedTabs[i].url == window.location.pathname)
            //         this.parsedTabs[i].isActive = true;
            // }

        },
    }
</script>

<style scoped lang="sass">


</style>
