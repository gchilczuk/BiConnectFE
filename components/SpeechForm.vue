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
              <el-button type="primary" @click="increaseRequirementsCounter" size="small"
                         plain>Nowa potrzeba</el-button>
              <el-button type="primary" @click="increaseRequirementsCounter" size="small" plain>Usuń</el-button>
            </span>
        </b-row>
      </el-form-item>
      <el-form-item v-for="number in requirementsCounter" v-bind:key="'req_ex' + number"
                    v-bind:label="'Potrzeba ' + number">
        <el-input v-bind:key="'req_in' + number" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  v-model="speech.requirements[number - 1].description"
                  placeholder="Potrzeba zgłoszona przez osobę prezentującą"/>
        <!--@blur="saveRequirements"/>-->
      </el-form-item>
      <el-form-item>
        <h5>Rekomendacje</h5>
        <b-row>
            <span class="ml-3">
              <el-button type="primary" @click="incrementRecommendationsCounter" size="small"
                         plain>Nowa rekomendacja</el-button>
              <el-button type="primary" @click="decreaseRecommendationsCounter" size="small" plain>Usuń</el-button>
            </span>
        </b-row>
      </el-form-item>
      <el-form-item v-for="number in recommendationsCounter" v-bind:key="'rec_ex' + number"
                    v-bind:label="'Rekomendacja ' + number">
        <el-input v-bind:key="'rec_in' + number" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  v-model="speech.recommendations[number - 1].description"
                  placeholder="Rekomendacja osoby prezentującej"/>
        <!--@blur="saveRecommendations"/>-->
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
        activeSpeechEntityInd: 'meetings/activeSpeechEntityInd'
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
        this.requirementsCounter = this.speech.requirements.length
        this.recommendationsCounter = this.speech.recommendations.length
      }
    },
    methods: {
      close() {
        this.$store.dispatch('meetings/setActiveSpeechTableInd', null)
      },
      increaseRequirementsCounter() {
        this.requirementsCounter += 1
        this.speech.requirements.push({
          description: ''
        })
      },
      decreaseRequirementsCounter() {
        if (this.requirementsCounter > 0) {
          this.requirementsCounter -= 1
          this.speech.requirements.pop()
        }
      },
      incrementRecommendationsCounter() {
        this.recommendationsCounter += 1
        this.speech.recommendations.push({
          description: ''
        })
      },
      decreaseRecommendationsCounter() {
        if (this.recommendationsCounter > 0) {
          this.recommendationsCounter -= 1
          this.speech.recommendations.pop()
        }
      },
      async updateSpeech() {
        const meetingId = this.activeMeetingEntityInd
        const speechId = this.activeSpeechEntityInd
        const speech = this.speech
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
      }
    }
  }
</script>

<style scoped>

</style>
