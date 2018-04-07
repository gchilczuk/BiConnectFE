<template>
  <div>
    <el-container>
      <div>
        <el-aside width="600px">
          <speeches-list></speeches-list>
        </el-aside>
      </div>
      <el-main>
        <speech-form></speech-form>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import SpeechesList from "../components/SpeechesList";
  import SpeechForm from "../components/SpeechForm"

  export default {
    components: {
      SpeechesList,
      SpeechForm
    }

  }
</script>
