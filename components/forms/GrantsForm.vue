<template>
  <div class="row uku-hero items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <!-- <div class="row items-start uku-hero-card">
        <div class="col-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div class="uku-hero-title">{{ title }}</div>
          <div class="uku-hero-subtitle">{{ subtitle }}</div>
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="uku-hero-buttons full-width" align="right">
            <q-btn outline rounded color="white" class="q-ml-sm q-mb-sm" label="Cancel" />
            <q-btn rounded color="primary" class="q-ml-sm q-mb-sm" label="+ Add New" />
          </div>
        </div>
      </div> -->
      <div class="row items-start justify-center q-pa-lg">
        <div class="col-12 col-md-12 col-sm-12 col-xs-12">
          <q-form ref="grantsForm" class="uku-form" @submit="onSubmit">
            <!-- Row -->
            <div class="row">
              <div class="col-10 col-md-9 col-sm-8 col-xs-6 self-start">
                <div class="row items-center no-wrap">
                  <h2 class="grant-username">
                    {{ grant.name }}
                  </h2>
                </div>
              </div>
              <div class="col-2 col-md-3 col-sm-4 col-xs-6 self-start">
                <div class="row items-center justify-end no-wrap">
                  Grant Details
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
                <h2 class="grant-item">Grant Name</h2>
                <q-input v-model="grant.name" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="1">
                      {{ grant.name }}
                    </div>
                  </template>
                </q-input>
                <h2 class="grant-item">Email</h2>
                <q-input v-model="grant.email" type="email" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="2">
                      {{ grant.email }}
                    </div>
                  </template>
                </q-input>
                <h2 class="grant-item">Contact Number</h2>
                <q-input v-model="grant.contactNumber" type="tel" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="3">
                      {{ grant.contactNumber }}
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="grant-item">Twiiter Profile</h2>
                <q-input v-model="grant.twitter" type="url" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="4">
                      {{ grant.twitter }}
                    </div>
                  </template>
                </q-input>
                <h2 class="grant-item">Facebook Profile</h2>
                <q-input v-model="grant.facebook" type="url" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="5">
                      {{ grant.facebook }}
                    </div>
                  </template>
                </q-input>
                <h2 class="grant-item">Amount</h2>
                <q-input v-model="grant.amount" type="number" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="6">
                      {{ grant.amount }}
                    </div>
                  </template>
                </q-input>
              </div>
            </div>
            <!-- Row -->
            <div class="row">
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start q-pr-lg">
                <h2 class="grant-item">Link</h2>
                <q-input v-model="grant.link" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="8">
                      {{ grant.link }}
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start q-pr-lg">
                <h2 class="grant-item">Grant Type</h2>
                <q-select v-model="grant.grantType" color="black" outlined tabindex="7" :options="grantTypes">
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
            <div class="row">
              <div class="col-12 col-md-12 col-sm-12 col-xs-12 self-start">
                <h2 class="grant-item">Description</h2>
                <q-input v-model="grant.description" filled type="textarea" color="black">
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="9">
                      {{ grant.description }}
                    </div>
                  </template>
                </q-input>
              </div>
            </div>
            <!-- Form Footer -->
            <div class="uku-form-footer row justify-end q-mt-xl">
              <div class="col-4 col-md-4" align="left">
                <div align="left">
                  <q-btn flat color="black" label="Go Back" to="/dashboard" />
                </div>
              </div>
              <div class="col-8 col-md-8" align="right">
                <!-- DEV NOTE: We only need to update the Users Profile -->
                <q-btn
                  unelevated
                  :label="!grant.organisationId ? 'Create' : 'Update'"
                  :color="!grant.organisationId ? 'secondary' : 'primary'"
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
import grants from '../../util/functions/grants'
/* Import Data for Form */
import currencies from '../../assets/data/currencies'
/* LFG */
export default {
  name: 'GrantsForm',
  data() {
    return {
      title: 'Grant Details',
      subtitle: 'Update your Grant details and information',
      isValid: false,
      grant: {
        userId: null,
        organisationId: null,
        name: null,
        email: null,
        phoneCode: null,
        contactNumber: null,
        imageURL: null,
        grantType: null,
        twitter: null,
        facebook: null,
        amount: null,
        description: null,
        dateCreated: null,
        lastEdit: null,
      },
      grantTypes: [
        'Agricultural Development',
        'Agricultural Research',
        'Agricultural Technology',
        'Pilot',
        'Small Research',
        'Large Research',
        'Training',
        'Re-entry Grants',
        'Other',
      ],
      currencyList: currencies,
      loading: false,
    }
  },
  async mounted() {
    const userId = $nuxt.$fire.auth.currentUser.uid
    if (userId) {
      this.grant.userId = userId
    }
    const grantData = await grants.getGrant()
    Object.assign(this.grant, grantData)
  },
  methods: {
    onSubmit(evt) {
      this.$refs.grantsForm
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
              if (this.grant.organisationId && this.grant) {
                grants.saveGrant(this.grant)
              } else {
                grants.createGrant(this.grant)
              }
              this.$q.notify({
                color: 'grey',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Congratulations, your Grant have been updated successfully!',
              })
              return true
            } catch (error) {
              this.$q.notify({
                color: 'red-6',
                textColor: 'white',
                icon: 'warning',
                message: `Error saving your Grant details : ${error}`,
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
            message: `Error saving your Grant details : ${error}`,
          })
        })
    },
  },
}
</script>
<style lang="sass" scoped>
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
  .grant-username
    font-size: 20px
    font-weight: bold
    line-height: 1.2
    color: #2e3133
    margin-bottom: 12px
  .grant-active-status-dot
    height: 8px
    width: 8px
    background-color: #45d597
    border-radius: 50%
    display: inline-block
  .grant-active-status
    font-size: 14px
    font-weight: bold
    font-style: normal
    line-height: 1.14
    color: #45d597
    margin-bottom: 30px
  .grant-item
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
