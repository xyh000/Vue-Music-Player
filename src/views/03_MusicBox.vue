<template lang="">
    <!-- <div class="music-box" :style="{ backgroundImage:'url('+ bgi +')' }"> -->
    <div class="music-box" :style="{ backgroundImage:'url('+ defaultbg +')' }">
        <div class="mask">
            <div class="music-top">
                <div class="top-left-box">
                    <img src="../assets/image/logo.png" alt="" />
                </div>
                <div class="top-right-box">
                    <div class="search">
                        <input type="text" placeholder="搜索音乐、MV、歌单用户" />
                        <!-- <button>Search</button> -->
                    </div>
                </div>
            </div>
            <div class="music-middle">
                <div class="middle-left-box">
                    <div class="songs-list">
                        <el-table :data="tableData" style="width: 860px" height="350" @row-click="playMusic"
                            type="index">
                            <el-table-column prop="songIndex" label="序号" width="60px" align="center">
                            </el-table-column>
                            <el-table-column prop="song" label="歌曲" width="200px" align="center">
                            </el-table-column>
                            <el-table-column prop="singer" label="歌手" width="300px" align="right">
                            </el-table-column>
                            <el-table-column prop="duration" label="时长" width="300px" align="center">
                            </el-table-column>
                        </el-table>

                    </div>
                </div>
                <div class="middle-right-box">
                </div>
            </div>
            <div class="music-bottom">
                <!-- <audio :src="musicUrl" controls loop autoplay muted></audio> -->
                <aplayer width="800px" autoplay :music="{
          title: name,
          artist: singer,
          src: musicUrl,
          pic: this.$route.query.picUrl,
        }" />

            </div>
        </div>
    </div>
</template>
<script>
    import Defaultbg from '../assets/image/Bgmusicbox.jpg'
    import Aplayer from "vue-aplayer";
    export default {
        name: "musicbox",
        components: {
            Aplayer,
        },
        data() {
            return {
                tableData: JSON.parse(localStorage.getItem("songs")) || [],
                // tableData: [],
                // musicList: [],
                Defaultbg,
                name: '',
                singer: '',
                musicUrl: "",
                bgi: 'url(' + this.$route.query.picUrl + ')',
                duration: this.$route.query.duration,
                existList: JSON.parse(localStorage.getItem("id")) || [],
                id: this.$route.query.id,
                defaultbg: '',
                songIndex: JSON.parse(localStorage.getItem("songs")) === null ? 1 : JSON.parse(localStorage.getItem(
                    "songs")).length + 1
            };
        },

        created() {
            console.log('执行created了');
            // 存在参数才调用
            if (this.$route.query.id) {
                this.$api
                    .getSongUrl({
                        id: this.$route.query.id,
                    })
                    .then((res) => {
                        // console.log(res.data[0])
                        this.musicUrl = res.data[0].url
                        this.name = this.$route.query.name
                        this.singer = this.$route.query.singer
                    });
                this.duration = this.songDuration(this.duration)
                var item = {
                    songIndex: this.songIndex,
                    song: this.$route.query.name,
                    singer: this.$route.query.singer,
                    duration: this.duration,
                    detail: this.$route.query
                }
                this.insertSongs(item, this.id)
                this.defaultbg = this.$route.query.picUrl
            } else {
                // 避免出现undefined
                this.name = ' '
                this.singer = ' '
                this.defaultbg = this.Defaultbg
            }
            // 获得歌词
            // this.$api.getSonglyrics({
            //     id: this.$route.query.id
            // }).then((res) => {
            //     console.log(res);
            // })
            // 歌曲时长


        },
        methods: {

            // 歌曲时长
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
            insertSongs(value, id) {
                console.log(typeof (id));
                if (this.existList.indexOf(Number(id)) == -1) {
                    console.log(id);
                    this.existList.push(Number(id))
                    this.tableData.push(value)
                } else {
                    console.log('已存在');
                }
            },
            playMusic(row) {
                console.log('音乐信息', row);
                this.$router.replace({
                    name: 'musicbox',
                    query: {
                        ...row.detail
                    }
                })
                // this.$router.go()

            }
        },
        watch: {
            tableData: {
                // 深度监视
                deep: true,
                handler(value) {
                    localStorage.setItem("songs", JSON.stringify(value));
                    // alert('添加了');
                },
            },
            existList: {
                // 深度监视
                deep: true,
                handler(value) {
                    localStorage.setItem("id", JSON.stringify(value));
                },
            },
        },
    };
</script>
<style scoped>
    /* 播放器 */
    .aplayer {
        width: 900px !important;
        margin: auto;

        bottom: 0;
    }

    /*表格滚动条和字体颜色*/
    .el-table {
        border-bottom: 0;
        color: rgba(255, 255, 255, 0.6);
    }

    .el-table ::-webkit-scrollbar {
        width: 5px;
        /*滚动条粗细*/
    }

    .el-table ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }

    .el-table ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
    }
</style>