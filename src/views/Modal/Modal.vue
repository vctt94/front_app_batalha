<template>
  <transition name="modal" v-if="isOpen">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">{{modalTitle}}</p>
            <button class="delete" v-on:click="close()"></button>
          </header>

          <section class="modal-card-body" v-bind:is="modalComponent">
          </section>

          <footer class="modal-card-foot">
            <a class="button" v-if="submitButton.text"  @click="submitButton.submitFunction">{{submitButton.text}}</a>
            <a class="button" v-if="cancelButton" @click="cancelButton.cancelFunction">{{cancelButton.text}}</a>
          </footer>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import {mapGetters,mapMutations} from 'vuex'
  import {CLOSE_MODAL} from '../../store/mutations'

  export default {

    data(){
      return {
        show:true,
      }
    },

    components:{
      ModalContent: this.modalComponent
    },

    computed: {
      ...mapGetters({
        modal: 'modal'
      }),
      isOpen(){
        return this.modal.open
      },
      modalComponent(){
        return this.modal.component
      },
      modalTitle(){
        return this.modal.title
      },
      cancelButton(){
        return this.modal.closeButton
      },
      submitButton(){
        return this.modal.submitButton
      }

    },
    methods:{
      ...mapMutations({
        close: CLOSE_MODAL
      }),
    }

  }
</script>

<style scoped lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .7);
    transition: opacity .3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  .columns{
    margin-bottom: 0;
  }
  @media only screen and (min-width: 768px) and (max-width: 991px) {

    .modal-wrapper{
      padding-right: 2em;
    }
  }
  /* Mobile Layout */
  @media only screen and (max-width: 767px){
    .modal-wrapper{
      padding-right: 2em;
    }
  }
</style>
