<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <f7-navbar theme="white">
          <!-- <f7-nav-left>
          </f7-nav-left> -->
          <f7-nav-left></f7-nav-left>
            <f7-nav-center sliding>
              <img class="logo" src="../static/img/logo.png" alt="">
            </f7-nav-center>
          <f7-nav-right>
            <f7-link open-popup="#publisherPopup" icon="iconfont icon-feedback3" icon-size="22"></f7-link>
            <!-- <f7-link open-popup="#publisherPopup" icon="iconfont icon-feedback3" icon-size="22"></f7-link> -->
            <!-- <f7-link open-login-screen="#LoginView" icon="iconfont icon-feedback3" icon-size="22"></f7-link> -->
          </f7-nav-right>
        </f7-navbar>
        
        <f7-pages>
          <f7-page toolbar-fixed navbar-fixed>
            <f7-toolbar tabbar labels>
              <f7-link icon="iconfont icon-clock" :text="$t('main.hot')" tab-link="#hot" active></f7-link>
              <f7-link icon="iconfont icon-compass" :text="$t('main.new')" tab-link="#new"></f7-link>
              <f7-link icon="iconfont icon-gerenzhongxin" :text="$t('main.personal')" tab-link="#personal"></f7-link>
            </f7-toolbar>
            <f7-tabs>
              <f7-tab id="hot" active @tab:show="tabActived('hot')">
                <hot-view></hot-view>  
              </f7-tab>
              <f7-tab id="new" @tab:show="tabActived('new')">
                <!-- <contacts-view></contacts-view> -->
                <new-view></new-view>
              </f7-tab>
              <f7-tab id="personal" @tab:show="tabActived('personal')">
                <settings-view></settings-view>
              </f7-tab>
            </f7-tabs>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>

    <!-- Comment, publisher Popup -->
    <comment-popup></comment-popup>
    <publisher-popup></publisher-popup>
    <login-view></login-view>
    <record-view></record-view>
    <transfer-detail></transfer-detail>
    <post-view></post-view>
  </div>
</template>

<script>
// import logoView from './pages/logo.vue'
import HotView from './pages/hot.vue'
import NewView from './pages/new.vue'
import ContactsView from './pages/contacts.vue'
import SettingsView from './pages/settings.vue'
import CommentPopup from './pages/comment.vue'
import PublisherPopup from './pages/publisher.vue'
import LoginView from './pages/login.vue'
import RecordView from './pages/record.vue'
import TransferDetail from './pages/transferDetail.vue'
import postView from './pages/post.vue'

export default {
  data() {
    return {
      activedTab: 'hot'
    }
  },
  computed: {
    navbarTitle() {
      switch(this.activedTab) {
      case 'hot':
        return this.$t('main.hot')
      case 'new':
        return this.$t('main.new')
      case 'personal':
        return this.$t('main.personal')
      }
    }
  },
  methods: {
    tabActived(tab) {
      this.activedTab = tab
    }
  },
  components: {
    HotView,
    NewView,
    ContactsView,
    SettingsView,
    CommentPopup,
    PublisherPopup,
    LoginView,
    RecordView,
    TransferDetail,
    postView
  }
}
</script>

<style scoped>
.logo{
  width: 125px;
}
</style>
