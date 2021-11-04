import axios from 'axios'

export function request(config) {
    let instance= axios.create({
        baseURL:'https://autumnfish.cn',
    })
    return instance(config)
}