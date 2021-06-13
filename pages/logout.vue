<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLogo />
    <q-page-container class="white-bg">
      <q-page>
        <div v-show="logout" class="uku-logout-page">
          <div id="uku-logout-box">
            <div class="row full-width q-mb-md">
              <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
                <img src="~/assets/images/logo.png" alt="Ukulima Africa" class="uku-logo" />
              </div>
            </div>
            <div id="uku-logout-title">Thanks for visiting!!!</div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <Footer />
  </q-layout>
</template>
<script>
import HeaderLogo from '../components/HeaderLogo.vue'
import Footer from '../components/Footer.vue'
/* LFG */
export default {
  name: 'Logout',
  components: {
    HeaderLogo,
    Footer,
  },
  created() {
    this.$fire.auth.signOut()
    this.$store.commit('RESET_USER')
    this.$store.commit('RESET_PROFILE')
    this.$store.commit('RESET_PROFILE_TYPE', 'Guest')
    $nuxt.$router.push('/')
  },
}
</script>
<style lang="sass" scoped>
.uku-logout-page
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  min-height: inherit
  color: #000000
  text-align: center
  font-size: 30px
  z-index: 999998 !important
  #uku-logout-box
    position: relative
    top: 36%
    .uku-logo
      width: 100px
    #uku-logout-title
      color: #333333
      font-size: 36px
      line-height: 1.22
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      margin: 0 auto 12px
    #uku-logout-subtext
      color: #2e353b
      font-size: 17px
      line-height: 1.29
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      margin: 0 auto
</style>
