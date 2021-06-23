<template>
  <div class="row uku-hero items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row items-start uku-hero-card">
        <div class="col-8 col-lg-8 col-md-8 col-sm-8 col-xs-12">
          <div class="uku-hero-title">{{ title }}</div>
          <div class="uku-hero-subtitle">{{ subtitle }}</div>
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
          <div class="uku-hero-buttons full-width" align="right">
            <q-btn
              v-if="(user && user.role === 'admin') || user.role === 'manager'"
              outline
              rounded
              color="white"
              class="q-ml-sm q-mb-sm"
              label="+ Add Branch"
            />
          </div>
        </div>
      </div>
      <div class="row items-start justify-center uku-user-col">
        <div class="col-12 col-md-12 col-sm-12 col-xs-12">
          <q-form ref="usersForm" class="uku-form" @submit="onSubmit" @reset="resetForm">
            <!-- Row -->
            <div class="row">
              <div class="col-10 col-md-9 col-sm-8 col-xs-6 self-start">
                <div class="row items-center no-wrap">
                  <h2 class="user-username">
                    {{ user.name }}
                  </h2>
                </div>
              </div>
              <div class="col-2 col-md-3 col-sm-4 col-xs-6 self-start">
                <div class="row items-center justify-end no-wrap">
                  User Details
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
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="user-item">Full Name</h2>
                <q-input v-model="user.name" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="1">
                      {{ user.name }}
                    </div>
                  </template>
                </q-input>
                <h2 class="user-item">Email</h2>
                <q-input v-model="user.email" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="2">
                      {{ user.email }}
                    </div>
                  </template>
                </q-input>
                <h2 class="user-item">Phone Number</h2>
                <q-input v-model="user.phoneNumber" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="3">
                      {{ user.phoneNumber }}
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="user-item">Binance Account ID</h2>
                <q-input v-model="user.binanceId" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="4">
                      {{ user.binanceId }}
                    </div>
                  </template>
                </q-input>
                <h2 class="user-item">Binance Wallet Address</h2>
                <q-input v-model="user.busdWalletAddress" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="5">
                      {{ user.busdWalletAddress }}
                    </div>
                  </template>
                </q-input>
                <h2 class="user-item">MetaMask Wallet Address</h2>
                <q-input v-model="user.metaMaskAccount" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="6">
                      {{ user.metaMaskAccount }}
                    </div>
                  </template>
                </q-input>
              </div>
            </div>
            <!-- Row -->
            <div class="row">
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="user-item">User Type</h2>
                <q-select v-model="user.profileType" color="black" outlined tabindex="7" :options="profileTypes">
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
                <h2 class="user-item">Integration Type</h2>
                <q-select v-model="user.integrationType" color="black" outlined tabindex="8" :options="integrationTypes">
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
                <q-btn flat icon="chevron_left" color="black" label="Go Back" to="/dashboard" />
              </div>
              <div class="col-8 col-md-8" align="right">
                <q-btn
                  unelevated
                  :label="!user.organisationId ? 'Create' : 'Update'"
                  :color="!user.organisationId ? 'secondary' : 'primary'"
                  type="submit"
                  class="q-ml-sm"
                />
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
import users from '../../util/functions/users'
/* LFG */
export default {
  name: 'UsersForm',
  data() {
    return {
      title: 'Create a User',
      subtitle: 'Create a new User for your Organisation',
      isValid: false,
      user: {
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
  methods: {
    onSubmit(evt) {
      this.$refs.usersForm
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
              if (this.user && this.user.organisationId && this.user.userId) {
                users.saveUser(this.user)
              } else {
                users.createUser(this.user)
              }
              this.$q.notify({
                color: 'grey',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Congratulations, your User details have been updated successfully!',
              })
              this.resetForm()
            } catch (error) {
              this.$q.notify({
                color: 'red-6',
                textColor: 'white',
                icon: 'warning',
                message: `Error saving User details : ${error}`,
              })
            }
          }
        })
        .catch((error) => {
          this.isValid = false
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving User details : ${error}`,
          })
        })
    },
    resetForm() {
      this.isValid = false
      this.user.uid = null
      this.user.organisationId = null
      this.user.role = null
      this.user.name = null
      this.user.email = null
      this.user.emailVerified = null
      this.user.phoneCode = null
      this.user.phoneNumber = null
      this.user.photoURL = null
      this.user.profileType = null
      this.user.integrationType = null
      this.user.binanceId = null
      this.user.busdWalletAddress = null
      this.user.metaMaskAccount = null
      this.user.onboardingState = null
      this.user.dateCreated = null
      this.user.lastEdit = null
      this.$refs.usersForm.resetValidation()
    },
  },
}
</script>
<style lang="sass" scoped>
.uku-user-col
  padding: 40px
  .uku-form
    max-width: 1100px
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
    .user-username
      font-size: 20px
      font-weight: bold
      line-height: 1.2
      color: #2e3133
      margin-bottom: 12px
    .user-active-status-dot
      height: 8px
      width: 8px
      background-color: #45d597
      border-radius: 50%
      display: inline-block
    .user-active-status
      font-size: 14px
      font-weight: bold
      font-style: normal
      line-height: 1.14
      color: #45d597
      margin-bottom: 30px
    .user-item
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

/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .hide-on-tablet
    display: none
  .uku-user-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 30px
// $breakpoint-md: 959px !default
@media only screen and (max-width: 959px)
  .uku-user-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 30px
// $breakpoint-sm: 839px !default
@media only screen and (max-width: 839px)
  .uku-user-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 20px
// $breakpoint-xs: 479px !default
@media only screen and (max-width: 479px)
  .uku-user-col
    padding: 0
    .uku-form
      max-width: 100%
      border: none
      box-shadow: none
      margin: 0 auto
      padding: 20px
      .q-input
        max-width: 440px !important
      .select-menu-item
        max-width: 440px !important
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .uku-user-col
    padding: 0
    .uku-form
      max-width: 100%
      border: none
      box-shadow: none
      margin: 0
      padding: 20px
      .q-input
        max-width: 340px !important
      .select-menu-item
        max-width: 340px !important
</style>
