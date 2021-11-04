import {request} from './request'

export function getList(params) {
   return request({
        url: "/mv/all",
        method: "get",
        params
      })
}