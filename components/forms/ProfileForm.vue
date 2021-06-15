<template>
  <q-form ref="ukuForm" class="uku-form">
    <div class="row page-header-row">
      <div class="col-12 col-md-12 col-sm-12 col-xs-12">
        <div class="uku-form-box">
          <h2 class="profile-username" data-cy="nameSelector">
            {{ profile.name }}
          </h2>
          <q-item-section>
            <div class="row items-center no-wrap profile-item">
              Profile Settings
              <nuxt-link to="/">
                <q-icon
                  :name="`img:${require('@/assets/icons/HelpIcon.svg') ? require('@/assets/icons/HelpIcon.svg') : ''}`"
                  size="xs"
                  class="q-ml-sm"
                />
              </nuxt-link>
            </div>
          </q-item-section>
          <h2 class="profile-item">Name</h2>
          <q-field v-model="profile.name" color="black" outlined>
            <template #control>
              <div class="self-center full-width no-outline" tabindex="2">
                {{ profile.name }}
              </div>
            </template>
          </q-field>
          <h2 class="profile-item">Email</h2>
          <q-field v-model="profile.email" color="black" outlined>
            <template #control>
              <div class="self-center full-width no-outline" tabindex="3">
                {{ profile.email }}
              </div>
            </template>
          </q-field>
          <h2 class="profile-item">Phone Number</h2>
          <q-field v-model="profile.phoneNumber" color="black" outlined>
            <template #control>
              <div class="self-center full-width no-outline" tabindex="3">
                {{ profile.phoneNumber }}
              </div>
            </template>
          </q-field>
          <h2 class="profile-item">Profile Type</h2>
          <q-select v-model="profile.profileType" color="black" outlined tabindex="4" :options="profileTypes">
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
          <!-- Form Footer -->
          <div class="uku-form-footer row justify-end q-mt-md">
            <div class="col-4 col-md-4" align="left">
              <div align="left">
                <q-btn flat class="uku-signup-button" label="Reset Password" @click="sendPasswordResetLink" />
              </div>
            </div>
            <div class="col-8 col-md-8" align="right">
              <q-btn outline label="Cancel" color="secondary" class="q-ml-sm" />
              <q-btn outline label="Update" color="primary" type="submit" class="q-ml-sm" />
            </div>
          </div>
          <!-- END Form Footer -->
        </div>
      </div>
    </div>
  </q-form>
</template>
<script>
/* LFG */
export default {
  name: 'ProfileForm',
  data() {
    return {
      profile: {
        uid: null,
        name: null,
        email: null,
        emailVerified: null,
        phoneCode: null,
        phoneNumber: null,
        photoURL: null,
        integrationType: 'BEP-20',
        onboardingState: null,
        profileType: null,
        organisationId: null,
        role: 'user',
        dateCreated: null,
        lastEdit: null,
      },
      profileTypes: ['Farmer', 'Business', 'Co-Op', 'Retailer', 'Wholesaler', 'Sponsor'],
      loading: false,
    }
  },
  async mounted() {
    // we can get this info from the store.
    try {
      const profileData = $nuxt.$store.getters.getCompany
      this.profile.profileType = profileData.profileType
    } catch (error) {}

    try {
      const userData = $nuxt.$store.getters.getUser
      this.profile.name = userData.name
      this.profile.email = userData.email
      this.profile.integrationType = userData.integrationType
    } catch (error) {}
  },
  methods: {
    // sendPasswordResetLink() {
    //   this.loading = true
    //   if (this.profile.email != null) {
    //     /* Send a password reset link request via the firebase SDK */
    //     $nuxt.$fireAuth
    //       .sendPasswordResetEmail(this.profile.email)
    //       .then(() => {
    //         this.$q.notify({
    //           color: 'green-4',
    //           textColor: 'white',
    //           icon: 'cloud_done',
    //           message: `An email with your password reset link has been sent to ${this.profile.email}`,
    //         })
    //         $nuxt.$router.push(`/logout`)
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code
    //         const errorMessage = error.message
    //         this.$q.notify({
    //           color: 'red-6',
    //           textColor: 'white',
    //           icon: 'warning',
    //           message: `Error Reseting Password: ${errorCode}: ${errorMessage}`,
    //         })
    //         this.$log.error(error)
    //       })
    //   } else {
    //     this.$q.notify({
    //       color: 'red-6',
    //       textColor: 'white',
    //       icon: 'warning',
    //       message: `Please enter a valid email to continue`,
    //     })
    //   }
    //   this.loading = false
    // },
  },
}
</script>
<style lang="sass" scoped>
.uku-form
  max-width: 800px
  margin: 0 auto
  padding: 0
  .uku-form-box
    max-width: 600px
    .q-input
      max-width: 400px
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
    margin-top: 58px
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
// $breakpoint-md: 959px !default
@media only screen and (max-width: 959px)
  .uku-form
    max-width: 800px
    margin-left: 0
    padding: 0
    .uku-form-box
      max-width: 800px
      .q-input
        max-width: 800px
// $breakpoint-sm: 839px !default
@media only screen and (max-width: 839px)
  .uku-form
    max-width: 800px
    margin-left: 0
    padding: 0
    .uku-form-box
      max-width: 800px
      .q-input
        max-width: 800px
// $breakpoint-xs: 479px !default
@media only screen and (max-width: 479px)
  .uku-form
    max-width: 100%
    margin: 0
    padding: 0
    .uku-form-box
      max-width: 100%
      .q-input
        max-width: 100%
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .uku-form
    max-width: 100%
    margin: 0
    padding: 0
    .uku-form-box
      max-width: 100%
      .q-input
        max-width: 100%
</style>
