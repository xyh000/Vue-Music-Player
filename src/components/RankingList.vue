<template>
    <div class="listSongItem">
        <span>{{listItem.name}}</span>
        <hr noshade>
        <ol>
            <li v-for="(item, index) in Rankingsongs" :key="index">
                <span> {{index + 1}}</span>
                {{cutString(item.name)}}
            </li>
        </ol>
    </div>
</template>
<script>
    export default {
        name: 'RankingList',
        props: ['listItem'],
        data() {
            return {
                Rankingsongs: []
            }
        },
        created() {
            this.$api.getRankingListSongs({
                id: this.listItem.id
            }).then((res) => {
                // console.log(res.songs.slice(0, 5));
                this.Rankingsongs = res.songs.slice(0, 8)
            })
        },
        methods: {
            // 截取字符串，避免歌名太长
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