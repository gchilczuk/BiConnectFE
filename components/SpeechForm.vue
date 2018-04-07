<template>
  <div class="m-3">
    <el-row class="p-1p">
      <el-col :span="4">
        <label class="input-label" for="personNamesInput">Kto:</label>
      </el-col>
      <el-col :span="20">
        <el-input id="personNamesInput" name="personNamesInput"
                  type="text"
                  v-model="personNames"
                  placeholder="imie nazwisko"/>
      </el-col>
    </el-row>

    <el-row class="p-1p">
      <el-col :span="4">
        <label class="input-label" for="needTextInput">Potrzeba:</label>
      </el-col>
      <el-col :span="20">
        <el-input id="needTextInput" name="needTextInput"
                  :autosize="{ minRows: 4}"
                  type="textarea"
                  v-model="needText"
                  placeholder="potrzeba"/>
      </el-col>
    </el-row>

    <el-row class="p-1p">
      <el-col :span="4">
        <label for="recommendationTextInput">Rekomendacja:</label>
      </el-col>
      <el-col :span="20">
        <el-input id="recommendationTextInput" name="recommendationTextInput"
                  :autosize="{ minRows: 5}"
                  type="textarea"
                  v-model="recommendationText"
                  placeholder="rekomendacja"/>
      </el-col>

    </el-row>

    <el-row class="p-1p">
      <el-button type="primary">Zapisz</el-button>
    </el-row>

  </div>
</template>

<script>
  import ElContainer from "element-ui/packages/container/src/main";
  import ElMain from "element-ui/packages/main/src/main";
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    components: {
      ElRow,
      ElMain,
      ElContainer
    },
    name: "Secretary_Forms",
    data() {
      return {
        personNames: '',
        needText: '',
        recommendationText: ''
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
