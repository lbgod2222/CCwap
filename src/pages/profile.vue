<template>
  <f7-page class="profile-page">
    <f7-navbar :title="$t('app.profile')" :back-link="$t('app.back')" sliding></f7-navbar>
    <f7-list>
        <f7-list-item :title="$t('app.avatar')" class="avatar-content">
            <!-- <img class="avatar" slot="after" :src="userInfo.avatarUrl"/> -->
            <img :src="'data:image/png;base64,' + userInfo.account.photo" alt="avatar">
        </f7-list-item>
        <f7-list-item :title="$t('app.name')" :after="userInfo.nickName"></f7-list-item>
        <f7-list-item :title="$t('app.address')">
            <span class="inner_span">{{address}}</span>
        </f7-list-item>
    </f7-list>
    <f7-list>
        <f7-list-item :title="$t('app.asset')" group-title></f7-list-item>
        <f7-list-item>
            <f7-card class="asset-card" v-for="(item, index) in this.userInfo.account.balances">
              <f7-card-header>{{item.currency}}</f7-card-header>
              <f7-card-content>{{item.balance}}</f7-card-content>
              <f7-card-footer>{{$t('app.transfer')}}</f7-card-footer>
            </f7-card>
        </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<style lang="less">
    .profile-page{
        .list-block{
            margin: 20px 0;
            .avatar-content{
                .item-after{
                    max-height: inherit;
                }
                .avatar{
                    width: 65px;
                    height: 65px;
                    border-radius: 5px;
                }
            }
        }
    }
    .inner_span{
        font-size: 10px;
    }
    .asset-card{
        width: 100%;
        border: 1px solid #dadada;
        .card-header{
            font-size: 24px;
        }
        .card-content{
            font-size: 30px;
        }
        .card-footer{
            justify-content: center;
            color: #218596;
        }
    }
</style>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user_info,
      address: state => state.user_address,
    })
  },
  created() {
    console.log(this.userInfo)
  },
  methods: {
    // formatGender(gender) {
    //   if(gender === 'm') return this.$t('app.male')
    //   else if(gender === 'f') return this.$t('app.female')
    //   else return this.$t('app.unknown')
    // }
  }
}
</script>