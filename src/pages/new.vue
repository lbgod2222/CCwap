<template>
    <div class="new-view">
        <card v-for="(item, index) in newList" :key="item.id" :data="item" :enableToolbar="true" @card:content-click="routeToPost"></card>        
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
      newList: state => state.newList,
    })
  },
  mounted() {
    this.$nextTick(_ => {
      this.$f7.showIndicator()
      this.$store.dispatch('getNewList', {
        limit: 10,
        offset: 0,
        isAdd: false
      })
      console.log('CAN CALL IT OFF')
      this.$f7.hideIndicator()
    })
    console.log(this.$f7)
  },
  methods: {
    routeToPost(data) {
      console.log('FUCK SOMETHING', data)
      this.$f7.mainView.router.load({url: `/articles/${data.id}`})
    },
    async loadMore() {
      this.$f7.showIndicator()
      this.pagerSet.offset += this.pagerSet.loadNumber
      console.log('detect', this.offset, this.limit, this.loadNumber)
      let addList = await this.$store.dispatch('getNewList', {
        limit: this.pagerSet.limit,
        offset: this.pagerSet.offset,
        isAdd: true
      })
      this.$store.commit('ADD_LIST',{
        list: addList,
        type: 'new'
      })
      this.$f7.hideIndicator()
    }
  },
  components: {
    Card
  }
}
</script>