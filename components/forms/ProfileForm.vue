<template>
  <div class="row uku-marketplace items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row items-start uku-marketplace-card">
        <div class="col-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div class="uku-marketplace-title">{{ title }}</div>
          <div class="uku-marketplace-subtitle">{{ subtitle }}</div>
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="uku-marketplace-buttons full-width" align="right">
            <q-btn outline rounded color="white" class="q-ml-sm q-mb-sm" label="Cancel" />
            <q-btn rounded color="primary" class="q-ml-sm q-mb-sm" label="+ Add New" />
          </div>
        </div>
      </div>
      <div class="row items-start justify-center q-pa-lg">
        <div class="col-12 col-md-12 col-sm-12 col-xs-12">
          <q-form ref="profileForm" class="uku-form" @submit="onSubmit">
            <!-- Row -->
            <div class="row">
              <div class="col-10 col-md-9 col-sm-8 col-xs-6 self-start">
                <div class="row items-center no-wrap">
                  <h2 class="profile-username">
                    {{ profile.name }}
                  </h2>
                </div>
              </div>
              <div class="col-2 col-md-3 col-sm-4 col-xs-6 self-start">
                <div class="row items-center justify-end no-wrap">
                  Profile Details
                  <q-icon
                    :name="`img:${require('@/assets/icons/HelpIcon.svg') ? require('@/assets/icons/HelpIcon.svg') : ''}`"
                    size="xs"
                    class="q-ml-sm"
                  />
                </div>
              </div>
            </div>
            <!-- Row -->
            <div class="row">
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start q-pr-lg">
                <h2 class="profile-item">Full Name</h2>
                <q-input v-model="profile.name" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="1">
                      {{ profile.name }}
                    </div>
                  </template>
                </q-input>
                <h2 class="profile-item">Email</h2>
                <q-input v-model="profile.email" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="2">
                      {{ profile.email }}
                    </div>
                  </template>
                </q-input>
                <h2 class="profile-item">Phone Number</h2>
                <q-input v-model="profile.phoneNumber" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="3">
                      {{ profile.phoneNumber }}
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="profile-item">Binance Account ID</h2>
                <q-input v-model="profile.binanceId" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="4">
                      {{ profile.binanceId }}
                    </div>
                  </template>
                </q-input>
                <h2 class="profile-item">Binance Wallet Address</h2>
                <q-input v-model="profile.binanceAccount" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="5">
                      {{ profile.binanceAccount }}
                    </div>
                  </template>
                </q-input>
                <h2 class="profile-item">MetaMask Wallet Address</h2>
                <q-input v-model="profile.metaMaskAccount" color="black" outlined>
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
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start q-pr-lg">
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
                <q-select v-model="profile.integrationType" color="black" outlined tabindex="8" :options="integrationTypes">
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
            <!-- Form Footer -->
            <div class="uku-form-footer row justify-end q-mt-xl">
              <div class="col-4 col-md-4" align="left">
                <div align="left">
                  <q-btn flat color="black" label="Go Back" to="/dashboard" />
                  <q-btn outline color="secondary" label="Reset Password" @click="sendPasswordResetLink" />
                </div>
              </div>
              <div class="col-8 col-md-8" align="right">
                <!-- DEV NOTE: We only need to update the Users Profile -->
                <q-btn unelevated label="Update" color="primary" type="submit" class="q-ml-sm" />
              </div>
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
      subtitle: 'Update your Profile details and user information',
      isValid: false,
      profile: {
        uid: null,
        organisationId: null,
        role: null,
        name: null,
        email: null,
        emailVerified: null,
        phoneCode: null,
        phoneNumber: null,
        photoURL: null,
        profileType: null,
        integrationType: null,
        binanceId: null,
        binanceAccount: null,
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
    console.log('Profile Data:', this.profile)
  },
  methods: {
    async onSubmit(evt) {
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
                color: 'grey',
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
          this.$log.error(error)
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
        $nuxt.$fireAuth
          .sendPasswordResetEmail(this.profile.email)
          .then(() => {
            this.$q.notify({
              color: 'green-4',
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
              message: `Error Reseting Password: ${errorCode}: ${errorMessage}`,
            })
            this.$log.error(error)
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
.uku-form
  max-width: 1000px
  background: $white
  border-radius: 5px
  border: solid 1px $secondary
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
  padding: 40px
  margin: 40px auto
  .q-input
    max-width: 600px
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
  .select-menu-item
    max-width: 600px
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

// $breakpoint-md: 959px !default
@media only screen and (max-width: 959px)
  .uku-form
    max-width: 800px
    margin-left: 0
    padding: 0
    .q-input
      max-width: 600px
// $breakpoint-sm: 839px !default
@media only screen and (max-width: 839px)
  .uku-form
    max-width: 800px
    margin: 0
    padding: 0
    .q-input
      max-width: 600px
// $breakpoint-xs: 479px !default
@media only screen and (max-width: 479px)
  .uku-form
    max-width: 100%
    margin: 0
    padding: 0
    .q-input
      max-width: 90%
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .uku-form
    max-width: 100%
    margin: 0
    padding: 0
    .q-input
      max-width: 90%
</style>
