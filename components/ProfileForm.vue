<template>
  <q-form ref="skwirrelForm" class="skwirrel-form">
    <div class="row page-header-row">
      <div class="col-12 col-md-12 col-sm-12 col-xs-12">
        <div class="skwirrel-form-box">
          <h2 class="profile-username" data-cy="nameSelector">
            {{ profile.name }}
          </h2>
          <div class="row">
            <div class="profile-active-status-dot q-mt-xs"></div>
            <div class="profile-active-status q-ml-sm" data-cy="integrationTypeSelector">
              {{ profile.integrationType }}
            </div>
          </div>
          <q-item-section>
            <div class="row items-center no-wrap profile-item">
              Seller Status
              <nuxt-link to="/">
                <q-icon
                  :name="`img:${require('@/assets/icons/HelpIcon.svg') ? require('@/assets/icons/HelpIcon.svg') : ''}`"
                  size="xs"
                  class="q-ml-sm"
                />
              </nuxt-link>
            </div>
          </q-item-section>
          <h2 class="profile-item">Profile Type</h2>
          <q-field v-model="profile.profileType" color="black" readonly outlined data-cy="profileTypeSelector">
            <template #control>
              <div class="self-center full-width no-outline" tabindex="1">
                {{ profile.profileType }}
              </div>
            </template>
          </q-field>
          <h2 class="profile-item">Name</h2>
          <q-field v-model="profile.name" color="black" readonly outlined data-cy="profileNameSelector">
            <template #control>
              <div class="self-center full-width no-outline" tabindex="2">
                {{ profile.name }}
              </div>
            </template>
          </q-field>
          <h2 class="profile-item">Email</h2>
          <q-field v-model="profile.email" color="black" readonly outlined data-cy="profileEmailSelector">
            <template #control>
              <div class="self-center full-width no-outline" tabindex="3">
                {{ profile.email }}
              </div>
            </template>
          </q-field>
          <div class="self-center full-width no-outline q-mt-lg" tabindex="4">
            <q-btn flat class="skwirrel-signup-button" label="Reset Password" data-cy="resetPasswordSelector" @click="sendPasswordResetLink" />
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>
<script>
export default {
  name: 'ProfileForm',
  data() {
    return {
      profile: {
        profileType: null,
        integrationType: null,
        name: null,
        email: null,
      },
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
.skwirrel-form
  max-width: 800px
  margin-left: 184px
  padding: 0
  .skwirrel-form-box
    max-width: 400px
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
  .skwirrel-form
    max-width: 800px
    margin-left: 0
    padding: 0
    .skwirrel-form-box
      max-width: 800px
      .q-input
        max-width: 800px
// $breakpoint-sm: 839px !default
@media only screen and (max-width: 839px)
  .skwirrel-form
    max-width: 800px
    margin-left: 0
    padding: 0
    .skwirrel-form-box
      max-width: 800px
      .q-input
        max-width: 800px
// $breakpoint-xs: 479px !default
@media only screen and (max-width: 479px)
  .skwirrel-form
    max-width: 100%
    margin: 0
    padding: 0
    .skwirrel-form-box
      max-width: 100%
      .q-input
        max-width: 100%
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .skwirrel-form
    max-width: 100%
    margin: 0
    padding: 0
    .skwirrel-form-box
      max-width: 100%
      .q-input
        max-width: 100%
</style>
