import {request} from './request'

export function getList(params) {
   return request({
        url: "/top/song",
        method: "get",
        params
      })
}