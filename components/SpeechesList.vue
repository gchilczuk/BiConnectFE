<template>
  <el-row class="m-4">
    <div class="mb-4">
      <span class="meeting-header mr-3">Data spotkania: </span>
      <el-date-picker
        v-model="meetingDate"
        type="date"
        placeholder="Pick a day"
        format="dd.MM.yyyy"
        value-format="yyyy-MM-dd"
        :disabled="isMeetingDateDisabled"
        size="medium">
      </el-date-picker>
      <span class="ml-3">
        <i v-if="isMeetingDateDisabled" @click="changeMeetingDate" class="el-icon-edit meeting-header-icon"></i>
        <span v-else>
          <i class="el-icon-close meeting-header-icon" @click="abortChangeMeetingDate"></i>
          <i class="el-icon-check meeting-header-icon" @click="applyChangeMeetingDate"></i>
        </span>
        </span>
    </div>
    <b-row align-h="between">
      <b-col cols="*">
        <el-button @click="addSpeech" type="success" plain>
          <i class="el-icon-plus"></i> Dodaj nowe wystąpienie
        </el-button>
      </b-col>
      <b-col cols="*" class="text-right">
        <el-button type="primary" plain>
          <i class="el-icon-document"></i> Generuj notatkę
        </el-button>
      </b-col>
    </b-row>
    <el-row>
      <el-table
        ref="speechTable"
        :data="activeMeeting.speeches"
        highlight-current-row
        @row-click="handleRowClicked">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          property="person.first_name"
          label="Imię">
        </el-table-column>
        <el-table-column
          property="person.last_name"
          label="Nazwisko">
        </el-table-column>
        <el-table-column label="" align="right">
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
    name: "SpeechesList",
    data() {
      return {
        isMeetingDateDisabled: true,
        meetingDate: null
      }
    },
    computed: {
      ...mapGetters({
        activeMeeting: 'meetings/activeMeeting',
        activeSpeechTableIndex: 'meetings/activeSpeechTableInd'
      })
    },
    methods: {
      clearTableSelection() {
        this.$refs.speechTable.setCurrentRow(null);
      },
      handleRowClicked(row, event, column) {
        if (event.target.nodeName !== 'BUTTON') {
          let currentRow = this.activeMeeting.speeches.indexOf(row)
          this.$store.dispatch('meetings/setActiveSpeechTableInd', currentRow)
          this.$store.dispatch('meetings/setActiveSpeechEntityInd', row.id)
          this.$emit('recreate-right-pane')
        }
      },
      addSpeech() {
        this.$store.dispatch('meetings/addNewSpeech')
      },
      handleDelete(index, row) {
        this.$store.dispatch('meetings/removeSpeechById', index)
      },
      changeMeetingDate() {
        this.isMeetingDateDisabled = false
      },
      abortChangeMeetingDate() {
        this.isMeetingDateDisabled = true
        this.meetingDate = this.activeMeeting.date
      },
      applyChangeMeetingDate() {
        this.$store.dispatch('meetings/updateMeetingDate', this.meetingDate)
        this.isMeetingDateDisabled = true
      }
    },
    mounted() {
      this.meetingDate = this.activeMeeting.date
    }
  }
</script>

<style scoped>
  .el-icon-close {
    color: red;
  }

  .el-icon-check {
    color: greenyellow;
  }

  .meeting-header {
    font-size: 22px;
  }

  .meeting-header-icon {
    font-size: 24px;
  }
</style>

<style>
  .el-input.is-disabled .el-input__inner {
    background-color: white;
  }
</style>
