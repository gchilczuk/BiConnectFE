<template>
  <b-container class="mt-4">
    <h1>Spotkania</h1>
    <el-date-picker type="date" v-model="meetingDate" value-format="dd-MM-yyyy"></el-date-picker>
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
    name: "secretary-main",
    data() {
      return {
        meetingDate: '08-04-2018'
      }
    },
    computed: {
      ...mapGetters({
        tableData: 'meetings/meetings'
      })
    },
    methods: {
      handleCurrentChange(val) {
        this.$router.push("/meeting")
      },
      addNewMeeting(){
        this.$store.dispatch('meetings/addNewMeeting', this.meetingDate)
      }
    }
  }
</script>
