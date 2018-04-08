<template>
  <div>
    <b-row>
      <b-col>
        <speeches-list></speeches-list>
      </b-col>
      <b-col>
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
