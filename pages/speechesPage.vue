<template><div>
    <meeting-header></meeting-header>
  <hr>
  <speeches-list></speeches-list>
</div>
</template>

<script>
    import MeetingHeader from "../components/MeetingHeader";
    import SpeechesList from "../components/SpeechesList";
    export default {
        name: "speechesPage",
      components: {SpeechesList, MeetingHeader}
    }
</script>

<style scoped>

</style>
