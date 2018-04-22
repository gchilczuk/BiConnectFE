<template>
  <div>
    <b-row :no-gutters="true">
      <b-col cols="5">
        <speeches-list ref="speechesList"></speeches-list>
      </b-col>
      <b-col cols="7">
        <speech-form v-on:clear-selection="cos"></speech-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import SpeechesList from "../components/SpeechesList"
  import SpeechForm from "../components/SpeechForm"

  export default {
    components: {
      SpeechesList,
      SpeechForm
    },
    methods: {
      cos() {
        console.log('cos')
      }
    },

    mounted() {
      this.$on('clear-selection', function () {
        console.log('zlapany wyzej')
        // this.$refs.speechesList.clearTableSelection()
      })
    }

  }
</script>
