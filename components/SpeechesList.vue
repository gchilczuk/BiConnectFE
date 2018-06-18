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
      <b-col cols="*" class="text-right" >
        <a :href="'http://0.0.0.0:8000/groups/1/meetings/' + activeMeeting.id + '/note'">
          <el-button type="primary" plain style="width: 175px">
            <i class="el-icon-document"></i> Generuj notatkę
          </el-button>
        </a>
      </b-col>
    </b-row>
    <b-row align-h="end">
      <b-col cols="*">
        <el-button @click="sendMessages" type="info" plain style="margin-left: 400px; margin-top: 10px">
          <i class="el-icon-message"></i> Wyślij wiadomości
        </el-button>
      </b-col>
    </b-row >
    <el-row >
      <el-table
        ref="speechTable"
        :row-class-name="tableRowClassName"
        :data="activeMeeting.speeches"
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
        meetingDate: null,
        selectedRow: null
      }
    },
    computed: {
      ...mapGetters({
        activeMeeting: 'meetings/activeMeeting',
        activeSpeechTableIndex: 'meetings/activeSpeechTableInd',
        unsavedChanges: 'meetings/unsavedChanges'
      })
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row === this.selectedRow) {
          return 'success-row';
        }
        return '';
      },
      highlineRow(row) {
        this.selectedRow = row
      },
      clearTableSelection() {
        this.selectedRow = null
      },
      changeActiveSpeech: function (row) {
        let currentRow = this.activeMeeting.speeches.indexOf(row)
        this.$store.dispatch('meetings/setActiveSpeechTableInd', currentRow)
        this.$store.dispatch('meetings/setActiveSpeechEntityInd', row.id)
      },
      handleRowClicked(row, event, column) {
        if (event.target.nodeName !== 'BUTTON') {
          if (this.unsavedChanges) {
            this.$swal({
              title: 'Czy jesteś pewny?',
              text: "W formularzu istnieją niezapisane dane!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Odrzuć zmiany!',
              cancelButtonText: 'Powróć do formularza',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
                this.$store.dispatch('meetings/setUnsavedChanges', false)
                this.changeActiveSpeech(row);
                this.highlineRow(row)
              }
            })
          } else {
            this.changeActiveSpeech(row)
            this.highlineRow(row)
          }
        }
      },
      addSpeech() {
        const meetingId = this.activeMeeting.id
        this.$store.dispatch('meetings/addSpeech', meetingId)
          .then(() => {
            this.$emit('forceReset')
          })
      },

      handleDelete(index, row) {
        this.$swal({

          title: 'Czy jesteś pewny?',
          text: "Usunąć wystąpienie" + (row.person !== null ?
            " " + row.person.first_name + " " + row.person.last_name + "?" :
            "?"),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Usuń',
          cancelButtonText: 'Anuluj',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            const meetingId = this.activeMeeting.id
            const speechId = row.id
            this.$store.dispatch('meetings/removeSpeechById', {meetingId, speechId})

            let currentRow = this.activeMeeting.speeches.indexOf(row)
              if (currentRow === this.activeSpeechTableIndex) {
                this.$store.dispatch('meetings/setActiveSpeechTableInd', null)
                this.$store.dispatch('meetings/setActiveSpeechEntityInd', null)
                this.clearTableSelection()
              }
          }
        })


      },
      changeMeetingDate() {
        this.isMeetingDateDisabled = false
      },
      abortChangeMeetingDate() {
        this.isMeetingDateDisabled = true
        this.meetingDate = this.activeMeeting.date
      },
      applyChangeMeetingDate() {
        const meetingId = this.activeMeeting.id
        const meetingDate = this.meetingDate
        this.$store.dispatch('meetings/updateMeetingDate', {meetingId, meetingDate})
        this.isMeetingDateDisabled = true
      },

       sendMessages() {
         this.$axios.get('http://0.0.0.0:8000/groups/1/meetings/'+ this.activeMeeting.id +'/speeches/send_mails')
      },
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

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
