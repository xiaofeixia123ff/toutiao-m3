<template>
  <div class="my-container">
    <!-- 已登录 头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avater" fit="cover" round :src="userInfo.photo" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录 头部 -->

    <!-- 未登录状态 头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- /未登录状态 头部 -->

    <!-- 宫格导航、历史  -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航、历史 -->

    <!-- 消息通知，小智同学，退出登录 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link class="mb9" />
    </van-cell-group>
    <van-cell v-if="user" title="退出登录" clickable class="lgout-cell" @click="onLgout" />
    <!-- /消息通知，小智同学，退出登录 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myIndex',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 初始化的时候，如果用户登录了，我才能请求当前登录用户的信息
    if (this.$store.state.user) {
      this.loadUser()
    }
  },
  methods: {
    async loadUser () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast.fail('获取数据失败')
      }
    },
    onLgout () {
      this.$dialog.confirm({
        title: '确认要退出吗？'
      })
        .then(() => {
          // on confirm
          // console.log('确认执行这里');
          // 确认退出：清除登录状态（容器中的user+本地存储的user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    }
  }

}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
  }

  // 未登录头部的样式
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  // 已登录头部的样式
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avater {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }

        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-stats {
      display: flex;

      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  // 宫格导航 收藏、历史 样式
  .grid-nav {
    .grid-item {
      height: 141px;

      i.toutiao {
        font-size: 45px;
      }

      i.toutiao-shoucang {
        color: #eb5253;
      }

      i.toutiao-lishi {
        color: #ff9d1b;
      }

      span.text {
        font-size: 28px;
      }
    }
  }

  .lgout-cell {
    text-align: center;
    color: #eb5253;
    margin-top: 10px;
  }

}
</style>
