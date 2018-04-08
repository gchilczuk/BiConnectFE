<template>
  <div>
    <b-row :no-gutters="true">
      <b-col cols="5">
        <speeches-list></speeches-list>
      </b-col>
      <b-col cols="7">
        <speech-form></speech-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import SpeechesList from "../components/SpeechesList";
  import SpeechForm from "../components/SpeechForm"

  export default {
    components: {
      SpeechesList,
      SpeechForm
    }

  }
</script>
