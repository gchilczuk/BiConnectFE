<template>
  <b-container class="mt-4">
    <h1>Spotkania</h1>
    <el-date-picker type="date" v-model="meetingDate" :picker-options="dataPickerRestriction"></el-date-picker>
    <el-button class="ml-2" type="success" plain>Dodaj spotkanie</el-button>

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
  export default {
    name: "secretary-main",
    data() {
      return {
        meetingDate: null,
        tableData: [{
          date: '05-04-2018',
          members: 15,
          guests: 1
        }, {
          date: '29-03-2018',
          members: 35,
          guests: 0
        }, {
          date: '15-03-2018',
          members: 25,
          guests: 2
        }, {
          date: '5-03-2018',
          members: 35,
          guests: 0
        }],
        dataPickerRestriction: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        }
      }
    },
    methods: {}
  }
</script>
