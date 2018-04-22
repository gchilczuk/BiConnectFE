<template>
  <b-container class="mt-4">
    <h1>Spotkania</h1>
    <el-date-picker type="date" v-model="meetingDate" format="dd.MM.yyyy" value-format="yyyy-MM-dd"></el-date-picker>
    <el-button class="ml-2" @click="addNewMeeting" type="success" plain>Dodaj spotkanie</el-button>

    <el-table
      :data="tableData"
      highlight-current-row
      @row-click="handleRowClicked">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        property="date"
        label="Data">
      </el-table-column>
      <el-table-column
        property="count_members"
        label="Liczba członków">
      </el-table-column>
      <el-table-column
        property="count_guests"
        label="Liczba gości">
      </el-table-column>
      <el-table-column label="" align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" plain>Usuń</el-button>
        </template>
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
    mounted() {
      this.$store.dispatch('meetings/fetchMeetings')
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
      async handleRowClicked(row, event, column) {
        if (event.target.nodeName !== 'BUTTON') {
          await this.$store.dispatch('meetings/setActiveMeetingEntityInd', row.id)
          await this.$store.dispatch('meetings/fetchMeeting', row.id)
          this.$router.push("/meeting")
        }
      },
      handleDelete(index, row) {
        this.$store.dispatch('meetings/removeMeeting', index)
      },
      addNewMeeting(){
        this.$store.dispatch('meetings/addMeeting', this.meetingDate)
      }
    },
    mounted() {
      this.$store.dispatch('meetings/fetchMeetings')
    }
  }
</script>
