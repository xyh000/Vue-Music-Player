<template lang="">
  <div class="container">
    <div class="top-box">
      <img src="../assets/image/logo.png" alt="">
      <ul>

        <router-link tag="li" active-class="nav-active" exact to="/">首页</router-link>

        <router-link tag="li" active-class="nav-active" to="/playlist">歌单</router-link>

        <router-link tag="li" active-class="nav-active" to="/singers">歌手</router-link>

        <router-link tag="li" active-class="nav-active" to="/mine">我的</router-link>

        <router-link tag="li" active-class="nav-active" to="/musicbox">音乐盒</router-link>
      </ul>
      <div class="search">
        <input @keyup.enter="toSearch" v-model="keyWord" type="text" placeholder="搜索音乐" />
      </div>
      <div class="user-info">
        <router-link tag="span" to="/login">
          登录
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'navbar',
    components: {},
    data() {
      return {
        keyWord: ''
      }
    },
    methods: {
      // 路由跳转到搜索结果
      toSearch() {
        if (this.keyWord) {
          this.$router.push({
            name: 'search',
            query: {
              keyword: this.keyWord
            }
          })
        }
      },
    },
  }
</script>
<style lang="">

</style>