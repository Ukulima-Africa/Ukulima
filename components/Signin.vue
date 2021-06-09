<template>
  <div class="row uku-signin">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm self-center" align="center">
      <div class="uku-signin-form">
        <div class="row no-wrap">
          <div class="uku-signin-title">{{ title }}</div>
        </div>
        <div class="row items-center justify-center no-wrap" align="center">
          <div class="uku-signin-subtitle">{{ subtitle }}</div>
        </div>
        <div class="row no-wrap items-center justify-center" align="center">
          <q-form ref="signInForm" class="q-gutter-md uku-form" @submit="signIn">
            <div class="self-center full-width no-outline">
              <q-input
                v-model="signin.email"
                outline
                type="email"
                label="Email"
                label-color="white"
                placeholder="Email"
                color="white"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter your email to continue!']"
                tabindex="1"
              />
            </div>
            <div class="self-center full-width no-outline">
              <q-input
                v-model="signin.password"
                outlined
                label="Password"
                label-color="white"
                color="white"
                placeholder="Password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please enter a password to continue!']"
                no-error-icon
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
              <nuxt-link to="/auth/reset-password">Forgot Password?</nuxt-link>
            </div>
            <div class="self-center full-width no-outline" tabindex="5">
              <q-btn outline rounded color="white" class="uku-signup-button" label="Sign in" type="submit" />
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
export default {
  name: 'Signin',
  data() {
    return {
      page: 'login',
      title: 'Signin',
      subtitle: 'Use your email and password to continue',
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
        $nuxt.$fireAuth
          .signInWithEmailAndPassword(that.signin.email, that.signin.password)
          .then(async (user) => {
            if (user) {
              if (user.user.emailVerified) {
                // Our middleware will check first if the user is past onboarding
                // and redirect them to the dashboard if required before the
                // integrations page is created
                $nuxt.$nextTick(() => {
                  setTimeout(() => {
                    // We do this to give our auth action changed method time to kick in
                    $nuxt.$router.push('/dashboard')
                  }, 2000)
                })
              } else {
                /* Make sure we are signed out */
                $nuxt.$fireAuth.signOut()
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
            this.$log.error(error)
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
@import "../assets/sass/theme-variables"

.uku-signin
  min-height: inherit
  margin: 0 auto
  padding: 40px 30px
  .uku-signin-form
    max-width: 560px
    border-radius: 4px
    border: solid 1px #ffffff
    padding: 20px
    .uku-signin-title
      width: 100%
      color: $white
      font-size: 26px
      line-height: 30px
      font-weight: 400
      letter-spacing 0.10px
      word-spacing 1px
      text-decoration: underline
      margin: 0 auto 15px
    .uku-signin-subtitle
      width: 100%
      color: $white
      font-size: 16px
      line-height: 26px
      font-weight: 400
      letter-spacing 0.6px
      margin: 0 auto 20px
    .uku-form
      max-width: 500px
      // .q-field__native,
      // select
      //   color: rgba(0, 0, 0, 0.87) !important
      // .q-input,
      // .q-field
      //   max-width: 442px !important
      //   padding-bottom: 23.6px
      // .q-field__label,
      // .field-label
      //   color: #ffffff
      //   font-size: 14px
      //   line-height: 1.71
      //   font-weight: normal
      //   font-stretch: normal
      //   font-style: normal
      //   letter-spacing: normal
      //   text-align: left
      //   margin-top: 20px
      //   margin-bottom: 10px
      //   span.optional-msg
      //     color: #ffffff
      // .q-field--labeled .q-field__native,
      // .q-field--labeled .q-field__prefix,
      // .q-field--labeled .q-field__suffix
      //   line-height: 24px
      //   padding-top: 10px !important
      //   padding-bottom: 8px
      .password-update
        color: #ffffff
        font-size: 12px
        line-height: 1.25
        letter-spacing: 0.6px
        font-weight: bold
        font-stretch: normal
        font-style: normal
        cursor: pointer
        &:hover, &:focus
          color: #ffffff
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
        background-color: #2e353b
        cursor: pointer
      .uku-forgot-text
        width: 100%
        color: #ffffff
        font-size: 14px
        line-height: 1.21
        font-weight: normal
        font-stretch: normal
        font-style: normal
        letter-spacing: normal
        text-align: left
        margin: 0 0 25px 0
    .uku-welcome-text
      width: 100%
      color: #ffffff
      font-size: 14px
      line-height: 1.57
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: center
      margin: 23px auto 0
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

/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none

/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none

// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
</style>
