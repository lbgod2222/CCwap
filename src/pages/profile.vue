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
        <f7-list-item :title="$t('app.gender')" :after="formatGender(userInfo.gender)"></f7-list-item>
        <f7-list-item :title="$t('app.location')" :after="userInfo.location"></f7-list-item>
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
  methods: {
    formatGender(gender) {
      if(gender === 'm') return this.$t('app.male')
      else if(gender === 'f') return this.$t('app.female')
      else return this.$t('app.unknown')
    }
  }
}
</script>