<template>
    <div class="settings-view">
        <!-- <f7-searchbar
        cancel-link="Cancel"
        placeholder="Search in items"
        :clear="true"
        ></f7-searchbar> -->
        <f7-list class="user-profile">
            <f7-list-item @click="userSwitch" link="#">
                <div slot="inner-start" class="detail" v-if="this.isLogin">
                    <!-- <div class="name">{{userInfo.nickName}}</div> -->
                    <div class="user_name">
                        <span>{{$t('app.username')}}: </span>
                        <span v-if='userInfo.account.extra == null'>{{$t('app.unnick')}}</span>
                        <span v-else>{{userInfo.account.extra.str1}}</span>
                    </div>
                    <div class="user_address">
                        <span>{{$t('app.address')}}: </span>
                        <span>{{address}}</span>
                    </div>
                </div>
                <div slot="inner-start" class="detail" v-else>
                    <div class="name">{{$t('app.unlogin')}}</div>
                </div>
            </f7-list-item>
        </f7-list>
        <f7-list>
            <f7-list-item :title="$t('app.language')" link="/language/" media="<i class='iconfont icon-language'></i>"></f7-list-item>
        </f7-list>
        <f7-list>
            <f7-list-item :title="$t('app.feedback')" link="/feedback/" media="<i class='iconfont icon-feedback2'></i>"></f7-list-item>
        </f7-list>
        <f7-list>
            <f7-list-item :title="$t('app.about')" link="/record/" media="<i class='iconfont icon-about1'></i>"></f7-list-item>
        </f7-list>
        <f7-list>
            <f7-list-item :title="$t('app.about')" link="/about/" media="<i class='iconfont icon-about1'></i>"></f7-list-item>
        </f7-list>
    </div>
</template>

<style lang="less">
    .settings-view{
        .list-block{
            margin: 20px 0;
            .iconfont{
                height: 29px;
            }
            .icon-language{
                color: #0099FF;
            }
            .icon-feedback2{
                color: #00CC99;
            }
            .icon-about1{
                color: #FFCC33;
            }
        }
        .user-profile{
            .item-content{
                padding-top: 5px;
                padding-bottom: 5px;
            }
            .avatar{
                width: 65px;
                height: 65px;
                border-radius: 5px;
            }
            .detail{
                .user_name, .user_address{
                    color: #858585;
                    font-size: 15px;
                    margin-top: 5px;
                }
                .user_address span:nth-child(2){
                    font-size: 10px;
                }
            }
        }
    }
</style>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user_info,
      isLogin: state => state.isLogin,
      address: state => state.user_address
    }),
    // avatarMedia() {
    //   if (this.isLogin) {
    //     return '<img src= data:image/png;base64,'+this.userInfo.account.photo+'data.photo>'
    //   }
    //   return '<img class="avatar" src="../../static/img/userlogo.png" />'
    // }
  },
  methods: {
    userSwitch() {
      console.log(this)
      console.log(this.isLogin)
      if (this.isLogin) {
        // 已登录
        this.$f7.mainView.router.load({url: '/profile'})
      } else {
        console.log('this shall show something')
        this.$f7.loginScreen()
      }
    }
  }
}
</script>