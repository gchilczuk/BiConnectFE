<template>
    <div>
      <el-button v-on:click="next()"><i class="el-icon-arrow-left"></i></el-button>
      <el-button v-on:click="prev()"><i class="el-icon-arrow-right"></i></el-button>
      <el-button v-on:click="back()">Powrot</el-button>
    </div>
</template>

<script>
    export default {
        name: "navigation",
        methods: {
          next: function(){
            alert('next');
          },
          prev: function(){
            alert('prev');
          },
          back: function(){
            alert('powrot');
          }
      }
    }

</script>

<style scoped>

</style>
