<template>
<div>
  <h1 class="speeches" >Wystąpienia:</h1>
  <p> <nuxt-link to="formPage"> <el-button  class="buttonaddspeech" type="success"><i class="el-icon-plus"></i>Dodaj nowe wystąpienie</el-button></nuxt-link></p>
  <p> <el-button v-on:click="goToSpeech" class="buttonspeech" type="info" plain >Jan Kowalski </el-button></p>
  <p> <el-button v-on:click="goToSpeech" class="buttonspeech" type="info" plain>Jan Nowak </el-button></p>
  <p> <el-button v-on:click="goToSpeech" class="buttonspeech" type="info" plain>Adam Kowalski </el-button></p>
  <p> <el-button v-on:click="goToSpeech"  class="buttonspeech" type="info" plain>Jan Kowalski </el-button></p>
</div>
</template>

<script>
    export default {
        name: "SpeechesList",
      methods:{

        goToSpeech() {
          alert("Go");
        }
      }
    }
</script>

<style scoped>
  .speeches{
    margin-left:50px;
    padding-bottom:20px;
  }


  .buttonaddspeech{
    margin-left:50px;
    font-size: 25px;
    height:60px;
    width:500px;
   margin-bottom: 10px;
  }

  .buttonspeech{
    margin-left:50px;
    height:40px;
    width:500px;
  }
</style>
