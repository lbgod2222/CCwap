<template>
  <f7-link @click="loadMore">{{$t('loadmore.title')}}</f7-link>
</template>

<style lang="less" scoped>
  
</style>

<script>
export default {
  props: ['type','caller','pagerSet'],
  data() {
    return {}
  },
  methods: {
    async loadMore() {
      console.log(this.type,this.caller,this.pagerSet)
    // this.$f7.showIndicator()
      this.pagerSet.offset += this.pagerSet.loadNumber
      let addList = await this.$store.dispatch(this.caller, {
        limit: this.pagerSet.limit,
        offset: this.pagerSet.offset,
        isAdd: true
      })
      this.$store.commit('ADD_LIST',{
        list: addList,
        type: this.type
      })
    // this.$f7.hideIndicator()
    }
  }
}
</script>

