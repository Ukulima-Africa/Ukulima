<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLogo />
    <q-page-container class="uku-green-bg">
      <q-page>
        <div class="row uku-row uku-signin-page uku-signin-bg-image">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="uku-welcome">
              <div class="row items-center no-wrap">
                <div class="uku-welcome-title">Sign in</div>
              </div>
              <div class="row items-center justify-center no-wrap" align="center">
                <div class="uku-welcome-title-text">Use your email and password to continue</div>
              </div>
              <div class="row no-wrap items-center justify-center" align="center">
                <q-form ref="signInForm" class="q-gutter-md uku-form" autocomplete="off" @submit="signIn">
                  <div class="self-center full-width no-outline">
                    <q-input
                      v-model="signin.email"
                      outlined
                      name="email"
                      type="email"
                      label="Email"
                      label-color="grey"
                      placeholder="Email"
                      color="black"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please enter your email address to continue']"
                      no-error-icon
                      autocomplete="email"
                      tabindex="1"
                    />
                  </div>
                  <div class="self-center full-width no-outline">
                    <q-input
                      v-model="signin.password"
                      outlined
                      name="password"
                      label="Password"
                      label-color="grey"
                      color="black"
                      placeholder="Password"
                      :type="isPwd ? 'password' : 'text'"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please enter a password to continue']"
                      no-error-icon
                      autocomplete="current-password"
                      tabindex="2"
                    >
                      <template #append>
                        <span class="password-update" :name="isPwd ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility">
                          {{ passwordLabel }}
                        </span></template
                      >
                    </q-input>
                  </div>
                  <div class="uku-forgot-text">
                    <nuxt-link to="/auth/reset-password" class="uku-forgot-text-link">Forgot Password?</nuxt-link>
                  </div>
                  <div class="self-center full-width no-outline" tabindex="5">
                    <q-btn class="uku-signup-button" label="Sign in" type="submit" />
                  </div>
                </q-form>
              </div>
              <div class="row items-center no-wrap">
                <div class="uku-welcome-text">
                  Need an account?
                  <nuxt-link to="/auth/signup" class="uku-welcome-link">Sign up ›</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <Footer />
  </q-layout>
