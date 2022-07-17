import Vue from "vue";
import Vuex from "vuex";
import musicboxOptions from './Musicbox'
import loginOptions from './Login'

Vue.use(Vuex);

// 创建并暴露store
export default new Vuex.Store({
    // 模块
    // Store里保存的东西都开始分类了
    modules: {
        musicAbout: musicboxOptions,
        loginAbout: loginOptions
    }
});