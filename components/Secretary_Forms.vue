<template>
    <div>
    <p class="formelem" >Kto:</p>
      <el-input class="formelem"  type="text" name="personNamesInput"   v-model="personNames" placeholder="imie nazwisko" />
      <p class="formelem" ><br/>Potrzeba:</p>
      <el-input class="formelem"  type="textarea" name="needTextInput" :autosize="{ minRows: 5}"  v-model="needText" placeholder="potrzeba"  />
      <p class="formelem" ><br/>Rekomendacja:</p>
      <el-input class="formelem"  type="textarea" name="recommendationTextInput"  :autosize="{ minRows: 5}" v-model="recommendationText" placeholder="rekomendacja"/>

    </div>
</template>

<script>
    export default {
        name: "Secretary_Forms",
      data(){
          return{
            personNames : '',
            needText: '',
            recommendationText : ''
          }
      }

    }
</script>

<style scoped>
  .formelem{
    margin-left:30px;
  }

</style>
