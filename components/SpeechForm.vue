<template>
  <b-container class="mt-4">
    <el-form label-width="100px" v-if="activeSpeechTableInd != null">
      <b-row>
        <b-col>
          <el-form-item>
            <el-button type="success" style="width: 100px; position: fixed; right: 5px; top:110px"
                       @click="updateSpeech"> Zapisz
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" style="width: 100px; position: fixed; right: 5px; top: 60px;" @click="close">
              Zamknij
            </el-button>
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
        <el-button type="primary" class="ml-2" @click="addNewPerson" size="small"
                   plain>Dodaj gościa
        </el-button>
      </el-form-item>

      <b-row>
        <b-col cols="6">
        <el-form-item>
          <h5>Opis firmy</h5>
        </el-form-item>
        <el-form-item>
          <el-input name="business_description"
                    :autosize="{ minRows: 3}"
                    type="textarea"
                    @change="dataChanged"
                    v-model="business_description.description"
                    placeholder="Opis firmy"
          />
        </el-form-item>
        </b-col>
      </b-row>

      <el-row>
        <el-col :span="12">
          <el-form-item>
            <h5>Potrzeba</h5>
          </el-form-item>
          <el-form-item>
            <el-input name="needTextInput"
                      :autosize="{ minRows: 6}"
                      type="textarea"
                      @change="dataChanged"
                      v-model="requirement"
                      placeholder="Potrzeba zgłoszona przez osobę prezentującą"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <h5>Rekomendacja</h5>
          </el-form-item>
          <el-form-item>
            <el-input name="needTextInput"
                      :autosize="{ minRows: 6}"
                      type="textarea"
                      @change="dataChanged"
                      v-model="recommendation"
                      placeholder="Rekomendacja osoby prezentującej" />
          </el-form-item>
        </el-col>
      </el-row>
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
        requirement: '',
        recommendation: '',
        business_description: {
          description: ''
        }
      }
    },
    mounted() {
      this.fetchPeople()
    },
    beforeMount() {
      this.$store.dispatch('meetings/setUnsavedChanges', false)
      this.$store.dispatch('meetings/setActiveSpeechTableInd', null)
      this.$emit('clearSelection')
    },
    watch: {
      activeSpeechTableInd: function () {
        this.speech = this.$store.getters['meetings/activeSpeech']
        this.personInput = this.speech.person && this.speech.person.first_name + ' ' + this.speech.person.last_name
        this.requirementsCounter = this.speech && this.speech.requirements && this.speech.requirements.length
        this.recommendationsCounter = this.speech && this.speech.recommendations && this.speech.recommendations.length
        this.requirement = ''
        this.recommendation = ''
        if (this.requirementsCounter !== 0) {
          this.requirement = this.speech.requirements && this.speech.requirements[0].description
        }
        if (this.recommendationsCounter !== 0) {
          this.recommendation = this.speech.recommendations && this.speech.recommendations[0].description
        }
        if (this.speech.business_description === null) {
          this.business_description = {
            description: ''
          }
        } else {
          this.business_description = this.speech.business_description
        }

      }
    },
    methods: {
      async fetchPeople() {
        const result = await this.$axios.get('http://0.0.0.0:8000/people')
        result.data.forEach(function (e) {
          e.search_key = e.first_name + ' ' + e.last_name;
        })
        this.people = result.data
      },
      addNewPerson() {
        this.$swal.mixin({
          input: 'text',
          confirmButtonText: 'Next &rarr;',
          showCancelButton: true,
          progressSteps: ['1', '2']
        }).queue([
          {
            title: 'Imię i nazwisko',
            text: 'Podaj imię i nazwisko'
          },
          {
            title: 'Email',
            text: 'Podaj email'
          }
        ]).then((result) => {

          this.$axios.post('http://0.0.0.0:8000/groups/1/people', {
            first_name: result.value[0].split(" ")[0],
            last_name: result.value[0].split(" ")[1],
            email: result.value[1]
          }).then(() => {
            this.$swal({
              title: 'Dodano osobę',
              html:
              'Imię: ' + result.value[0].split(" ")[0] + ', Nazwisko: ' + result.value[0].split(" ")[1] + ', Email: ' + result.value[1],
              confirmButtonText: 'Ok'
            })
            this.fetchPeople()
          }).catch(() => {
            this.$notify({
              title: 'Operacja się nie powiodła',
              type: 'error',
              duration: 2000
            })
          });

        })
      },
      querySearch(queryString, cb) {
        const results = queryString ? this.people.filter(this.createFilter(queryString)) : this.people
        cb(results);
      },
      createFilter(queryString) {
        return (people) => {
          const name = people.first_name + ' ' + people.last_name
          const rev_name = people.last_name + ' ' + people.first_name
          return (name.toLowerCase().indexOf(queryString.toLowerCase()) === 0) ||
            (rev_name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
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
        this.speech.requirements = [{
          description: this.requirement
        }]
        this.speech.recommendations = [{
          description: this.recommendation
        }]
        const meetingId = this.activeMeetingEntityInd
        const speechId = this.activeSpeechEntityInd
        const speech = {
          person: this.speech.person,
          requirements: this.speech.requirements.filter(req => req.description !== ''),
          recommendations: this.speech.recommendations.filter(rec => rec.description !== ''),
          business_description: this.business_description
        }

        try {
          await this.$store.dispatch('meetings/updateSpeech', {
            meetingId: meetingId,
            speechId: speechId,
            speech: speech,
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
      },
      reset() {
        this.personInput = null,
          this.speech = {
            person: null,
            requirements: [],
            recommendations: []
          }
        this.requirementsCounter = 0,
        this.recommendationsCounter = 0,
        this.requirement = '',
        this.recommendation = ''
        this.business_description = {
          description: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
