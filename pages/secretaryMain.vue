<template>
    <div>
      <h1>Spotkania</h1>
      <meeting-picker/>
      <el-button type="success"  v-on:click="addNew()">Dodaj wystąpienie</el-button>
    </div>
</template>

<script>
    import MeetingPicker from "../components/MeetingPicker";

    export default {
      components: {MeetingPicker},
      name: "secretary-main",
      methods: {
        addNew() {
          alert('Spotkanie dodane');
        }
      }
    }
</script>

<style scoped>

</style>
