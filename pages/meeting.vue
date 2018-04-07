<template>
  <div>
    <el-container>
      <div>
        <el-aside width="600px">
          <speeches-list></speeches-list>
        </el-aside>
      </div>
      <el-main>
        main
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import SpeechesList from "../components/SpeechesList";

  export default {
    components: {
      SpeechesList
    }

  }
</script>
