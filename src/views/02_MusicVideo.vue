<template>
    <div class="musicvideo">
        <div class="mvItem">
            <video :src="mvUrl.url" controls loop autoplay muted></video>
            <span>{{this.$route.query.mvName}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'musicvideo',
        data() {
            return {
                mvUrl: []
            }
        },
        created() {
            this.$api.getHotMvUrl({
                id: this.$route.query.id
            }).then((res) => {
                this.mvUrl = res.data
            })
        },
    }
</script>
<style lang="">

</style>