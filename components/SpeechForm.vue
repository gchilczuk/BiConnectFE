<template>
  <div>
    <el-form label-width="120px" v-if="activeSpeech">
      <el-form-item label="Osoba">
        <el-input id="personNamesInput" name="personNamesInput"
                  type="text"
                  v-model="speechName"
                  placeholder="Imię i nazwisko osoby prezentującej"
                  @blur="quickSave" />
      </el-form-item>

      <el-form-item>
        Potrzeby<br/>
        <el-button type="primary" @click="addNeed" size="small" plain>Nowa potrzeba</el-button>
        <el-button type="primary" @click="decreaseNeed" size="small" plain>Usuń</el-button>
      </el-form-item>
      <el-form-item v-for="nr in needCounter" v-bind:key="nr" v-bind:label="'Potrzeba '+nr">
        <el-input v-bind:key="nr" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  v-model="speechNeeds"
                  placeholder="Potrzeba zgłoszona przez osobę prezentującą"
                  @blur="quickSave"/>
      </el-form-item>

      <el-form-item>
        Rekomendacje <br/>
        <el-button type="primary" @click="addRecommendation" size="small" plain>Nowa rekomendacja</el-button>
        <el-button type="primary" @click="decreaseRecommendation" size="small" plain>Usuń</el-button>
      </el-form-item>
      <el-form-item v-for="nr in recommendCounter" v-bind:key="nr" v-bind:label="'Rekomendacja '+nr">
        <el-input v-bind:key="nr" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  v-model="speechRecommendations"
                  placeholder="Rekomendacja osoby prezentującej"
                  @blur="quickSave"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Zapisz</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getters} from "../store";

  export default {
    name: "SpeechForm",
    data() {
      return {
        needCounter: 0,
        recommendCounter: 0,
      }
    },
    computed: {
      activeSpeech: {
        get() {
          console.log('ELOELO', this.$store.getters['meetings/activeSpeechInd'])
          return this.$store.getters.activeSpeechInd || 1},
      },
      speechName:{
        get() {return this.$store.getters.speechName},
        set(value){}
      },
      speechNeeds:{
        get() {return this.$store.getters.speechNeeds},
      },
      speechRecommendations:{
        get() {return this.$store.getters.speechRecommendations},
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
        if (this.needCounter > 0)
          this.recommendCounter -= 1
      },
      quickSave() {
        console.log('ELOELO', this.$store.getters.activeSpeechInd)

        this.$store.dispatch('saveSpeech', this.speech)
      },
      onSubmit() {
        this.speech.needs = this.speech.needs.slice(0, this.needCounter)
        this.speech.recommendations = this.speech.recommendations.slice(0, this.recommendCounter)
        quickSave()
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
  .m-3 {
    margin: 30px;
  }

  .p-1p {
    padding: 2%;
  }

</style>
