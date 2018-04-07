<template>
  <el-row style="margin: 20px;">
    <el-row>
      <span>Spotkanie: 04.05.2018</span>
    </el-row>
    <el-row>
      <b-row >
        <b-col>
          <el-button type="success" plain>
            <i class="el-icon-plus"></i> Dodaj nowe wystąpienie
          </el-button>
        </b-col>
        <b-col class="text-right">
          <el-button type="primary" plain>
            <i class="el-icon-document"></i> Generuj notatkę
          </el-button>
        </b-col>
      </b-row>
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          property="name"
          label="Imię">
        </el-table-column>
        <el-table-column
          property="surname"
          label="Nazwisko">
        </el-table-column>
        <el-table-column label="Operations">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" plain>Usuń</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent()">Clear selection</el-button>
    </div>
  </el-row>
</template>

<script>
  export default {
    surname: "SpeechesList",
    data() {
      return {
        input: 'asdasd',
        tableData: [{
          name: 'Jan',
          surname: 'Kowalski',
        }, {
          name: 'Jan',
          surname: 'Kowalski',
        }, {
          name: 'Jan',
          surname: 'Kowalski',
        }, {
          name: 'Jan',
          surname: 'Kowalski',
        }],
        currentRow: null
      }
    },

    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>
