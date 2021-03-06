<template>
  <div class="row uku-signin items-center justify-center content-center">
    <div
      class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 items-center justify-center self-center uku-signin-col"
      align="center"
    >
      <div class="uku-signin-form">
        <div class="row no-wrap">
          <div class="uku-signin-title">{{ title }}</div>
        </div>
        <div class="row items-center justify-center no-wrap" align="center">
          <div class="uku-signin-subtitle">{{ subtitle }}</div>
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
                color="white"
                label-color="white"
                bg-color="secondary"
                placeholder="Email"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter your email address to continue!']"
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
                color="white"
                label-color="white"
                bg-color="secondary"
                placeholder="Password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter a password to continue!']"
                no-error-icon
                autocomplete="current-password"
                tabindex="2"
              >
                <template #append>
                  <span
                    class="password-update"
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    @click="togglePasswordVisibility"
                  >
                    {{ passwordLabel }}
                  </span></template
                >
              </q-input>
            </div>
            <div class="self-center full-width no-outline">
              <q-btn outline rounded class="uku-signin-button" label="Sign in" type="submit" tabindex="4" />
            </div>
            <div class="full-width no-outline uku-forgot-text">
              <nuxt-link to="/auth/reset-password">Forgot Password?</nuxt-link>
            </div>
          </q-form>
        </div>
        <div class="row items-center justify-center no-wrap">
          <div class="uku-welcome-text">
            Need an account?
            <nuxt-link to="/auth/signup" class="uku-welcome-link">Sign up ›</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* LFG */
export default {
  name: 'SigninForm',
  data() {
    return {
      title: 'Sign In',
      subtitle: 'Use your email & password to continue',
      loading: false,
      showEmailNotice: false,
      signin: {
        email: '',
        password: '',
        phone: '',
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
            if (user) {
              if (user.user.emailVerified) {
                /* Send user to the Dashboard page */
                $nuxt.$nextTick(() => {
                  setTimeout(() => {
                    // We do this to give our auth action changed method time to kick in
                    $nuxt.$router.push('/dashboard')
                  }, 500)
                })
              } else {
                /* Display email verification ribbon with link */
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
                /* Make sure we are signed out */
                $nuxt.$fire.auth.signOut()
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
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"
.uku-signin
  max-height: 600px
  min-height: inherit
  margin: 0 auto
  padding: 0
  overflow: hidden
  .uku-signin-col
    padding: 60px 15px 30px
    .uku-signin-form
      max-width: 469px
      border-radius: 4px
      border: solid 1px #ffffff
      padding: 40px 30px
      .uku-signin-title
        width: 100%
        color: $white
        font-size: 28px
        line-height: 30px
        font-weight: 400
        letter-spacing 0.10px
        word-spacing 1px
        text-decoration: underline
        margin: 0 auto 10px
      .uku-signin-subtitle
        width: 100%
        color: $white
        font-size: 16px
        line-height: 20px
        font-weight: 400
        letter-spacing 0.8px
        margin: 0 auto 20px
      .uku-form
        max-width: 360px
        .q-field__native, .q-field__input
          color: $white !important
          width: 100%
        .q-field--outlined
          .q-field__control
            &:before
              border: 1px solid $white !important
            &:hover:before
              border-color: $white
            &:after
              height: inherit
              border-radius: inherit
              border: 2px solid transparent
        .password-update
          color: $white
          font-size: 12px
          line-height: 1.25
          letter-spacing: 0.6px
          font-weight: bold
          font-stretch: normal
          font-style: normal
          cursor: pointer
          &:hover, &:focus
            color: $white
        .uku-signin-button
          width: 340px
          text-transform: capitalize
          color: $white
          font-size: 18px
          font-weight: 500
          font-stretch: normal
          font-style: normal
          line-height: 1.17
          letter-spacing: normal
          text-align: center
          border-radius: 5px
          background-color: $primary
          cursor: pointer
        .uku-forgot-text
          width: 100%
          color: $white
          font-size: 14px
          line-height: 1.21
          font-weight: normal
          font-stretch: normal
          font-style: normal
          letter-spacing: normal
          text-align: left
          margin: 25px 0 0 0
      .uku-welcome-text
        width: 100%
        color: $white
        font-size: 14px
        line-height: 1.57
        font-weight: normal
        font-stretch: normal
        font-style: normal
        letter-spacing: normal
        text-align: center
        margin: 20px 0 0 0
        .uku-welcome-link
          color: $white
          font-weight: bold
          text-decoration: none
  /* CSS Media Queries */
/* $breakpoint-xl: 2400px */
@media only screen and (max-width: 2400px)
  .hide-on-bigscreen
    display: none
/* $breakpoint-lg:  1199px */
@media only screen and (max-width: 1199px)
  .hide-on-bigscreen
    display: none
/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .hide-on-tablet
    display: none
  .uku-signin-col
    margin: 0 auto
    padding: 30px 20px
    .uku-signin-form
      max-width: 100%
      border-radius: 0
      border: none
      padding: 25px 15px
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-signin-col
    margin: 0 auto
    padding: 0
    .uku-signin-form
      max-width: 100%
      border-radius: 0
      border: none
      padding: 25px 10px
      .uku-form
        padding: 25px 10px
        .uku-signin-button
          width: 340px
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-signin-col
    margin: 0 auto
    padding: 20px 15px !important
    .uku-signin-form
      max-width: 100%
      border-radius: 0
      border: none
      padding: 0
      .uku-form
        padding: 25px 10px
        .uku-signin-button
          width: 100%
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-signin-col
    margin: 0 auto
    padding: 20px 15px !important
    .uku-signin-form
      max-width: 100%
      border-radius: 0
      border: none
      padding: 0
      .uku-form
        padding: 25px 10px
        .uku-signin-button
          width: 100%
</style>
