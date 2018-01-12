<template>
  <!-- <f7-link @click="loadMore">{{$t('loadmore.title')}}</f7-link> -->
  <div class="loadMore">
    <div class="wrapper" @click="loadMore">
      <a href="#" class="link">
        {{$t('loadmore.title')}}
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .loadMore{
    text-align: center;
  }
  .wrapper{
    border: 1px solid #a3c2e4;
    margin: auto;
    margin-bottom: 7px;
    margin-top: 7px;
    width: 30%;
    color: #a3c2e4;
  }
</style>
<script>
export default {
  props: ['type','caller','pagerSet'],
  data() {
    return {}
  },
  methods: {
    async loadMore() {
      if (this.type === 'record' || this.type === 'comments') {
        // record condition
        this.$emit('loadMore')
      } else {
        console.log(this)
        // console.log(this.type,this.caller,this.pagerSet)
      // this.$f7.showIndicator()
        this.pagerSet.offset += this.pagerSet.loadNumber
        this.$store.dispatch(this.caller, {
          limit: this.pagerSet.limit,
          offset: this.pagerSet.offset,
          isAdd: true
        })
        // this.$store.commit('ADD_LIST',{
        //   list: addList,
        //   type: this.type
        // })
      }
    // this.$f7.hideIndicator()
    }
  }
}
</script>

