<template>
  <div>
    <b-container class="mt-4">
      <el-form label-width="120px" v-if="activeSpeech">
        <b-row>
          <b-col>
            <el-form-item>
              <el-button type="primary" @click="close">Zamknij</el-button>
            </el-form-item>
          </b-col>
          <b-col  class="text-right">
            <el-form-item >
              <el-upload action="#">
                <span class="mr-1">Użyj nagrania </span>
                <el-button size="small" type="success" circle><i class="el-icon-upload el-icon-right"></i></el-button>
              </el-upload>
            </el-form-item>
          </b-col>
        </b-row>
        <el-form-item label="Osoba">
          <b-row>
            <b-col>
              <el-input id="personNameInput" name="personNamesInput"
                        type="text"
                        v-model="speech.name"
                        placeholder="Imię"
                        @blur="quickSave"/>
            </b-col>
            <b-col>
              <el-input id="personSurnameInput" name="personNamesInput"
                        type="text"
                        v-model="speech.surname"
                        placeholder="Nazwisko"
                        @blur="quickSave"/>
            </b-col>
          </b-row>
          <el-checkbox v-model="speech.guest" size="medium" border>Gość</el-checkbox>
        </el-form-item>

        <el-form-item>
          <h5>Potrzeby</h5>
          <b-row>
            <span class="ml-3">
              <el-button type="primary" @click="addNeed" size="small" plain>Nowa potrzeba</el-button>
              <el-button type="primary" @click="decreaseNeed" size="small" plain>Usuń</el-button>
            </span>
          </b-row>
        </el-form-item>
        <el-form-item v-for="nr in needCounter" v-bind:key="'needItem'+nr" v-bind:label="'Potrzeba '+nr">
          <el-input v-bind:key="'needInput'+nr" name="needTextInput"
                    :autosize="{ minRows: 4}"
                    type="textarea"
                    v-model="speech.needs[nr-1]"
                    placeholder="Potrzeba zgłoszona przez osobę prezentującą"
                    @blur="quickSave"/>
        </el-form-item>

        <el-form-item>
          <h5>Rekomendacje</h5>

          <b-row>
            <span class="ml-3">
              <el-button type="primary" @click="addRecommendation" size="small" plain>Nowa rekomendacja</el-button>
              <el-button type="primary" @click="decreaseRecommendation" size="small" plain>Usuń</el-button>
            </span>
          </b-row>
        </el-form-item>
        <el-form-item v-for="nr in recommendCounter" v-bind:key="'recommendItem'+nr" v-bind:label="'Rekomendacja '+nr">
          <el-input v-bind:key="'recommendInput'+nr" name="needTextInput"
                    :autosize="{ minRows: 4}"
                    type="textarea"
                    v-model="speech.recommendations[nr-1]"
                    placeholder="Rekomendacja osoby prezentującej"
                    @blur="quickSave"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Zapisz</el-button>
        </el-form-item>
      </el-form>
    </b-container>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "SpeechForm",
    mounted() {
      this.loadData()
    },
    data() {
      return {

        speech: {
          id: null,
          name: '',
          surname: '',
          needs: [],
          recommendations: [],
          guest: false
        },
        needCounter: 0,
        recommendCounter: 0,
      }
    },
    watch: {
      a: function (val, oldVal) {
        if (val !== null && typeof val !== 'undefined')
          this.loadData()
      }
    },
    computed: {
      activeSpeech() {
        return this.$store.getters['meetings/activeSpeechInd'] != null
      },
      speeches() {
        return this.$store.getters['meetings/speeches']
      },
      a: {
        get() {
          return this.$store.getters['meetings/activeSpeechInd']
        }
      },
    },

    methods: {
      loadData() {
        if (this.speeches.length > 0) {
          this.speech.id = this.$store.getters['meetings/activeSpeechInd']
          let sp = this.speeches.find(speech => speech.id === this.speech.id)
          if (sp != null) {
            this.speech.needs = sp.needs.slice(0)
            this.speech.recommendations = sp.recommendations.slice(0)
            this.needCounter = sp.needs.length
            this.recommendCounter = sp.recommendations.length
            this.speech.name = sp.name
            this.speech.surname = sp.surname
            this.speech.guest = sp.guest
          }
        }
      },
      close() {
        this.$store.dispatch('meetings/setActiveSpeech', null)
      },
      addNeed() {
        this.needCounter += 1
      },
      decreaseNeed() {
        if (this.needCounter > 0)
          this.needCounter -= 1
      },
      addRecommendation() {
        this.recommendCounter += 1
      },
      decreaseRecommendation() {
        if (this.recommendCounter > 0)
          this.recommendCounter -= 1
      },
      quickSave() {
        this.$store.dispatch('meetings/setSpeech', Object.assign({}, this.speech))
      },
      onSubmit() {
        this.speech.needs = this.speech.needs.slice(0, this.needCounter)
        this.speech.recommendations = this.speech.recommendations.slice(0, this.recommendCounter)
        this.quickSave()
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
