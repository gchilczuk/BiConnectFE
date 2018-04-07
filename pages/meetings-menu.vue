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
        property="name"
        label="Data">
      </el-table-column>
      <el-table-column
        property="surname"
        label="Liczba członków">
      </el-table-column>
      <el-table-column
        property="surname"
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
