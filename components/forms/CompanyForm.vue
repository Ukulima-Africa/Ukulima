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
            <q-btn
              v-if="(user && user.role === 'admin') || user.role === 'manager'"
              type="a"
              href="/users-add"
              rounded
              color="primary"
              class="q-ml-sm q-mb-sm"
              label="+ Add Users"
            />
          </div>
        </div>
      </div>
      <div class="row items-start justify-center uku-company-col">
        <div class="col-12 col-md-12 col-sm-12 col-xs-12">
          <q-form ref="companyForm" class="uku-form" @submit="onSubmit">
            <!-- Row -->
            <div class="row">
              <div class="col-10 col-md-9 col-sm-8 col-xs-6 self-start">
                <div class="row items-center no-wrap">
                  <h2 class="company-username">
                    {{ company.name }}
                  </h2>
                </div>
              </div>
              <div class="col-2 col-md-3 col-sm-4 col-xs-6 self-start">
                <div class="row items-center justify-end no-wrap organisation-details">
                  Organisation Details
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
                <h2 class="company-item">Organisation Name</h2>
                <q-input v-model="company.name" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="1">
                      {{ company.name }}
                    </div>
                  </template>
                </q-input>

                <h2 class="company-item">Trading Company</h2>
                <q-input v-model="company.legalName" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="2">
                      {{ company.legalName }}
                    </div>
                  </template>
                </q-input>

                <h2 class="company-item">Tax Number</h2>
                <q-input v-model="company.taxNumber" color="black" outlined>
                  <template #control>
                    <div class="self-center full-width no-outline" tabindex="3">
                      {{ company.taxNumber }}
                    </div>
                  </template>
                </q-input>
              </div>
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="company-item">Country</h2>
                <q-select
                  v-model="company.countryCode"
                  color="black"
                  outlined
                  tabindex="4"
                  :options="countryList"
                  option-value="iso2"
                  option-label="name"
                  map-options
                >
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps" class="select-menu-item" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">Select</q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <h2 class="company-item">Timezone</h2>
                <q-select
                  v-model="company.timezone"
                  color="black"
                  outlined
                  tabindex="5"
                  :options="timezoneList"
                  option-value="value"
                  option-label="name"
                  map-options
                >
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps" class="select-menu-item" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.name }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template #no-option>
                    <q-item>
                      <q-item-section class="text-grey">Select</q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <h2 class="company-item">Currency</h2>
                <q-select
                  v-model="company.baseCurrency"
                  color="black"
                  outlined
                  tabindex="6"
                  :options="currencyList"
                  option-value="code"
                  option-label="name"
                  map-options
                >
                  <template #option="scope">
                    <q-item v-bind="scope.itemProps" class="select-menu-item" v-on="scope.itemEvents">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.name }}</q-item-label>
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
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start">
                <h2 class="company-item">Organisation Type</h2>
                <q-select v-model="company.companyType" color="black" outlined tabindex="7" :options="companyTypes">
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
              <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start"></div>
            </div>
            <!-- Form Footer -->
            <div class="uku-form-footer row justify-between q-mt-xl">
              <q-btn outline icon="chevron_left" color="black" label="Go Back" to="/dashboard" />
              <q-btn
                unelevated
                :label="!user.organisationId ? 'Create' : 'Update'"
                :color="!user.organisationId ? 'secondary' : 'primary'"
                icon-right="chevron_right"
                type="submit"
              />
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
import company from '../../util/functions/company'
/* Import Data for Form */
import countries from '../../assets/data/countries'
import currencies from '../../assets/data/currencies'
import timezones from '../../assets/data/timezones'
/* LFG */
export default {
  name: 'CompanyForm',
  props: {
    user: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      title: 'Organisation Details',
      subtitle: 'Update your company information and details',
      isValid: false,
      company: {
        name: null,
        legalName: null,
        taxNumber: null,
        companyType: null,
        countryCode: null,
        timezone: null,
        baseCurrency: null,
      },
      companyTypes: ['Farmer', 'Business', 'Co-Op', 'Retailer', 'Wholesaler', 'Sponsor', 'Investor', 'Other'],
      countryList: countries,
      timezoneList: timezones,
      currencyList: currencies,
      loading: false,
    }
  },
  async mounted() {
    const companyData = await company.getCompany()
    Object.assign(this.company, companyData)
  },
  methods: {
    onSubmit(evt) {
      this.$refs.companyForm
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
              if (this.user.organisationId && this.company) {
                company.saveCompany(this.company)
              } else {
                company.createCompany(this.company)
              }
              this.$q.notify({
                color: 'secondary',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Congratulations, your Organisation has been updated successfully!',
              })
              return true
            } catch (error) {
              this.$q.notify({
                color: 'red-6',
                textColor: 'white',
                icon: 'warning',
                message: `Error saving Organisation details : ${error}`,
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
            message: `Error saving Organisation details: ${error}`,
          })
        })
    },
  },
}
</script>
<style lang="sass" scoped>
.uku-company-col
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
    .company-username
      font-size: 20px
      font-weight: bold
      line-height: 1.2
      color: #2e3133
      margin-bottom: 12px
    .company-active-status-dot
      height: 8px
      width: 8px
      background-color: #45d597
      border-radius: 50%
      display: inline-block
    .company-active-status
      font-size: 14px
      font-weight: bold
      font-style: normal
      line-height: 1.14
      color: #45d597
      margin-bottom: 30px
    .company-item
      font-size: 14px
      font-weight: 500
      line-height: 1
      text-align: left
      color: #000000
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
  .uku-company-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 30px
      .q-input, .q-select
        max-width: 460px !important
// $breakpoint-md: 959px !default
@media only screen and (max-width: 1023px)
  .uku-company-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 30px
      .q-input, .q-select
        max-width: 460px !important
// $breakpoint-sm: 839px !default
@media only screen and (max-width: 839px)
  .uku-company-col
    padding: 40px
    .uku-form
      max-width: 800px
      margin: 0 auto
      padding: 20px
      .q-input, .q-select
        max-width: 460px !important
// $breakpoint-xs: 479px !default
@media only screen and (max-width: 479px)
  .uku-company-col
    padding: 0
    .uku-form
      max-width: 100%
      border: none
      box-shadow: none
      margin: 0 auto
      padding: 20px
      .organisation-details
        text-align: left
        justify-content: flex-start
      .q-input, .q-select
        max-width: 440px !important
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .uku-company-col
    padding: 0
    .uku-form
      max-width: 100%
      border: none
      box-shadow: none
      margin: 0 auto
      padding: 20px
      .organisation-details
        text-align: left
        justify-content: flex-start
      .q-input, .q-select
        max-width: 340px !important
</style>
