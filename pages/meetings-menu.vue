<template>
  <b-container class="mt-4">
    <h1>Spotkania</h1>
    <el-date-picker type="date" v-model="meetingDate"  value-format="dd-MM-yyyy"></el-date-picker>
    <el-button class="ml-2" @click="addNewMeeting" type="success" plain>Dodaj spotkanie</el-button>

    <el-table
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        property="date"
        label="Data">
      </el-table-column>
      <el-table-column
        property="members"
        label="Liczba członków">
      </el-table-column>
      <el-table-column
        property="guests"
        label="Liczba gości">
      </el-table-column>
    </el-table>
  </b-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "meetings-menu",
    data() {
      return {
          meetingDate: this.getToday()
      }
    },
    computed: {
      ...mapGetters({
        tableData: 'meetings/meetings'
      })
    },
    methods: {
      getToday: function () {
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth() + 1
        var yyyy = today.getFullYear()

        if (dd < 10)
          dd = '0' + dd
        if (mm < 10)
          mm = '0' + mm

        var today = dd + '-' + mm + '-' + yyyy
        console.log("set cd" + today)
        return today
      },
      handleCurrentChange(val) {
        this.$router.push("/meeting")
      },
      addNewMeeting(){
        this.$store.dispatch('meetings/addNewMeeting', this.meetingDate)
      }
    }
  }
</script>
