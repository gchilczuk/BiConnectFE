<template>
    <div>
    <p>Kto:</p>
      <el-input  type="text" name="personNamesInput"   v-model="personNames" placeholder="imie nazwisko" />
      <p><br/>Potrzeba:</p>
      <el-input type="textarea" name="needTextInput" :autosize="{ minRows: 5}"  v-model="needText" placeholder="potrzeba"  />
      <p><br/>Rekomendacja:</p>
      <el-input type="textarea" name="recommendationTextInput"  :autosize="{ minRows: 5}" v-model="recommendationText" placeholder="rekomendacja"/>

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

</style>
