<template>
    <div>
      <span>Spotkanie</span>
      <el-date-picker type="date" v-model="meetingDate" align="center"></el-date-picker>
      <el-button type="primary" icon="el-icon-document">Search</el-button>
    </div>
</template>

<script>
    export default {
        name: "MeetingHeader",
      data(){
          return{
              meetingDate : ''
          }
      }
    }
</script>

<style scoped>

</style>
