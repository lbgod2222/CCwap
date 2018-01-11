<template>
  <div id="record">
    <f7-page navbar-fixed>
      <!-- <f7-navbar theme="white" :title="$t('app.record')" :back-link="$t('app.back')" sliding>
      </f7-navbar> -->
      <div class="navbar">
        <div class="navbar-inner">
          <div class="left">
            <a href="#" class="back link">
              <i class="icon icon-back"></i>
            </a>
          </div>
          <div class="center">{{$t('app.record')}}</div>
        </div>
      </div>
      <f7-searchbar
      :cancel-link="$t('app.cancel')"
      :placeholder="$t('app.search')"
      search-list="#search-list"
      :clear="true"
      >
      </f7-searchbar>
      <f7-list class="searchbar-not-found">
        <f7-list-item title="Nothing found"></f7-list-item>
      </f7-list>
      <f7-list class="searchbar-found" id="search-list">
        <ul>
          <li v-for="(item,index) in this.items">
            <a href="#" class="item-link open-popup" @click="transferListIn(item)" data-popup="#transferDetail">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title" :class="{isOutput: item.t_type == 3}"><span v-if="item.t_type == 3">+</span>{{item.amount}}</div>
                  <div class="item-after">
                    <span class="badge bg-yellow">{{item.currency}}</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      <load-more :type="this.type" :pagerSet="this.pagerSet" :caller="'getTransactionRecords'"></load-more>
      </f7-list>
    </f7-page>
  </div>
</template>

<style lang="less" scoped>
  .item-title{
    color: red;
  }
  .isOutput{
    color: green !important;
  }
</style>

<script>
import { mapState } from 'vuex'
import loadMore from '../components/loadMore.vue'
export default {
  data(){
    return {
      items:[],
      pagerSet: {
        limit: 20,
        offset: 0,
        loadNumber: 10
      },
      type: 'record'
    }
  },
  computed: {
    ...mapState({
      address: state => state.user_address
    })
  },
  async created(){
    console.log('hey there')
    let a = await this.$store.dispatch('getTransactionRecords', {
      limit: 20,
      offset: 0,
      ownerId: this.$store.state.user_address,
      currency: null,
    })
    this.items = a.transfers
    console.log(a)
  },
  methods: {
    transferListIn(item) {
      this.$store.commit('LIST_TRANSFERDETAIL', {item: item})
    },
    rollBack(){
      console.log(this.$f7.mainView.router)
      this.$f7.mainView.router.load({url: '/'})
    }
  },
  components: {
    loadMore
  }
}
</script>
