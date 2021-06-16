<template>
  <div class="row">
    <div class="col-12 col-md-12 col-sm-12 col-xs-12">
      <q-form ref="companyForm" class="uku-form" @submit="onSubmit" @reset="resetForm">
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
            <div class="row items-center no-wrap">
              Organisation Details
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
          <div class="col-6 col-md-6 col-sm-12 col-xs-12 self-start q-pr-lg">
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
        <div class="uku-form-footer row justify-end q-mt-xl">
          <div class="col-4 col-md-4" align="left">
            <q-btn outline label="Go Back" to="/dashboard" />
            <q-btn v-if="!company.name" outline label="Cancel" type="reset" color="secondary" class="q-ml-sm" />
          </div>
          <div class="col-8 col-md-8" align="right">
            <q-btn outline :label="!company.name ? 'Create' : 'Update'" color="primary" type="submit" class="q-ml-sm" />
          </div>
        </div>
        <!-- END Form Footer -->
      </q-form>
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
  data() {
    return {
      isValid: false,
      company: {
        name: null,
        legalName: null,
        taxNumber: null,
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
    async onSubmit(evt) {
      this.$refs.companyForm
        .validate()
        .then((success) => {
          if (success) {
            this.isValid = true
            /* We need to set our notify Defaults */
            this.$q.notify.setDefaults({
              position: 'bottom',
              timeout: 5000,
              textColor: 'white',
              actions: [{ icon: 'close', color: 'white' }],
            })

            /* Saving to Firesatore */
            try {
              const success = company.saveCompany()
              console.log('Sucess', success)

              this.$q.notify({
                color: 'grey-13',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Congratulations, your company details have been updated!',
              })
              return true
            } catch (error) {
              this.$q.notify({
                color: 'red-6',
                textColor: 'white',
                icon: 'warning',
                message: `Error saving Company details : ${error}`,
              })
              this.resetForm()
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
            message: `Error saving Company details: ${error}`,
          })
        })
    },
    resetForm() {
      this.isValid = false
      this.company.name = null
      this.company.legalName = null
      this.company.taxNumber = null
      this.company.countryCode = null
      this.company.timezone = null
      this.company.baseCurrency = null
      this.$refs.companyForm.resetValidation()
    },
  },
}
</script>
<style lang="sass" scoped>
.uku-form
  max-width: 1000px
  background: $white
  border-radius: 5px
  border: solid 2px $secondary
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
  padding: 40px
  margin: 40px auto 30px
  .q-input
    max-width: 600px
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
