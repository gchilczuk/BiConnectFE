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
      <el-form-item label="Osoba ">
        <el-autocomplete
          class="inline-input"
          v-model="personInput"
          :fetch-suggestions="querySearch"
          value-key="search_key"
          placeholder="Please Input"
          @select="handleSelect"></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <h5>Potrzeby</h5>
        <b-row>
            <span class="ml-3">
              <el-button type="primary" @click="addRequirement" size="small"
                         plain>Nowa potrzeba</el-button>
              <el-button type="primary" @click="speechToTextStart('req_in')" size="small" plain>STT</el-button>
              <el-button type="primary" @click="stopSTT" size="small" plain>Stop STT</el-button>
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
              <el-button type="primary" @click="speechToTextStart('rec_in')" size="small" plain>STT</el-button>
              <el-button type="primary" @click="stopSTT" size="small" plain>Stop STT</el-button>
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
        personInput: null,
        speech: {
          person: null,
          requirements: [],
          recommendations: []
        },
        requirementsCounter: 0,
        recommendationsCounter: 0,
        recognition: null
      }
    },
    async mounted() {
      const result = await this.$axios.get('http://biconnect.herokuapp.com/people')
      result.data.forEach(function (e) {
        e.search_key = e.first_name + ' ' + e.last_name;
      })
      this.people = result.data
    },
    watch: {
      activeSpeechTableInd: function () {
        this.speech = this.$store.getters['meetings/activeSpeech']
        this.personInput = this.speech.person && this.speech.person.first_name + ' ' + this.speech.person.last_name,
          this.requirementsCounter = this.speech && this.speech.requirements && this.speech.requirements.length
        this.recommendationsCounter = this.speech && this.speech.recommendations && this.speech.recommendations.length
      }
    },
    methods: {
      querySearch(queryString, cb) {
        const results = queryString ? this.people.filter(this.createFilter(queryString)) : this.people
        cb(results);
      },
      createFilter(queryString) {
        return (people) => {
          const name = people.first_name + ' ' + people.last_name
          return (name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        };
      },
      handleSelect(item) {
        this.dataChanged()
        this.speech.person = {
          first_name: item.first_name,
          last_name: item.last_name,
          username: item.username
        }
      },
      close: function () {
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
        return this.requirementsCounter
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
        return this.recommendationsCounter
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
      dataChanged(elId) {
        if (!this.unsavedChanges) {
          this.$store.dispatch('meetings/setUnsavedChanges', true)
        }
      },
      speechToTextStart(element) {
        let elId = null
        let node = null
        if (element === 'req_in') {
          elId = this.addRequirement()
          node = this.speech.requirements[elId - 1]
        } else if (element === 'rec_in') {
          elId = this.addRecommendation()
          node = this.speech.recommendations[elId - 1]
        }
        try {
          var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          this.recognition = new SpeechRecognition();
        }
        catch (e) {
          console.error(e);
          this.$swal({
            type: 'error',
            title: 'Oops...',
            text: 'Przykro nam Twoja przeglądarka nie wspiera tej funkcjonalności!',
          })
          return
        }
        this.recognition.continuous = true;
        this.recognition.onresult = function (event) {
          var current = event.resultIndex;
          var transcript = event.results[current][0].transcript;
          var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
          if (!mobileRepeatBug) {
            node.description += transcript
          }
        };
        let self = this
        this.recognition.onstart = function () {
          self.$notify.info({
            title: 'Info',
            message: 'Rozpoznawanie głosowe aktywowane. Spróbuj powiedzieć coś do mikrofonu.'
          });
        }
        this.recognition.onspeechend = function () {
          self.$notify.info({
            title: 'Info',
            message: 'Ze względu na dłuższą ciszę rozpoznawanie głosowe zostało dezaktywowane.'
          });
        }
        this.recognition.onerror = function (event) {
          if (event.error == 'no-speech') {
            self.$notify.info({
              title: 'Info',
              message: 'Nie wykryto mowy. Spróbuj ponownie.'
            });
          }
        }
        this.recognition.start();
      },
      stopSTT() {
        this.recognition.stop();
        this.$notify.info({
          title: 'Info',
          message: 'Rozpoznawanie głosowe zostało dezaktywowane.'
        });
      }
    }
  }
</script>

<style scoped>

</style>
