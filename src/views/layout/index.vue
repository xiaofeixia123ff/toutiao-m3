<template>
  <div class="layout-container">
    layout页面
    <!-- 子路由出口 -->
    <router-view/>
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <!-- route: 开启路由模式 -->
    <van-tabbar class="layout-tabbar" v-model="active">
        <van-tabbar-item to="/">
            <i slot="icon" class="toutiao toutiao-shouye"></i>
            <span class="text">首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
            <i slot="icon" class="toutiao toutiao-wenda"></i>
            <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/video">
            <i slot="icon" class="toutiao toutiao-shipin"></i>
            <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="/my">
            <i slot="icon" class="toutiao toutiao-wode"></i>
            <span class="text">我的</span>
        </van-tabbar-item>
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
    .layout-tabbar{
        i.toutiao {
            font-size: 40px;
        }
    }
}

</style>
