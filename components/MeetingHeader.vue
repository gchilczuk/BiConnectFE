<template>
    <div>

      <el-date-picker type="date" v-model="meetingDate"></el-date-picker>
      <p>{{meetingDate}}</p>
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
