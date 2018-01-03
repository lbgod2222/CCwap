<template>
  <f7-page class="post-page" navbar-fixed toolbar-fixed>
    <f7-navbar :title="$t('post.post')" :back-link="$t('app.back')" sliding>
    </f7-navbar>
    <card :enableToolbar="false" :data="articleDetail"></card>
    <div class="context" v-if="!articleDetail.url">
      <div class="title">
        <span>{{$t('tweet.context')}}</span>
      </div>
      <div class="content flex-row">
        <pre>
          {{articleDetail.text}}
        </pre>
      </div>
    </div>
    <div class="linkin" v-else>
      <div class="title">
        <span>{{$t('tweet.url')}}</span>
      </div>
      <div class="content flex-row">
        <f7-link @click="goto()">{{$t('tweet.linkin')}}</f7-link>
      </div>
    </div>
    <div class="comments">
      <div class="title">
        <span>{{$t('tweet.comment')}}</span>
      </div>
      <div class="list">
        <template v-if="this.comments.length">
          <div class="comment flex-row" v-for="(comment, index) in this.comments" :key="comment.name">
            <img class="avatar" :src="'data:image/png;base64,' + comment.photo" />
            <div class="detail flex-rest-width">
              <div class="name" v-if="!comment.nickname"><span>{{comment.authorId}}</span></div>
              <div class="name" v-else><span>{{comment.nickname}}</span></div>
              <div class="time"><span>{{formatTime(comment.realtime)}}</span></div>
              <div class="text"><span>{{comment.content}}</span></div>
            </div>
          </div>
        </template>
        <!-- <div class="empty-content" v-else>
          <i class="iconfont icon-wujieguoyangshi"/>
          <div class="text">
            <span>{{$t('app.empty_container')}}</span>
          </div>
        </div> -->
      </div>
    </div>
    <f7-toolbar class="custom-toolbar flex-row">
      <f7-link class="tool tool-border flex-rest-width" @click="openCommentPopup">
        <span class="iconfont icon-comment"></span>
        <span class="text" v-text="articleDetail.comments ? articleDetail.comments : $t('tweet.comment')"></span>
      </f7-link>
      <f7-link class="tool flex-rest-width" :class="{liked: articleDetail.votes > 0}">
        <span class="iconfont icon-like"></span>
        <span class="text" v-text="articleDetail.votes > 0 ? articleDetail.votes : $t('tweet.like')"></span>
      </f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<style lang="less">
  @import "../assets/styles/mixins.less";
  .post-page {
    .custom-toolbar{
      background: #fff;
      &:before {
        background: #e1e1e1;
      }
      .tool {
        justify-content: center;
        &.tool-border{
          border-right: 1px solid #e1e1e1;
        }
        &.liked{
          > span {
            color: @mainColor;
          }
        }
        > span {
          color: #6D6D78;
          vertical-align: middle;
        }
        .iconfont{
          font-size: 18px;
        }
        .text {
          font-size: 15px;
        }
      }
    }
    .comments{
      background-color: #fff;
      border-top: 1px solid #dadada;
      border-bottom: 1px solid #dadada; 
      margin-bottom: 15px;
      .title{
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        font-size: 13px;
      }
      .comment{
        border-top: 1px solid #dadada;
        padding: 10px;
        font-size: 14px;
        .avatar{
          width: 30px;
          height: 30px;
          border-radius: 30px;
        }
        .detail{
          margin-left: 8px;
          .name{
            font-size: 13px;
            color: #333;
          }
          .time{
            font-size: 11px;
            color: #929292;
            margin-bottom: 2px;
          }
          .text{
            line-height: 20px;
            color: #5d5d5d;
          }
        }
      }
    }
    .context{
      background-color: #fff;
      border-top: 1px solid #dadada;
      border-bottom: 1px solid #dadada; 
      margin-bottom: 15px;
      .title{
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        font-size: 13px;
      }
      pre{
        border-top: 1px solid #dadada;
        padding: 0 10px;
        margin: 0px;
        width: 100%;
        font-size: 14px;
        overflow: auto;
        white-space: pre-wrap;
      }
    }
    .linkin{
      background-color: #fff;
      border-top: 1px solid #dadada;
      border-bottom: 1px solid #dadada; 
      margin-bottom: 15px;
      .title{
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        font-size: 13px;
      }
      .content{
        border-top: 1px solid #dadada;
        padding: 20px 10px;
      }
    }
  }
</style>

<script>
// import axios from 'axios'
import Card from '../components/card.vue'
import moment from 'moment'
import {getRemoteAvatar} from '../utils/appFunc'
import getRealTime from '../utils/getRealTime'
import toPhoto from '../utils/toPhoto'
// import {mapState} from 'vuex'
// import find from 'lodash/find'

export default {
  data() {
    return {
      articleDetail: {},
      comments: []
    }
  },
  computed: {
    // ...mapState({
    //   articleDetail: state => state.articleDetail.article,
    //   comments: state => state.comments.comments
    // })
    // // ...mapGetters({comments: 'commentList', articleDetail: 'articleDetail'})
  },
  async beforeCreate(){
    // console.log(this)
    // this.$nextTick(_ => {
    //   this.$f7.showIndicator()
    //   console.log('nextTick from the post vue')
    //   this.$store.dispatch('getArticleDeatil', {
    //     id: this.$route.params.id
    //   })
    //   this.$store.dispatch('getArticleComment', {
    //     id: this.$route.params.id
    //   })
    //   this.$f7.hideIndicator()
    // })
    console.log('beforecreated')
    this.$f7.showIndicator()
    let a = await this.$store.dispatch('getArticleDeatil', {
      id: this.$route.params.id
    })
    this.articleDetail = a.article
    this.articleDetail.realtime = getRealTime.getCorrectTimestamp(this.articleDetail.timestamp)
    this.articleDetail.photo = toPhoto.toAvatar(this.articleDetail.authorId)
    // this.$store.commit('GET_ARITCLE_DETAIL',{articleDetail})
    console.log(a,'getArticleDetail in async')
    let b = await this.$store.dispatch('getArticleComment', {
      id: this.$route.params.id
    })
    this.comments = b.comments
    for (let i=0; i<this.comments.length; i++) {
      console.log(getRealTime,'the func')
      this.comments[i].realtime = getRealTime.getCorrectTimestamp(this.comments[i].t_timestamp)
      this.comments[i].photo = toPhoto.toAvatar(this.comments[i].authorId)
    }
    console.log(this.comments)
    // this.$store.commit('GET_COMMENT',{comments})
    console.log(b,'getArticleComment in async')
    console.log(this)
    this.$f7.hideIndicator()
  },
  methods: {
    // goto origin page
    goto() {
      window.open(this.articleDetail.url,'_blank')
    },
    getContent() {
      this.$store.dispatch('getArticleDeatil', {
        id: this.$route.params.id
      })
    },
    getComments() {
      this.$store.dispatch('getArticleComment', {
        id: this.$route.params.id
      })
    },
    formatTime(time) {
      return moment(time).fromNow()
    },
    getAvatar(id) {
      return getRemoteAvatar(id)
    },
    openCommentPopup() {
      this.$f7.popup('#commentPopup')
    },
    toggleLike(mid, status) {
      this.$store.dispatch('updateTimeline', {
        mid,
        type: status ? 'unlike' : 'like'
      })
    }
  },
  components: {
    Card
  }
}
</script>