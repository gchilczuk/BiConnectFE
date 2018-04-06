<template>
    <div>
      <span class=" mhelement ; meetings" >Spotkanie</span>
      <el-date-picker type="date" v-model="meetingDate" class="mhlement"></el-date-picker>
      <el-button v-on:click="generateNote"  type="primary" icon="el-icon-document" class="mhelement">Generuj notatkę</el-button>
    </div>
</template>

<script>
    export default {
        name: "MeetingHeader",
      data(){
          return{
              meetingDate : ''
          }
      },
      methods:{
          generateSpeech(){
            alert("generated")
          }
      }
    }
</script>

<style scoped>
  .meetings{
    font-size:45px;
  }

 .mhelement{
  margin-right:50px;
   margin-left:50px;
   margin-bottom: 30px;
}
</style>
