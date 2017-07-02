<template>
  <div class="modal" :class="[ show ? 'is-active' : '' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button class="delete" v-on:click="$emit('cancel')"></button>
      </header>
      <section class="modal-card-body">
        <p class="modal-card-title">{{content}}</p>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" v-on:click="submitModal">{{submitButton}}</a>
        <a class="button"  v-on:click="$emit('cancel')">{{cancelButton}}</a>
      </footer>
    </div>
  </div>
</template>

<script>


  export default {
    props : {
      show: {
          type: Boolean,
          default: false
      },
      title:{
          type: String,
      },
      content:{
        type: String,
      },
      submitButton:{
        type: String,
        default: "Enviar"
      },
      cancelButton:{
        type: String,
        default: "Cancelar"
      }
    },

    methods:{
        submitModal(){
            this.$emit('submit')
            this.$emit('close')
        }
    }

  }
</script>

<style>
.modal {
    position: absolute;
    padding-bottom: 20em;
}
  .modal-card{
    position: fixed;
    top: 50%;
    left: 50%;
  }
</style>
