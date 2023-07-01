<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录"/>
        <!-- /导航栏 -->

        <!-- 登录表单 -->
        <!--
            表单验证：
            1. 给van-field组件配置 rules 验证规则
            2. 当表单提交的时候会自动触发表单验证
                如果验证通过，会触发 submit事件
                如果验证不通过，不会触发 submit 事件
         -->
        <van-form ref="loginForm" @submit="onLogin">
            <van-field
            v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="userFormRules.mobile"
                maxlength = '11'
            >
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
            v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules="userFormRules.code"
                maxlength="6"
            >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template slot="button">
                    <!--
                        time: 倒计时时间
                    -->
                    <van-count-down
                    v-if="isCountDownShow"
                    :time="1000 * 60"
                    format="ss s"
                    @finish="isCountDownShow= false"
                    />

                    <van-button
                    v-else
                    class="send-sms-btn"
                    round type="default"
                    size="mini"
                    @click="onSendSms"
                    native-type="button">
                        发送验证码
                    </van-button>
                </template>

            </van-field>
            <div class="login-btn-wrap">
                <van-button
                class="login-btn"
                block type="info"
                native-type="onLogin">
                    登录
                </van-button>
            </div>
        </van-form>
        <!-- /登录表单 -->
    </div>
</template>

<script>
import { login, getSmsCode } from '../../api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          }, {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  methods: {
    async onLogin () {
      // 1. 获取表单数据
      // 2. 表单验证
      // 3. 提交表单请求登录
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const { data } = await login(this.user)
        console.log(data)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.push('/my')
      } catch (err) {
        console.log('登录失败', err)
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败')
        }
      }
      // 2. 根据请求响应结果处理后续操作
    },

    async onSendSms () {
      console.log('onSendSms')
      // 1. 验证手机号
      // 在表单中，除了提交按钮外，可能还有一些其他的功能性按钮，如发送验证码按钮。在使用这些按钮时，要注意将native-type设置为button，否则会触发表单提交。
      // <van-button native-type="button">发送验证码</van-button>
      try {
        // 通过 ref 可以获取到 Form 实例并调用实例方法，validate 验证表单，支持传入 name 来验证单个或部分表单项
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 通过验证，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        const { data } = await getSmsCode(this.user.mobile)
        console.log(data)
        this.$toast.success('发送成功')
      } catch (err) {
        console.log(err)
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 492) {
          this.$toast('发送太频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
    .toutiao {
        font-size: 37px;
    }
    .send-sms-btn {
        height: 46px;
        line-height: 46px;
        background-color: #ededed;
        font-size: 22px;
        color: #666;
    }
    .login-btn-wrap {
        padding: 53px 33px;
        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>
