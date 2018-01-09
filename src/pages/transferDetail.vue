<template>
  <f7-popover id="transferDetail">
    <f7-page class="transferDetail-page">
        <div class="navbar">
            <div class="navbar-inner">
            <div class="left">
                <a href="/record/" class="link" @click="rollBack()">
                <i class="icon icon-back"></i>
                </a>
            </div>
            <div class="center">{{$t('app.record')}}</div>
            </div>
        </div>
        <f7-list>
            <f7-list-item :title="$t('transfer.recipientId')" class="font-smaller">
                {{item.recipientId}}
            </f7-list-item>
            <f7-list-item :title="$t('transfer.senderId')" class="font-smaller">
                {{item.senderId}}
            </f7-list-item>
            <f7-list-item :title="$t('transfer.currency')">
                {{item.currency}}
            </f7-list-item>
            <f7-list-item :title="$t('transfer.amount')">
                {{item.amount}}
            </f7-list-item>
            <f7-list-item :title="$t('transfer.time')">
                {{realTime}}
            </f7-list-item>
        </f7-list>
        <!-- <f7-list>
            <f7-list-item :title="$t('app.asset')" group-title></f7-list-item>
            <f7-list-item>
                <f7-card class="asset-card" v-for="(item, index) in this.userInfo.account.balances">
                <f7-card-header>{{item.currency}}</f7-card-header>
                <f7-card-content>{{item.balance}}</f7-card-content>
                <f7-card-footer>{{$t('app.transfer')}}</f7-card-footer>
                </f7-card>
            </f7-list-item>
        </f7-list> -->
    </f7-page>
  </f7-popover>
</template>

<style lang="less" scoped>
    .list-block .item-title{
        font-size: 17px !important;
    }
    .font-smaller{
        font-size: 10px;
    }
</style>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import getRealTime from '../utils/getRealTime'
export default {
  data(){
    return {}
  },
  computed: {
    ...mapState({item: state => state.transferDetail}),
    realTime() {
      var realOne = getRealTime.getCorrectTimestamp(this.item.t_timestamp)
      return moment(realOne).format('YYYY-MM-DD h:mm:ss a')
    }
  },
  methods: {
    rollBack(){
    //   this.$f7.mainView.router.load({url: './record/'})
    }
  }
}
</script>
