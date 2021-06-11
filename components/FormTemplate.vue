<template>
  <q-form ref="skwirrelForm" class="skwirrel-form" @submit="onSubmit" @reset="resetForm">
    <div class="row page-header-row">
      <div class="col-8 col-md-8 col-sm-12 col-xs-12 self-start">
        <div class="column" style="max-width: 400px">
          <!-- Example 1 -->
          <h2 class="profile-item">Contact Number</h2>
          <q-input v-model="profile.phoneNumber" color="black" outlined>
            <template #control>
              <div class="self-center full-width no-outline" tabindex="3">
                {{ profile.phoneNumber }}
              </div>
            </template>
          </q-input>
          <!-- END Example 1 -->
          <!-- Example 2 -->
          <div class="self-center full-width no-outline" tabindex="1">
            <q-input
              v-model="profile.firstName"
              type="text"
              label="First Name"
              stack-label
              hint="The item you make or purchase for re-sale"
              reactive-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Please enter your First Name to continue!',
                (val) => (val.length > 0 && val.length >= 3) || 'Please enter a First Name to continue, a minimum of 3 characters is required!',
              ]"
            />
          </div>
          <!-- END Example 2 -->

          <div class="self-center full-width no-outline" tabindex="2">
            <q-toggle v-model="accept" label="I accept the Terms &amp; Conditions" />
          </div>

          <!-- Skwirrel Form Footer -->
          <div class="skwirrel-form-footer row justify-end">
            <div class="col-6 col-md-6" align="left">
              <div align="left">
                <!-- Place Buttons, Links or Good Vibes Here -->
              </div>
            </div>
            <div class="col-6 col-md-6" align="right">
              <nuxt-link to="/inventory">
                <q-btn flat label="Cancel" class="black q-ml-sm" />
              </nuxt-link>
              <q-btn outline label="Reset" type="reset" class="outline-button q-ml-sm" />
              <q-btn flat label="Create" type="submit" class="black-button q-ml-sm" />
            </div>
          </div>
          <!-- END Skwirrel Form Footer -->
        </div>
      </div>
    </div>
  </q-form>
</template>

<script>
export default {
  name: 'UserProfileSettings',
  data() {
    return {
      isValid: false,
      profile: {
        firstName: null,
      },
      accept: false,
    }
  },
  methods: {
    onSubmit(evt) {
      // evt.target.submit()

      this.$refs.skwirrelForm
        .validate()
        .then((success) => {
          if (!success) {
            this.isValid = false
            return false
          }
          // yay, forms are correct

          /* We need to set our notify Defaults */
          this.$q.notify.setDefaults({
            position: 'top',
            timeout: 3500,
            textColor: 'white',
            actions: [{ icon: 'close', color: 'white' }],
          })

          if (this.accept !== true) {
            this.isValid = false
            this.$q.notify({
              color: 'red-6',
              textColor: 'white',
              icon: 'warning',
              message: 'You need to accept the Terms & Conditions to continue!',
            })
          } else {
            this.isValid = true
            this.$q.notify({
              color: 'green-13',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Congratulations, your new product has been created!',
            })
            // DEV NOTE: Maybe we can route go elsewhere now?
            this.resetForm()
            return true
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
            message: `Error Message: ${error}`,
          })
        })
    },
    resetForm() {
      this.isValid = false
      this.profile.firstName = null
      this.accept = false
      this.$refs.skwirrelForm.resetValidation()
    },
  },
}
</script>

<style lang="sass" scoped>
.skwirrel-form
  max-width: 800px
  margin-left: 184px
  padding: 0
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
  .profile-subtitle
    font-size: 20px
    font-weight: bold
    line-height: 1.2
    color: #2e3133
    margin-top: 49px
    margin-bottom: 12px
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
  .profile-date
    font-size: 14px
    font-weight: 500
    font-style: italic
    line-height: 1
    color: #828689
    margin-bottom: 22px
  .profile-active-status-dot
    height: 8px
    width: 8px
    background-color: #45d597
    border-radius: 50%
    display: inline-block
  .profile-change-button
    font-size: 10px
    line-height: 1.4
    color: #828689
  .profile-notifications
    font-size: 14px
    font-weight: 500
    line-height: 1
    color: #000000
    padding-right: 28px
  .profile-button-padding
    margin: 20px
  .skwirrel-form-footer
    margin: 40px 0 0 0
    padding: 0
</style>
