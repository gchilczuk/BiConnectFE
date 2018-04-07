<template>
  <div class="container">
    <div>
      <div>
        <span>Spotkania</span>
      </div>
      <div>
        <el-date-picker type="date" v-model="meetingDate" :picker-options="dataPickerRestriction"></el-date-picker>
        <el-button type="success" plain>Dodaj spotkanie</el-button>
      </div>
      <div>
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
      </div>
    </div>
  </div>
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

<style scoped>
  .container {
    width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
