<template>
  <q-layout view="hHh lpR fFf">
    <HeaderLogo />
    <q-page-container class="uku-green-bg">
      <q-page>
        <div class="row uku-row uku-signup-page uku-signup-bg-image">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="uku-welcome">
              <div class="row items-center no-wrap">
                <div class="uku-welcome-title">Create your Account</div>
              </div>
              <div class="row items-center justify-center no-wrap" align="center">
                <div class="uku-welcome-title-text">Sign up by filling in your account details below</div>
              </div>
              <div class="row no-wrap items-center justify-center" align="center">
                <q-form ref="signupForm" class="q-gutter-md uku-form" autocomplete="off" @submit="signUp">
                  <div class="self-center full-width no-outline" tabindex="1">
                    <q-input
                      v-model="signup.name"
                      outlined
                      name="username"
                      type="text"
                      label="Full Name"
                      label-color="grey"
                      placeholder="Full Name"
                      color="black"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please enter your name to continue']"
                      autocomplete="username"
                    />
                  </div>
                  <div class="self-center full-width no-outline" tabindex="2">
                    <q-input
                      v-model="signup.email"
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
                    />
                  </div>
                  <div class="self-center full-width no-outline" tabindex="3">
                    <q-input
                      v-model="signup.password"
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
                    >
                      <template #append>
                        <span class="password-update" :name="isPwd ? 'visibility_off' : 'visibility'" @click="togglePasswordVisibility">
                          {{ passwordLabel }}
                        </span></template
                      >
                    </q-input>
                  </div>
                  <div class="self-center full-width no-outline q-py-xs" tabindex="4">
                    <q-checkbox
                      v-model="accept"
                      size="sm"
                      color="black"
                      class="uku-terms"
                      :true-value="true"
                      :false-value="false"
                      :toggle-indeterminate="false"
                    >
                      <template #default>
                        I accept Ukulima’s
                        <a href="https://ukulima.africa/terms" alt="Terms &amp; Conditions" target="_blank" class="uku-terms-link"
                          >Terms &amp; Conditions</a
                        >&nbsp;and
                        <a href="https://ukulima.africa/privacy" alt="Privacy &amp; Data Policy" target="_blank" class="uku-terms-link"
                          >Privacy Policy</a
                        >
                      </template>
                    </q-checkbox>
                  </div>
                  <div class="self-center full-width no-outline" tabindex="5">
                    <q-btn class="uku-signup-button" label="Sign Up" type="submit" />
                  </div>
                </q-form>
              </div>
              <div class="row items-center no-wrap">
                <div class="uku-welcome-text">
                  Already have an account?
                  <nuxt-link to="/auth/signin" class="uku-welcome-link">Sign In ›</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Next Steps Section -->
        <div class="row uku-row uku-next-steps">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 self-center" align="center">
            <div class="uku-steps">
              <div class="row items-center no-wrap">
                <div class="uku-steps-title">Next steps…</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-heading">1. Verify your account</div>
                <div class="uku-steps-text">Please go to your inbox and click the confirmation link to verify your contact details</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-heading">2. Sync your Metamask account or crypto wallet</div>
                <div class="uku-steps-text">Let’s get you connected to the Binance Smart Chain or BSC network</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-heading">3. Complete registration steps and receive your bonus tokens</div>
                <div class="uku-steps-text">Register today and complete your first blockchain transaction with Ukulima Africa</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-heading">4. Start using Ukulima and let's invest in our future together</div>
                <div class="uku-steps-text">Set up your profile and join Ukulima Africa now!</div>
              </div>
              <div class="row items-center justify-center" align="left">
                <div class="uku-steps-text">For more information please feel free to get in touch with us...</div>
              </div>
            </div>
          </div>
        </div>
        <!-- END Next Steps Section -->
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
  name: 'Signup',
  components: {
    HeaderLogo,
    Footer,
  },
  data() {
    return {
      page: 'signup',
      loading: false,
      signup: {
        name: '',
        email: '',
        password: '',
      },
      isPwd: true,
      passwordLabel: 'SHOW',
      accept: false,
    }
  },
  methods: {
    async signUp() {
      const that = this
      this.loading = true

      /* Ensure form is valid */
      const formValidation = await that.$refs.signupForm.validate().then((outcome) => {
        return outcome
      })

      if (formValidation === true) {
        if (that.accept !== true) {
          that.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Kindly read and accept our Terms & Conditions to continue',
          })
        } else {
          // sign up user using firebase auth
          $nuxt.$fire.auth
            .createUserWithEmailAndPassword(that.signup.email, that.signup.password)
            .then(async (userCredential) => {
              // we store this users name and email in our firestore database.
              try {
                await $nuxt.$fire.firestore.collection('users').doc($nuxt.$fire.auth.currentUser.uid).set(
                  {
                    name: that.signup.name,
                    email: that.signup.email,
                  },
                  { merge: true },
                )
              } catch (error) {
                const errorCode = error.code
                const errorMessage = error.message

                that.$q.notify({
                  color: 'red-6',
                  textColor: 'white',
                  icon: 'warning',
                  message: `Error details Account: ${errorCode} : ${errorMessage}`,
                })
              }

              /* Reset form */
              try {
                that.$refs.signupForm.resetValidation()
                that.$refs.signupForm.reset()
              } catch (err) {}

              /* Require first time users to verify their email. */
              await $nuxt.$fire.auth.currentUser.sendEmailVerification()

              // we sign out this newly created user to do email verification first.
              $nuxt.$fire.auth.signOut()

              $nuxt.$router.push('/auth/email-confirmation')

              // show success message
            })
            .catch((error) => {
              const errorCode = error.code
              console.error('errorCode', errorCode)
              const errorMessage = error.message
              // show notification that something went wrong maybe ?
              console.error('errorMessage', errorMessage)
              that.$q.notify({
                color: 'red-6',
                textColor: 'white',
                icon: 'warning',
                message: `Error creating new user account: ${errorMessage}`,
              })
            })
        }
        this.loading = false
      }
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