</template>
<script>
/* Components */
import HeaderLogo from '../../components/HeaderLogo.vue'
import Footer from '../../components/Footer.vue'
/* LFG */
export default {
  name: 'Signin',
  components: {
    HeaderLogo,
    Footer,
  },
  data() {
    return {
      page: 'login',
      loading: false,
      showEmailNotice: false,
      signin: {
        email: '',
        password: '',
      },
      isPwd: true,
      passwordLabel: 'SHOW',
    }
  },
  methods: {
    async signIn() {
      const that = this
      that.loading = true
      that.showEmailNotice = false
      /* Check if form is valid */
      const formValidation = await that.$refs.signInForm.validate().then((outcome) => {
        return outcome
      })
      if (formValidation === true) {
        /* Sign in user using firebase auth */
        $nuxt.$fire.auth
          .signInWithEmailAndPassword(that.signin.email, that.signin.password)
          .then(async (user) => {
            console.log('user', user)
            if (user) {
              if (user.user.emailVerified) {
                // Our middleware will check first if the user is past onboarding
                // and redirect them to the dashboard
                $nuxt.$nextTick(() => {
                  setTimeout(() => {
                    // We do this to give our auth action changed method time to kick in
                    $nuxt.$router.push('/dashboard')
                  }, 2000)
                })
              } else {
                /* Make sure we are signed out */
                $nuxt.$fire.auth.signOut()
                // display email verification ribbon thing with link
                that.showEmailNotice = true

                that.$q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'warning',
                  message: 'You have not verified your email yet.',
                  actions: [
                    {
                      label: 'Resend Link',
                      color: 'white',
                      handler: () => {
                        $nuxt.$router.push('/auth/email-verification')
                      },
                    },
                  ],
                })
              }
            }
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            /* Show notification that something went wrong */
            this.$q.notify({
              color: 'red-6',
              textColor: 'white',
              icon: 'warning',
              message: `Error signing in ${errorCode}: ${errorMessage}`,
            })
          })
      }
      /* Reset form & Validation */
      that.$refs.signInForm.resetValidation()
      that.$refs.signInForm.reset()
      that.loading = false
    },
    togglePasswordVisibility() {
      this.isPwd = !this.isPwd
      if (this.isPwd === true) {
        this.passwordLabel = 'SHOW'
      } else {
        this.passwordLabel = 'HIDE'
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import "../../assets/sass/theme-variables"

.uku-signin-bg-image
  background-image: url('~assets/images/Agriculture-Supply-Chain.png')
  background-size: contain
  background-repeat: no-repeat
  background-position: center center
  overflow: display
.uku-signin-page
  min-height: inherit
  margin: 0 auto
  padding: 0
  .uku-welcome
    width: 549px
    border-radius: 5px
    border: solid 1px #cecece
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
    background-color: #ffffff
    margin: 0
    padding: 30px 20px
    .uku-welcome-title
      color: #000000
      font-size: 36px
      line-height: 1.22
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      margin: 0 auto 15px
    .uku-welcome-title-text
      color: #333333
      font-size: 16px
      line-height: 1.88
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      margin: 0 auto 20px
    .q-field__native,
    select
      color: rgba(0, 0, 0, 0.87) !important
    .q-input,
    .q-field
      max-width: 442px !important
      padding-bottom: 23.6px
    .q-field__label,
    .field-label
      color: #737376
      font-size: 14px
      line-height: 1.71
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: left
      margin-top: 20px
      margin-bottom: 10px
      span.optional-msg
        color: #828689
    .q-field--labeled .q-field__native,
    .q-field--labeled .q-field__prefix,
    .q-field--labeled .q-field__suffix
      line-height: 24px
      padding-top: 10px !important
      padding-bottom: 8px
    .password-update
      color: #737376 !important
      font-size: 12px
      line-height: 1.25
      letter-spacing: 0.6px
      font-weight: bold
      font-stretch: normal
      font-style: normal
      cursor: pointer
      &:hover, &:focus
        color: #737376
    .uku-signup-button
      width: 442px
      text-transform: capitalize
      color: #ffffff
      font-size: 18px
      font-weight: 500
      font-stretch: normal
      font-style: normal
      line-height: 1.17
      letter-spacing: normal
      text-align: center
      border-radius: 5px
      background-color: $secondary
      cursor: pointer
    .uku-forgot-text
      width: 100%
      color: #2e3133 !important
      font-size: 14px
      line-height: 1.21
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: left
      margin: 0 0 25px 0
      .uku-forgot-text-link
        color: $black !important
        font-size: 14px
        line-height: 1.21
        font-weight: normal
        font-stretch: normal
        font-style: normal
        letter-spacing: normal
        text-decoration: none
    .uku-welcome-text
      width: 100%
      color: #1a1a1a
      font-size: 14px
      line-height: 1.57
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      margin: 23px auto 0
      .uku-welcome-link
        color: $black !important
        font-weight: bold
        text-decoration: none
    .uku-link
      color: $black !important
      font-size: 14px
      font-weight: bold
      line-height: 1.57
      margin-left: 5px
// $breakpoint-xs: 479px !default
@media only screen and (max-width : 479px)
  .uku-signin-page
    min-height: 500px
    overflow: hidden
    .uku-welcome
      width: 90%
      .uku-form
        width: 100%
        margin-left: auto
        margin-right: auto
        .uku-signup-button
          width: 100%
  .uku-signin-bg-image
    background-image: url('~assets/images/signup-graphic.png')
    background-size: cover
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width : 359px)
  .q-page-container
    padding-top: 100px !important
    padding-bottom: 0 !important
  .uku-signin-page
    overflow: hidden
  .uku-signin-bg-image
    background-image: none
  .uku-welcome
    width: 100%
    border-radius: 0
    box-shadow: none !important
    padding: 15px
    margin-bottom: 80px
    .uku-welcome-title
      font-size: 34px
      line-height: 1.21
      margin: 40px auto 34px
    .uku-form
      width: 90%
      margin-left: auto
      margin-right: auto
      .uku-signup-button
        width: 90%
</style>
