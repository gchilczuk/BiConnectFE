<template>
<div>
  <h1 class="speeches" >Wystąpienia:</h1>
  <p> <el-button  class="buttonaddspeech" ><nuxt-link to="/"> <i class="el-icon-plus"></i>Dodaj nowe wystąpienie</nuxt-link></el-button> </p>
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
    background-color: limegreen ;
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
