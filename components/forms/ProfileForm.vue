<template>
  <div class="row uku-hero items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row items-start uku-hero-card">
        <div class="col-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">
          <div class="uku-hero-title">{{ title }}</div>
          <div class="uku-hero-subtitle">{{ subtitle }}</div>
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">
          <div class="uku-hero-buttons full-width" align="right">
            <!-- <q-btn outline rounded color="white" class="q-ml-sm q-mb-sm" label="Cancel" /> -->
            <!-- <q-btn rounded color="primary" class="q-ml-sm q-mb-sm" label="+ Add New" /> -->
          </div>
        </div>
      </div>
      <div class="row items-start justify-center uku-profile-col">
        <div class="col-12 col-md-12 col-sm-12 col-xs-12">
          <q-form ref="profileForm" class="uku-form" @submit="onSubmit">
            <!-- Row -->
            <div class="row">
              <div class="col-10 col-md-9 col-sm-7 col-xs-7 self-start">
                <div class="row items-center no-wrap">
                  <h2 class="profile-username">
                    {{ profile.name }}
                  </h2>
                </div>
              </div>
              <div class="col-2 col-md-3 col-sm-5 col-xs-5 self-start">
                <div class="row items-center justify-end no-wrap profile-details">
                  Profile Details
                  <q-icon
                    :name="`img:${
                      require('@/assets/icons/HelpIcon.svg') ? require('@/assets/icons/HelpIcon.svg') : ''
                    }`"
                    size="xs"
                    class="q-ml-sm"
                  />
                </div>
              </div>
            </div>
            <!-- Row -->
            <div class="row">
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="profile-item">Full Name</h2>
                <q-input v-model="profile.name" type="text" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="1">
                      {{ profile.name }}
                    </div>
                  </template>
                </q-input>
                <h2 class="profile-item">Email</h2>
                <q-input v-model="profile.email" type="email" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="2">
                      {{ profile.email }}
                    </div>
                  </template>
                </q-input>
                <h2 class="profile-item">Phone Number</h2>
                <q-input v-model="profile.phoneNumber" type="tel" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="3">
                      {{ profile.phoneNumber }}
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="profile-item">Binance Account ID</h2>
                <q-input v-model="profile.binanceId" type="text" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="4">
                      {{ profile.binanceId }}
                    </div>
                  </template>
                </q-input>
                <h2 class="profile-item">BUSD Wallet Address</h2>
                <q-input v-model="profile.busdWalletAddress" type="text" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="5">
                      {{ profile.busdWalletAddress }}
                    </div>
                  </template>
                </q-input>
                <h2 class="profile-item">MetaMask Wallet Address</h2>
                <q-input v-model="profile.metaMaskAccount" type="text" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="6">
                      {{ profile.metaMaskAccount }}
                    </div>
                  </template>
                </q-input>
              </div>
            </div>
            <!-- Row -->
            <div class="row">
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="profile-item">Profile Type</h2>
                <q-select v-model="profile.profileType" color="black" outlined tabindex="7" :options="profileTypes">
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps" class="select-menu-item" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label>{{ scope.opt }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">Select</q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="profile-item">Integration Type</h2>
                <q-select
                  v-model="profile.integrationType"
                  color="black"
                  outlined
                  tabindex="8"
                  :options="integrationTypes"
                >
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps" class="select-menu-item" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label>{{ scope.opt }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">Select</q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <!-- Row -->
            <div class="row">
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start q-mt-md">
                <q-btn unelevated color="secondary" label="Reset Password" @click="sendPasswordResetLink" />
              </div>
            </div>
            <!-- Form Footer -->
            <div class="uku-form-footer row justify-between q-mt-md">
              <q-btn outline icon="chevron_left" color="black" label="Go Back" to="/dashboard" />
              <q-btn unelevated icon-right="chevron_right" label="Update" color="primary" type="submit" />
            </div>
            <!-- END Form Footer -->
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* Import Utils */
import profile from '../../util/functions/profile'
/* LFG */
export default {
  name: 'ProfileForm',
  data() {
    return {
      title: 'Profile Details',
      subtitle: 'Update your profile details and user information',
      isValid: false,
      profile: {
        uid: null,
        organisationId: null,
        name: null,
        email: null,
        emailVerified: null,
        phoneCode: null,
        phoneNumber: null,
        photoURL: null,
        profileType: null,
        integrationType: null,
        binanceId: null,
        busdWalletAddress: null,
        metaMaskAccount: null,
        onboardingState: null,
        dateCreated: null,
        lastEdit: null,
      },
      profileTypes: ['Farmer', 'Business', 'Co-Op', 'Retailer', 'Wholesaler', 'Sponsor', 'Investor', 'Other'],
      integrationTypes: ['ERC-20', 'BEP-2', 'BEP-20'],
      loading: false,
    }
  },
  async mounted() {
    const userId = $nuxt.$fire.auth.currentUser.uid
    if (userId) {
      this.profile.uid = userId
    }
    const profileData = await profile.getProfile()
    Object.assign(this.profile, profileData)
  },
  methods: {
    onSubmit(evt) {
      this.$refs.profileForm
        .validate()
        .then((success) => {
          if (success) {
            this.isValid = true
            /* We need to set our notify Defaults */
            this.$q.notify.setDefaults({
              position: 'bottom',
              timeout: 4000,
              textColor: 'white',
              actions: [{ icon: 'close', color: 'white' }],
            })
            /* Saving to Firesatore */
            try {
              profile.saveProfile(this.profile)
              this.$q.notify({
                color: 'secondary',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Congratulations, your Profile details have been updated successfully!',
              })
              return true
            } catch (error) {
              this.$q.notify({
                color: 'red-6',
                textColor: 'white',
                icon: 'warning',
                message: `Error saving user Profile details : ${error}`,
              })
              return false
            }
          }
          return false
        })
        .catch((error) => {
          this.isValid = false
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user Profile details : ${error}`,
          })
        })
    },
    sendPasswordResetLink() {
      this.loading = true
      if (this.profile.email != null) {
        /* Send a password reset link request via the firebase SDK */
        $nuxt.$fire.auth
          .sendPasswordResetEmail(this.profile.email)
          .then(() => {
            this.$q.notify({
              color: 'secondary',
              textColor: 'white',
              icon: 'cloud_done',
              message: `An email with your password reset link has been sent to ${this.profile.email}`,
            })
            $nuxt.$router.push(`/logout`)
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            this.$q.notify({
              color: 'red-6',
              textColor: 'white',
              icon: 'warning',
              message: `Error reseting your Password, please refresh and try again: ${errorCode}: ${errorMessage}`,
            })
          })
      } else {
        this.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Please enter a valid email address to continue`,
        })
      }
      this.loading = false
    },
  },
}
</script>
<style lang="sass" scoped>
.uku-profile-col
  padding: 40px
  .uku-form
    max-width: 1100px
    background: $white
    border-radius: 5px
    border: solid 1px $secondary
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
    padding: 40px
    margin: 0 auto
    .q-input, .q-select
      max-width: 460px !important
    .q-field__label
      font-size: 14px
      line-height: 20px
      font-weight: 400
      letter-spacing: .00937em
    .profile-username
      font-size: 20px
      font-weight: bold
      line-height: 1.2
      color: #2e3133
      margin-bottom: 12px
    .profile-active-status-dot
      height: 8px
      width: 8px
      background-color: #45d597
      border-radius: 50%
      display: inline-block
    .profile-active-status
      font-size: 14px
      font-weight: bold
      font-style: normal
      line-height: 1.14
      color: #45d597
      margin-bottom: 30px
    .profile-item
      font-size: 14px
      font-weight: 500
      line-height: 1
      text-align: left
      color: black
      margin-top: 24px
      margin-bottom: 10px
    .select-menu-item, .q-field__native, .q-field__input
      max-width: 460px !important
      height: 24px !important
      margin: 5px
      padding: 10px 14px
      color: #333333
      font-size: 12px
      line-height: 1.83
      font-weight: 500
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: left
      &:hover,
      &:focus
        height: 24px !important
        line-height: 1.83 !important
        border-radius: 5px
        background: #f4f6f7 !important
        opacity: 1 !important
      &:before
        opacity: 1 !important
      &:after
        opacity: 1 !important
/* Links & Buttons */
a,
.nuxt-link
  text-decoration: none
  cursor: pointer
  &:hover,
  &:active,
  &:focus,
  .nuxt-link-exact-active
    text-decoration: none
    cursor: pointer
/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .hide-on-tablet
    display: none
  .uku-profile-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 30px
      .q-input, .q-select
        max-width: 460px !important
// $breakpoint-md: 959px !default
@media only screen and (max-width: 959px)
  .uku-profile-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 30px
      .q-input, .q-select
        max-width: 460px !important
// $breakpoint-sm: 839px !default
@media only screen and (max-width: 839px)
  .uku-profile-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 20px
      .q-input, .q-select
        max-width: 460px !important
// $breakpoint-xs: 479px !default
@media only screen and (max-width: 479px)
  .uku-profile-col
    padding: 0
    .uku-form
      max-width: 100%
      border: none
      box-shadow: none
      margin: 0 auto
      padding: 20px
      .profile-details
        text-align: left
        justify-content: flex-start
      .q-input, .q-select
        max-width: 440px !important
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .uku-profile-col
    padding: 0
    .uku-form
      max-width: 100%
      border: none
      box-shadow: none
      margin: 0 auto
      padding: 20px
      .profile-details
        text-align: left
        justify-content: flex-start
      .q-input, .q-select
        max-width: 340px !important
</style>
