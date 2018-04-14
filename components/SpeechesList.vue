<template>
  <el-row class="m-4">
    <div class="mb-4">
      <span class="meeting-header">Spotkanie: </span>
      <input id="meeting-date-input" title="meeting-date"
             v-model="meetingDate" :disabled="isMeetingDateDisabled" :class="{'input-editable': !isMeetingDateDisabled}" type="text" size="8"/>
      <span class="pl-2">
        <i v-if="isMeetingDateDisabled" @click="changeMeetingDate" class="el-icon-edit meeting-header-icon"></i>
        <span v-else>
          <i class="el-icon-close meeting-header-icon" @click="abortChangeMeetingDate"></i>
          <i class="el-icon-check meeting-header-icon" @click="applyChangeMeetingDate"></i>
        </span>
        </span>
    </div>
    <el-row>
      <b-row>
        <b-col>
          <el-button @click="addSpeech" type="success" plain>
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
        ref="speechTable"
        :data="activeMeeting.speeches"
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
        activeMeeting: 'meetings/meeting',
        activeSpeechIndex: 'meetings/activeSpeechInd'
      })
    },
    methods: {
      clearTableSelection() {
        this.$refs.speechTable.setCurrentRow(null);
      },
      handleCurrentChange(val) {
        let currentRow = val == null ? null : val.id
        this.$store.dispatch('meetings/setActiveSpeech', currentRow)
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
      this.$store.dispatch('meetings/fetchData')
      this.meetingDate = this.activeMeeting.date
    }
  }
</script>

<style scoped>
  #meeting-date-input {
    background-color: transparent;
    border: none;
    color: black;
    font-size: 22px;
    border-radius: 10px;
    text-align: center;
  }
  .input-editable {
    border-color: #12b31c;
    box-shadow: 0 0 3px #129f1c;
  }
  .meeting-header {
    font-size: 22px;
  }
  .meeting-header-icon {
    font-size: 24px;
  }
</style>
