<template>
  <b-container class="mt-4">
    <el-form label-width="120px" v-if="activeSpeechTableInd != null">
      <b-row>
        <b-col>
          <el-form-item>
            <el-button type="primary" @click="close">Zamknij</el-button>
          </el-form-item>
        </b-col>
        <b-col class="text-right">
          <el-form-item>
            <el-upload action="#">
              <span class="mr-1">Użyj nagrania </span>
              <el-button size="small" type="success" circle><i class="el-icon-upload el-icon-right"></i></el-button>
            </el-upload>
          </el-form-item>
        </b-col>
      </b-row>
      <el-form-item>
        <h5>Potrzeby</h5>
        <b-row>
            <span class="ml-3">
              <el-button type="primary" @click="addRequirement" size="small"
                         plain>Nowa potrzeba</el-button>
            </span>
        </b-row>
      </el-form-item>
      <el-form-item v-for="number in requirementsCounter" v-bind:key="'req_ex' + number"
                    v-bind:label="'Potrzeba ' + number">
        <el-input v-bind:key="'req_in' + number" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  @change="dataChanged"
                  v-model="speech.requirements[number - 1].description"
                  placeholder="Potrzeba zgłoszona przez osobę prezentującą"/>
        <el-button type="primary" @click="removeRequirement(number - 1)" size="small" plain>Usuń</el-button>
      </el-form-item>
      <el-form-item>
        <h5>Rekomendacje</h5>
        <b-row>
            <span class="ml-3">
              <el-button type="primary" @click="addRecommendation" size="small"
                         plain>Nowa rekomendacja</el-button>
            </span>
        </b-row>
      </el-form-item>
      <el-form-item v-for="number in recommendationsCounter" v-bind:key="'rec_ex' + number"
                    v-bind:label="'Rekomendacja ' + number">
        <el-input v-bind:key="'rec_in' + number" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  @change="dataChanged"
                  v-model="speech.recommendations[number - 1].description"
                  placeholder="Rekomendacja osoby prezentującej"/>
        <el-button type="primary" @click="removeRecommendation(number - 1)" size="small" plain>Usuń</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSpeech">Zapisz</el-button>
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "SpeechForm",
    computed: {
      ...mapGetters({
        activeMeetingEntityInd: 'meetings/activeMeetingEntityInd',
        activeSpeechTableInd: 'meetings/activeSpeechTableInd',
        activeSpeechEntityInd: 'meetings/activeSpeechEntityInd',
        unsavedChanges: 'meetings/unsavedChanges'
      })
    },
    data() {
      return {
        people: null,
        speech: {
          requirements: [],
          recommendations: []
        },
        requirementsCounter: 0,
        recommendationsCounter: 0
      }
    },
    watch: {
      activeSpeechTableInd: function () {
        this.speech = this.$store.getters['meetings/activeSpeech']
        this.requirementsCounter = this.speech && this.speech.requirements && this.speech.requirements.length
        this.recommendationsCounter = this.speech && this.speech.recommendations && this.speech.recommendations.length
      }
    },
    methods: {
      close: function () {
        if (this.unsavedChanges) {
          this.$swal({
            title: 'Czy jesteś pewny?',
            text: "W formularzu istnieją niezapisane dane!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Odrzuć zmiany!',
            cancelButtonText: 'Powróć do formularza',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              this.$store.dispatch('meetings/setUnsavedChanges', false)
              this.$store.dispatch('meetings/setActiveSpeechTableInd', null)
              this.$emit('clearSelection')
            }
          })
        } else {
          this.$store.dispatch('meetings/setActiveSpeechTableInd', null)
          this.$emit('clearSelection')
        }
      },
      addRequirement() {
        this.requirementsCounter += 1
        this.speech.requirements.push({
          description: ''
        })
      },
      removeRequirement(arrayIndex) {
        if (this.requirementsCounter > 0) {
          this.requirementsCounter -= 1
          this.speech.requirements.splice(arrayIndex, 1)
          this.dataChanged()
        }
      },
      addRecommendation() {
        this.recommendationsCounter += 1
        this.speech.recommendations.push({
          description: ''
        })
      },
      removeRecommendation(arrayIndex) {
        if (this.recommendationsCounter > 0) {
          this.recommendationsCounter -= 1
          this.speech.recommendations.splice(arrayIndex, 1)
          this.dataChanged()
        }
      },
      async updateSpeech() {
        const meetingId = this.activeMeetingEntityInd
        const speechId = this.activeSpeechEntityInd
        const speech = this.speech
        try {
          await this.$store.dispatch('meetings/updateSpeech', {
            meetingId: meetingId,
            speechId: speechId,
            speech: speech
          })
          this.$notify({
            title: 'Zapisano wystąpienie',
            type: 'success',
            duration: 2000
          })
          this.$store.dispatch('meetings/setUnsavedChanges', false)
        } catch (error) {
          this.$notify({
            title: 'Wystąpił błąd podczas zapisu danych',
            type: 'error',
            duration: 2000
          })
        }
      },
      dataChanged() {
        if (!this.unsavedChanges) {
          this.$store.dispatch('meetings/setUnsavedChanges', true)
        }
      }
    }
  }
</script>

<style scoped>

</style>
