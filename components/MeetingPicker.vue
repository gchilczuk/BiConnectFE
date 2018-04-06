<template>
    <div>
      <el-date-picker type="date" v-model="meetingDate" :picker-options="pickerOptions1"></el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "meeting-picker",
      data() {
        return {
          meetingDate: '',
          pickerOptions1: {
            disabledDate(time){
              return time.getTime() > Date.now();
            }
          }
        }
      }
    }

</script>

<style scoped>


</style>
