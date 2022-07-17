<!-- <template lang="">
  <div>
    <home/>
  </div>
</template>
<script>
  import home from './views/01_home.vue'
export default {
  name: 'app',
  components: {
    home
  }
}
</script>
<style lang="">
  
</style> -->
<template lang="">
  <div>
    <!-- <Navbar></Navbar> -->
    <!-- <div class="middle-box"></div> -->
    <router-view :key="$route.fullPath"></router-view>
    <!-- <keep-alive include="musicbox">
      <router-view></router-view>

    </keep-alive> -->
    <!-- <Bottom></Bottom> -->
  </div>
</template>
<script>
  import Navbar from "./components/Navbar";

  export default {
    name: "app",
    components: {
      Navbar,
    },

  };
</script>
<style lang="css">
  .middle-box {
    background-color: #475669;
    width: 100%;
    height: 100%;
  }
</style>