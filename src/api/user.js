/* 用户请求相关模块 */
import request from '@/utils/request'

/* 用户登录 */
export const login = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/* 发送短信验证码 */
export const getSmsCode = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
