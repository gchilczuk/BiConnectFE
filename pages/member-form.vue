<template>
  <b-container class="mt-4">
    <el-form label-width="100px">
      <el-form-item>
        <h5>Osoba: {{ name }}</h5>
        <h5>Wystąpienie z dnia: {{this.speech.date}}</h5>
      </el-form-item>
      <b-row>
        <b-col cols="12">
          <el-form-item>
            <h5>Opis firmy</h5>
          </el-form-item>
          <el-form-item>
            <el-input name="business_description"
                      :autosize="{ minRows: 3}"
                      type="textarea"
                      v-model="business_description.description"
                      placeholder="Opis firmy"
                      :disabled="disabled || speech.confirmed"
                      @input="changes = true"
            />
          </el-form-item>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="6">
          <el-form-item>
            <h5>Potrzeba</h5>
          </el-form-item>
          <el-form-item>
            <el-input name="needTextInput"
                      :autosize="{ minRows: 6}"
                      type="textarea"
                      v-model="requirement"
                      placeholder="Potrzeba zgłoszona przez osobę prezentującą"
                      style="width: 500px"
                      :disabled="disabled || speech.confirmed"
                      @input="changes = true"
            />
          </el-form-item>
        </b-col>
        <b-col cols="6">
          <el-form-item>
            <h5>Rekomendacja</h5>
          </el-form-item>
          <el-form-item>
            <el-input name="needTextInput"
                      :autosize="{ minRows: 6}"
                      type="textarea"
                      v-model="recommendation"
                      placeholder="Rekomendacja osoby prezentującej"
                      style="width: 500px"
                      :disabled="disabled || speech.confirmed"
                      @input="changes = true"/>
          </el-form-item>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <el-form-item>
            <el-button :type="disabled || !changes ? 'info' : 'success'"
                       @click="updateSpeech"
                        :disabled="disabled || !changes || speech.confirmed"> Akceptuj ze zmianami
            </el-button>
            <el-button :type="disabled || changes ? 'info' : 'success'"
                       @click="close"
                       :disabled="disabled || changes || speech.confirmed">
              Akceptuj bez zmian
            </el-button>
          </el-form-item>
        </b-col>
      </b-row>
    </el-form>
  </b-container>
</template>

<script>
  import {Route} from 'vue-router'

  export default {
    name: "SpeechForm",
    data() {
      return {
        speech: {
          requirements: [],
          recommendations: [],
          confirmed:	false
        },
        requirement: '',
        recommendation: '',
        business_description: {
          description: ''
        },
        disabled: false,
        changes: false,
      }
    },
    computed: {
      name() {
        if (this.speech.person && this.speech.person.first_name && this.speech.person && this.speech.person.last_name) {
          return this.speech.person.first_name + ' ' + this.speech.person.last_name
        }
        return ''
      }
    },
    mounted() {
      let meetingId = this.$route.query.m;
      let speechId = this.$route.query.s;
      this.$axios.get(`http://0.0.0.0:8000/groups/1/meetings/${meetingId}/speeches/${speechId}`)
        .then((res) => {
          this.speech = res.data
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
        })
    },
    methods: {
      async close() {
        try {
          let meetingId = this.$route.query.m;
          let speechId = this.$route.query.s;
          this.$axios.get(`http://0.0.0.0:8000/groups/1/meetings/${meetingId}/speeches/${speechId}/confirm`)

          this.$notify({
            title: 'Potwierdzono wypowiedź',
            type: 'success',
            duration: 2000
          })
          this.disabled = true
        } catch (error) {
          this.$notify({
            title: 'Wystąpił błąd podczas zapisu danych',
            type: 'error',
            duration: 2000
          })
        }
        this.disabled = true
      },
      async updateSpeech() {
        this.speech.requirements = [{
          description: this.requirement
        }]
        this.speech.recommendations = [{
          description: this.recommendation
        }]
        let meetingId = this.$route.query.m;
        let speechId = this.$route.query.s;
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
          this.$axios.get(`http://0.0.0.0:8000/groups/1/meetings/${meetingId}/speeches/${speechId}/confirm`)
          this.$notify({
            title: 'Zapisano zmiany',
            type: 'success',
            duration: 2000
          })
          this.disabled = true
        } catch (error) {
          this.$notify({
            title: 'Wystąpił błąd podczas zapisu danych',
            type: 'error',
            duration: 2000
          })
        }
      }
    }
  }
</script>
