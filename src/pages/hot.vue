<template>
    <div class="hot-view">
        <card v-for="(item, index) in hotList.articles" :key="item.id" :data="item" :enableToolbar="true" @card:content-click="routeToPost"></card>        
    </div>
</template>

<style lang="less">
    
</style>

<script>
import Card from '../components/card.vue'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      hotList: state => state.hotList,
    })
  },
  created(){
    console.log(window.Dom7)
  },
  mounted() {
    console.log(this.$f7)
    this.$nextTick(_ => {
      this.$f7.showIndicator()
      this.$store.dispatch('getHotList', {
        limit: 10,
        offset: 0
      })
      console.log('CAN CALL IT OFF')
      this.$f7.hideIndicator()
    })
  },
  methods: {
    routeToPost(data) {
      console.log('FUCK SOMETHING', data)
      this.$f7.mainView.router.load({url: `/articles/${data.id}`})
    }
  },
  components: {
    Card
  }
}
</script>