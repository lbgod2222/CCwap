<template>
  <div class="hot-view">
      <card v-for="(item, index) in hotList.articles" :key="item.id" :data="item" :enableToolbar="true" @card:content-click="routeToPost"></card>        
    <f7-link @click="loadMore">MORE</f7-link>
  </div>
</template>

<style lang="less">
    
</style>

<script>
import Card from '../components/card.vue'
import {mapState} from 'vuex'
export default {
  data(){
    return {
      pagerSet: {
        limit: 10,
        offset: 0,
        loadNumber: 10,
      }
    }
  },
  computed: {
    ...mapState({
      hotList: state => state.hotList,
    }),
  },
  created(){
    console.log(window.Dom7, 'this is dom7')
  },
  mounted() {
    console.log(this.$f7)
    this.$nextTick(_ => {
      this.$f7.showIndicator()
      this.$store.dispatch('getHotList', {
        limit: 10,
        offset: 0,
        isAdd: false
      })
      console.log('CAN CALL IT OFF')
      this.$f7.hideIndicator()
    })
    // detectInfinite(){
    let $$ = window.Dom7
    // let lastIndex = $$('.card').length
    // let itemsPerLoad = 10
    $$('.infinite-scroll').on('infinite', function () {
      console.log('inifinite detected')
    })
    // }
  },
  methods: {
    routeToPost(data) {
      console.log('FUCK SOMETHING', data)
      this.isClose = true
      // console.log(this.$f7)
      // this.$f7.popup('#post')
      this.$f7.mainView.router.load({url: `/articles/${data.id}`})
      this.isClose = false
    },
    async loadMore() {
      this.offset += this.loadNumber
      let addList = await this.$store.dispatch('getHotList', {
        limit: this.limit,
        offset: this.offset,
        isAdd: true
      })
      this.$store.commit('ADD_LIST',{
        list: addList,
        type: 'hot'
      })
    }
  },
  components: {
    Card
  }
}
</script>