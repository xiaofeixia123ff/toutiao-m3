/* 用户请求相关模块 */
// import store from '@/store'
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

/* 获取用户的自己信息 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
    // 发送请求头数据
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   // token字符串数据格式：Bearer token数据，注意 Bearer 后面有个小空格
    //   Authorization:`Bearer ${store.state.user.token}`
    // }
  })
}
