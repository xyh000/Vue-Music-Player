<template lang="">
    <div class="mine">
        <p v-if="token">尚未登录</p>
        <p v-else>已经登录了</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                token: ''
            }
        },
        methods: {
            getToken() {
                this.token = localStorage.getItem('token')
            }
        },
    }
</script>
<style scoped>

</style>