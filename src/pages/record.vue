<template>
  <div class="record">
    <f7-page navbar-fixed>
      <f7-navbar theme="white" :title="$t('app.record')" :back-link="$t('app.back')" sliding>
      </f7-navbar>
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
            <a href="#" class="item-link">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title">{{item.amount}}</div>
                  <div class="item-after">
                    <span class="badge bg-yellow">{{item.currency}}</span>
                  </div>
                  <div class="item-text">Item Subtitle</div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </f7-list>
    </f7-page>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      items:[]
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
  }
}
</script>