.uku-signup-page
  min-height: inherit
  margin: 0 auto
  padding: 0
.uku-signup-bg-image
  background-image: url('~assets/images/Agriculture-Supply-Chain.png')
  background-size: contain
  background-repeat: no-repeat
  background-position: center center
  overflow: display
.uku-welcome
  width: 549px
  border-radius: 5px
  border: solid 1px #cecece
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
  background-color: #ffffff
  margin: 0
  padding: 30px 20px 10px 20px
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
    color: #000000
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
    color: $secondary
    font-size: 12px
    line-height: 1.25
    letter-spacing: 0.6px
    font-weight: bold
    font-stretch: normal
    font-style: normal
    cursor: pointer
    &:hover, &:focus
      color: $secondary
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
  .uku-welcome-text
    width: 100%
    color: #575d64
    font-size: 14px
    line-height: 1.57
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    margin: 20px auto 20px
    .uku-welcome-link
      color: $black
      font-weight: bold
      text-decoration: none
  .uku-link
    color: $black !important
    font-size: 14px
    font-weight: bold
    line-height: 1.57
    margin-left: 5px
  .uku-terms
    color: $black !important
    font-size: 14px
    line-height: 1.57
    font-weight: normal
    font-stretch: normal
    font-style: normal
  .uku-terms-link
    color: $primary !important
    font-size: 14px
    line-height: 1.71
    letter-spacing: 0.13px
    font-weight: bold
    font-stretch: normal
    font-style: normal
    cursor: pointer
    z-index: 9999 !important
    &:hover, &::focus
      text-decoration: underline

.uku-next-steps
  min-height: 480px
  margin: 0 auto
  padding: 0
  background-color: none
  .uku-steps
    max-width: 647px
    margin: 0 auto
    padding: 0
    .uku-steps-title
      color: #333333
      font-size: 37px
      line-height: 1.19
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 0 25px
    .uku-steps-heading
      width: 100%
      color: #000000
      font-size: 20px
      line-height: 1.4
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 auto 14px
    .uku-steps-text
      width: 100%
      color: #333333
      font-size: 16px
      line-height: 1.56
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 auto 20px

// $breakpoint-xs: 479px !default
@media only screen and (max-width : 479px)
  .q-page-container
    padding-top: 0 !important
    padding-bottom: 0 !important
    .uku-signup-page
      overflow: hidden
    .uku-signup-bg-image
      background-image: none
      .uku-welcome
        width: 90%
        border-radius: 4px
        box-shadow: none !important
        padding: 15px
        margin-top: 100px
        .uku-form
          width: 100%
          margin-left: auto
          margin-right: auto
        .uku-signup-button
          width: 100%
        .uku-welcome-title
          font-size: 34px
          line-height: 1.21
          margin: 0px auto 15px
    .uku-next-steps
      .uku-steps
        margin-left: 15px

// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width : 359px)
  .q-page-container
    padding-top: 0 !important
    padding-bottom: 0 !important
  .uku-signup-page
    overflow: hidden
  .uku-signup-bg-image
    background-image: none
  .uku-welcome
    width: 90%
    border-radius: 4px
    box-shadow: none !important
    padding: 15px
    .uku-form
      width: 100%
      margin-left: auto
      margin-right: auto
    .uku-welcome-title
      font-size: 34px
      line-height: 1.21
      margin: 40px auto 34px
</style>
