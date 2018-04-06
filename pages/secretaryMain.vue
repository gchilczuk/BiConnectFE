<template>
    <div>
      <h1>Spotkania</h1>
      <meeting-picker/>
      <nuxt-link to="testpage"><el-button type="success">Dodaj wystąpienie</el-button></nuxt-link>
    </div>
</template>

<script>
    import MeetingPicker from "../components/MeetingPicker";

    export default {
      components: {MeetingPicker},
      name: "secretary-main"
    }
</script>

<style scoped>

</style>
