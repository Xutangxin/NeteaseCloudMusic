import {request} from './request'

export function getList(params) {
   return request({
    url: "/top/playlist/highquality",
    method: "get",
    params
  })
}

export function getSongList(params) {
    return request({
     url: "/top/playlist/",
     method: "get",
     params
   })
 }



