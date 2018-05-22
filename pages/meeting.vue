<template>
  <div>
    <b-row :no-gutters="true">
      <b-col cols="3.5">
        <speeches-list @forceReset="forceResetForm" ref="speechesList"/>
      </b-col>
      <b-col cols="8.5">
        <speech-form @clearSelection="clearSelection" ref="speechesForm"/>
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
      clearSelection() {
        this.$refs.speechesList.clearTableSelection()
      },
      forceResetForm() {
        this.$refs.speechesForm.reset()
      }
    }

  }
</script>
