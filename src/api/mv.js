import {request} from './request'

export function getMvUrl(params) {
   return request({
        url: "/mv/url",
        method: "get",
        params
      })
}

export function getRelatedMv(params) {
    return request({
         url: "/simi/mv",
         method: "get",
         params
       })
}

export function getMvInfo(params) {
    return request({
         url: "/mv/detail",
         method: "get",
         params
       })
}

export function getSingerInfo(params) {
    return request({
         url: "/artists",
         method: "get",
         params
       })
}

export function getComments(params) {
    return request({
         url: "/comment/mv",
         method: "get",
         params
       })
}

