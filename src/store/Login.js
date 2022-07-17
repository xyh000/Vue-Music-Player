const loginOptions = {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',   // token
    },
    actions: {

    },
    mutations: {
        setToken (state, value) { // 设置存储token
            console.log(state);
            state.token = value;
            localStorage.setItem('token', value);
        },
    },

    getters: {

    }
}

export default loginOptions