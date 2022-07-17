<template lang="">
  <div class="search-container">
    <Navbar></Navbar>
    <div class="result">
      <el-table :data="tableData" stripe style="width: 1100px" @row-click="toMusicBox">
        <el-table-column prop="song" label="歌曲" width="200px" align="center">
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="200px" align="center">
        </el-table-column>
        <el-table-column prop="album" label="专辑" width="400px" align="center">
        </el-table-column>
        <el-table-column prop="duration" label="时长" width="300px" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import Navbar from "../components/Navbar";
  export default {
    name: 'search',
    components: {
      Navbar,
    },
    data() {
      return {
        tableData: [],
        result: [],
        resultData: [],
        // picUrl: ''
      }
    },
    created() {

      this.$api.getSearchResult({
        keywords: this.$route.query.keyword
      }).then((res) => {
        // console.log(res.result.songs);
        this.result = res.result.songs
        this.result.forEach(item => {
          // var picUrl = this.getPicUrl(item.id)
          // alert(picUrl)
          var output = {
            id: item.id,
            song: item.name,
            singer: item.artists[0].name,
            album: item.album.name,
            // album: this.cutString(item.album.name),
            duration: this.songDuration(item.duration),
            // all: item
            oldDuration: item.duration,
            picUrl: this.getPicUrl(item.id)
          }
          this.tableData.push(output)
          // alert(PicUrl)
        });
      })



    },
    methods: {
      toMusicBox(row) {
        this.$api.getSongDetail({
          ids: row.id,
        }).then((res) => {
          console.log(res.songs[0].al.picUrl);
          // this.picUrl = res.songs[0].al.picUrl
          // return res.songs[0].al.picUrl
          this.$router.push({
            name: 'musicbox',
            query: {
              id: row.id,
              // picUrl: row.all.artists[0].img1v1Url,
              // picUrl: 'http://p4.music.126.net/8y8KJC1eCSO_vUKf2MyZwA==/109951165796899183.jpg',
              // picUrl: row.picUrl,
              picUrl: res.songs[0].al.picUrl,
              // picUrl: url,
              name: row.song,
              singer: row.singer,
              duration: row.oldDuration
            }
          })

        })


        // this.$router.push({
        //   name: 'musicbox',
        //   query: {
        //     id: row.id,
        //     // picUrl: row.all.artists[0].img1v1Url,
        //     // picUrl: 'http://p4.music.126.net/8y8KJC1eCSO_vUKf2MyZwA==/109951165796899183.jpg',
        //     picUrl: row.picUrl,
        //     // picUrl: url,
        //     name: row.song,
        //     singer: row.singer,
        //     duration: row.oldDuration
        //   }
        // })
        console.log(row);
        console.log(query);
      },
      getPicUrl(id) {
        this.$api.getSongDetail({
          ids: id,
        }).then((res) => {
          console.log(res.songs[0].al.picUrl);
          // this.picUrl = res.songs[0].al.picUrl
          return res.songs[0].al.picUrl
        })
      },
      // getPicUrl(row) {
      //   this.$api.getSongDetail({
      //     ids: row.id,
      //   }).then((res) => {
      //     // console.log(res.songs[0].al.picUrl);
      //     this.picUrl = res.songs[0].al.picUrl
      //   })
      // },
      songDuration(time) {
        let min = parseInt(time / 1000 / 60)
        let sec = parseInt((time / 1000) % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        return min + ':' + sec
      },
      // 截取字符串，避免太长
      cutString(str) {
        if (str.length > 8) {
          return str.substring(0, 8) + "...";
        } else {
          return str;
        }
      },
    },


  }
</script>
<style lang="">

</style>