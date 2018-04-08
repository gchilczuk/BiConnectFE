<template>
  <div>
    <b-container class="mt-4">
    <el-form label-width="120px" v-if="activeSpeech">
      <el-form-item label="Osoba">
        <el-input id="personNamesInput" name="personNamesInput"
                  type="text"
                  v-model="speechName"
                  placeholder="Imię i nazwisko osoby prezentującej" />
      </el-form-item>

      <el-form-item>
        Potrzeby<br/>
        <el-button type="primary" @click="addNeed" size="small" plain>Nowa potrzeba</el-button>
        <el-button type="primary" @click="decreaseNeed" size="small" plain>Usuń</el-button>
      </el-form-item>
      <el-form-item v-for="nr in needCounter" v-bind:key="'needItem'+nr" v-bind:label="'Potrzeba '+nr">
        <el-input v-bind:key="'needInput'+nr" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  v-model="needs[nr-1]"
                  placeholder="Potrzeba zgłoszona przez osobę prezentującą"
                  @blur="quickSaveNeeds"/>
      </el-form-item>

      <el-form-item>
        Rekomendacje <br/>
        <el-button type="primary" @click="addRecommendation" size="small" plain>Nowa rekomendacja</el-button>
        <el-button type="primary" @click="decreaseRecommendation" size="small" plain>Usuń</el-button>
      </el-form-item>
      <el-form-item v-for="nr in recommendCounter" v-bind:key="'recommendItem'+nr" v-bind:label="'Rekomendacja '+nr">
        <el-input v-bind:key="'recommendInput'+nr" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  v-model="recommendations[nr-1]"
                  placeholder="Rekomendacja osoby prezentującej"
                  @blur="quickSaveRecommendations"/>
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
  import {getters} from "../store";

  export default {
    name: "SpeechForm",
    data() {
      return {
        needCounter: 0, //this.$store.getters['meetings/speechNeeds'].length,
        recommendCounter: 0, //this.$store.getters['meetings/speechRecommendations'].length,
        needs: this.$store.getters['meetings/speechNeeds'].slice(0),
        recommendations: this.$store.getters['meetings/speechRecommendations'].slice(0)
      }
    },
    computed: {
      activeSpeech: {
        get() {
          console.log('ELOELO', this.$store.getters['meetings/speechName'])
          return this.$store.getters['meetings/speechName']},
      },
      speechName:{
        get() {return this.$store.getters['meetings/speechName']},
        set(value){this.$store.dispatch('meetings/setSpeechName', value)}
      }
    },

    methods: {
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
      quickSaveNeeds() {
        this.$store.dispatch('meetings/setSpeechNeeds', this.needs)
      },
      quickSaveRecommendations() {
        this.$store.dispatch('meetings/setSpeechRecommendations', this.recommendations)
      },
      onSubmit() {
        this.needs = this.needs.slice(0, this.needCounter)
        this.recommendations = this.recommendations.slice(0, this.recommendCounter)
        this.quickSaveNeeds()
        this.quickSaveRecommendations()
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
