<template>

  <div class="home-container">
    <Navbar></Navbar>
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) of bannerList" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <!-- tags -->
      <ul>
        <li ref="tag" v-for="(item, index) of tags" :key="index" @click="toPlaylist(index);active(index)"
          v-clickDown='index'>
          {{ item.name }}
        </li>
      </ul>
      <!-- 歌单展示 -->
      <div class="playlist-items">
        <img v-for="(item, index) of playlists" :src="item.coverImgUrl" :key="index" alt="" />
      </div>
    </div>
    <!-- 最新歌曲 -->
    <div class="newsongs">
      <h3 class="title">新歌速递</h3>
      <div class="newsongs-items">
        <div class="newsongs-infos" v-for="(item, index) of newSongs">
          <img :src="item.picUrl" :key="index" alt="" @click="toMusicBox(item)" />
          <div class="songInfo">
            <span @click="toMusicBox(item)">{{cutString(item.name)}}</span>
            <span>{{item.song.artists[0].name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="rankingList">
      <h3 class="title">排行榜</h3>
      <div class="lists">
        <div class="songList" v-for="(item, index) in rankingList" :key="index">
          <RankingList :listItem="item"></RankingList>
        </div>
      </div>
    </div>
    <!-- 热门mv -->
    <div class="hotMv">
      <h3 class="title">热门MV</h3>
      <div class="mvs">
        <img @click="toMusicVideo(item)" v-for="(item, index) in hotMvs" :key="index" :src="item.cover" alt="">
      </div>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
  import Navbar from "../components/Navbar";
  import RankingList from '../components/RankingList.vue'
  import Bottom from "../components/Bottom"

  export default {
    name: "home",
    components: {
      RankingList,
      Bottom,
      Navbar,
    },
    data() {
      return {
        isActive: true,
        bannerList: [],
        tags: [],
        playlists: [],
        newSongs: [],
        rankingList: [],
        hotMvs: [],
      };
    },
    created() { // 轮播图
      this.$api.getBanner({}).then((res) => { // console.log(res.banners)
        this.bannerList = res.banners
      });

      // 歌单标签名
      this.$api.getMusicTags({}).then((res) => { // console.log(res)
        this.tags = res.sub.slice(0, 6)
      });

      // 获取新歌
      this.$api.getNewSongs({}).then((res) => {

        this.newSongs = res.result.slice(0, 6)
      });

      // 获取歌曲排行榜(名字和id)
      this.$api.getRankingList({}).then((res) => {
        // console.log(res.list.slice(0, 4));
        this.rankingList = res.list.slice(0, 4)
      });

      // 获取mv排行榜(名字和歌手)
      this.$api.getHotMvs({
        limit: 4
      }).then((res) => {
        // console.log(res.data);
        this.hotMvs = res.data
      })
    },

    // 第一次进入就自动触发推荐歌单的点击事件
    directives: {
      clickDown: {
        inserted(el, binding, index) {
          if (binding.value === 0) {
            el.click()
          }
        }
      }
    },

    methods: { // 根据标签名得歌单
      toPlaylist(index) {
        this.$api.getPlaylist({
          limit: 8,
          cat: this.tags[index].name
        }).then((res) => {
          // console.log(res.playlists[0].coverImgUrl)
          this.playlists = res.playlists
        });
      },
      // 截取字符串，避免歌名太长
      cutString(str) {
        if (str.length > 8) {
          return str.substring(0, 8) + "...";
        } else {
          return str;
        }
      },
      // 给选中项添加属性
      active(index) {
        this.$refs.tag.forEach(item => {
          item.className = ''
        });
        this.$refs.tag[index].className = 'active'
      },

      // 路由,跳转到播放MV
      toMusicVideo(item) {
        // console.log(this.$router);
        this.$router.push({
          name: 'musicvideo',
          query: {
            id: item.id,
            mvName: item.name,
            pic: item.cover
          }
        })
      },
      // 路由到音乐盒
      toMusicBox(item) {
        this.$router.push({
          name: 'musicbox',
          query: {
            id: item.id,
            picUrl: item.picUrl,
            name: item.name,
            singer: item.song.artists[0].name,
            duration: item.song.duration
          }
        })
      }
    }
  };
</script>

<style></style>