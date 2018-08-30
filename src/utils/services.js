import {
  request,
  Base64
} from './helper'

/**
 * 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
export const login = (username, password) => {
  wx.setStorageSync('base64Account', Base64.encode(`${username}:${password}`))
  return request('/user')
}
