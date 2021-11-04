import {request} from './request'

export function getList(params) {
   return request({
        url: "/search",
        method: "get",
        params
      })
}