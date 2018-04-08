<template>
  <el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">Twoje dane</el-menu-item>
    <el-menu-item index="/">Twoje potrzeby</el-menu-item>
    <el-menu-item index="/">Twoje rekomendacje</el-menu-item>
    <el-menu-item index="meetings-menu">Spotkania</el-menu-item>
    <el-menu-item index="/">Statystyki</el-menu-item>
    <el-menu-item index="/">Wyloguj</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
