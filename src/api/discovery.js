import {request} from './request'

export function getRecommendedLists() {
   return request({
        url: "/personalized",
        method: "get",
        params:{
            limit:7
        }
      })
}

export function getNewestMusic() {
    return request({
        url: "/personalized/newsong",
        method: "get",
        params: {
          limit: 8,
        }
       })
}

export function getMvs() {
    return request({
        url: "/personalized/mv",
        method: "get",
       })
}

export function getMusicUrl(id) {
    return request({
        url: "/song/url",
        method: "get",
        params: {
          id,
        },
      })
}
