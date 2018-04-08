<template>
  <el-row class="m-4">
    <h5>Spotkanie: 04.05.2018</h5>
    <el-row>
      <b-row>
        <b-col>
          <el-button @click="addNewSpeech" type="success" plain>
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
        :data="speeches"
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
        <el-table-column label="Operations" align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" plain>Usuń</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    surname: "SpeechesList",
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        speeches: 'meetings/speeches'
      })
    },
    methods: {
      handleCurrentChange(val) {
        this.$store.dispatch('meetings/setActiveSpeech', val.id)
      },
      addNewSpeech() {
        this.$store.dispatch('meetings/addNewSpeech')
      },
      handleDelete(index, row) {
        this.$store.dispatch('meetings/removeSpeechById', index)
      }
    },
    mounted() {
      this.$store.dispatch('meetings/fetchData')
    }
  }
</script>
