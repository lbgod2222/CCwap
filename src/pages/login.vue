<template>
  <f7-login-screen id="LoginView">
    <f7-view>
        <f7-pages>
        <f7-page login-screen>
            <f7-login-screen-title>{{$t('login.title')}}</f7-login-screen-title>
            <f7-list form>
            <!-- <f7-list-item>
                <f7-label>Username</f7-label>
                <f7-input name="username" placeholder="Username"></f7-input>
            </f7-list-item> -->
            <f7-list-item>
                <f7-label>{{$t('login.secret')}}</f7-label>
                <f7-input name="password" v-model.trim="secret" type="password" :placeholder="this.$t('login.tip')"></f7-input>
            </f7-list-item>
            </f7-list>
            <f7-list>
            <f7-list-button @click="login" close-login-screen>{{$t('login.login')}}</f7-list-button>
            <f7-list-label>
                <p>{{$t('login.label')}}</p>
            </f7-list-label>
            </f7-list>
        </f7-page>
        </f7-pages>
    </f7-view>
    </f7-login-screen>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      secret: '',
    }
  },
  computed: {
    ...mapState({
      address: state => state.user_address
    })
  },
  mounted() {
  },
  methods: {
    async login() {
      console.log(this)
      if (this.secret !== '') {
        await this.$store.commit('LOGIN', {
          secret: this.secret
        })
        console.log('gonna get  user info!!!!!!!!!!!!!!!!!!!')
        await this.$store.dispatch('getUserInfo', {
          secret: this.secret,
          address: this.$store.state.user_address
        })
        this.$store.commit('SWITCH_LOGIN')
      } else {
        return
      }
    }
  },
  components: {
  }
}
</script>
