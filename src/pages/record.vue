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
        <f7-list-item v-for="item in items" :title="'Item ' + item"></f7-list-item>
      </f7-list>
    </f7-page>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
export default {
  data(){
    return {
      items:[
        '1',
        '2',
        '3',
        '4'
      ]
    }
  },
  created(){
    console.log('hey there')
  }
}
</script>
