import { get } from "../utils/request";

const api = {
  // 获取轮播图
  getBanner (params) {
    return get('/api/banner', params)
  },


  // 歌单标签
  getMusicTags (params) {
    return get("/api/playlist/catlist?", params)
  },

  // 不同分类下得歌单
  getPlaylist (params) {
    return get('/api/top/playlist?', params)
  },

  // 获取新歌
  getNewSongs (params) {
    return get('/api/personalized/newsong', params)
  },

  // 获取排行榜(名字和id)
  getRankingList (params) {
    return get('/api/toplist?', params)
  },

  // 获取排行榜歌曲
  getRankingListSongs (params) {
    return get('/api/playlist/track/all?', params)
  },

  // 获取mv排行榜(名字和歌手)
  getHotMvs (params) {
    return get('/api/top/mv?', params)
  },
  // 获取mv地址
  getHotMvUrl (params) {
    return get('/api/mv/url?', params)
  },
  // 获取歌曲地址
  getSongUrl (params) {
    return get('/api/song/url?', params)
  },
  // 获取歌词
  getSonglyrics (params) {
    return get('/api/lyric?', params)
  },
  // 搜索
  getSearchResult (params) {
    return get('/api/search?', params)
  },
  // 搜索的歌曲的封面
  getSongDetail (params) {
    return get('/api/song/detail?', params)
  },
  // 登录接口
  login (params) {
    return get('/api/login/cellphone?', params)
  }

};

export default api
