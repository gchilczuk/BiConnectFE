<template>
    <div>
    <p>Kto:</p>
      <!--ikonka dzwieku -->
      <textarea type="text" name="personNamesInput" cols="80" rows="1"  v-model="personNames" />
      <p>Potrzeba:</p>
      <textarea type="text" name="needTextInput" cols="80" rows="15" v-model="needText"  />
      <p>Rekomendacja:</p>
      <textarea type="text" name="recommendationTextInput" cols="80" rows="15" v-model="recommendationText"/>

    </div>
</template>

<script>
    export default {
        name: "Secretary_Forms",
      data(){
          return{
            personNames : 'Jan Kowalski',
            needText: 'potrzeba',
            recommendationText : 'rekomandacja'
          }
      }

    }
</script>

<style scoped>

</style>
