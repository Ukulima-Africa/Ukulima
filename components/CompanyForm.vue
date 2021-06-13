<template>
  <q-form ref="ukuForm" class="uku-form">
    <div class="row page-header-row">
      <div class="col-12 col-md-12 col-sm-12 col-xs-12 self-start">
        <div class="column uku-form-box">
          <h2 class="company-username">{{ company.Name }}</h2>
          <q-item-section>
            <q-item-section>
              <div class="row items-center no-wrap company-item">
                Company Name
                <nuxt-link to="/">
                  <q-icon
                    :name="`img:${require('@/assets/icons/HelpIcon.svg') ? require('@/assets/icons/HelpIcon.svg') : ''}`"
                    size="xs"
                    class="q-ml-sm"
                  />
                </nuxt-link>
              </div>
            </q-item-section>
          </q-item-section>
          <q-field v-model="company.Name" color="black" outlined data-cy="companyNameSelector">
            <template #control>
              <div class="self-center full-width no-outline" tabindex="1">
                {{ company.Name }}
              </div>
            </template>
          </q-field>

          <h2 class="company-item">Trading Company</h2>
          <q-field v-model="company.LegalName" color="black" outlined data-cy="companyLegalNameSelector">
            <template #control>
              <div class="self-center full-width no-outline" tabindex="2">
                {{ company.LegalName }}
              </div>
            </template>
          </q-field>

          <h2 class="company-item">Tax Number</h2>
          <q-field v-model="company.TaxNumber" color="black" outlined data-cy="taxNumberSelector"
            >>
            <template #control>
              <div class="self-center full-width no-outline" tabindex="2">
                {{ company.TaxNumber }}
              </div>
            </template>
          </q-field>

          <h2 class="company-item">Country</h2>
          <q-select
            v-model="company.CountryCode"
            color="black"
            outlined
            tabindex="3"
            :options="countryList"
            option-value="iso2"
            option-label="name"
            map-options
            data-cy="countryCodeSelector"
          >
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
            v-model="company.Timezone"
            color="black"
            outlined
            tabindex="4"
            :options="timezoneList"
            option-value="value"
            option-label="name"
            map-options
            data-cy="timezoneSelector"
          >
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
            v-model="company.BaseCurrency"
            color="black"
            outlined
            tabindex="5"
            :options="currencyList"
            option-value="code"
            option-label="name"
            map-options
            data-cy="baseCurrencySelector"
          >
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

          <!-- Skwirrel Form Footer -->
          <div class="uku-form-footer row justify-end q-mt-md">
            <div class="col-4 col-md-4" align="left">
              <div align="left"></div>
            </div>
            <div class="col-8 col-md-8" align="right">
              <nuxt-link to="/">
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
/* Import Data for Form */
import countries from '../assets/data/countries'
import currencies from '../assets/data/currencies'
import timezones from '../assets/data/timezones'
/* Import Utils */
import company from '../util/functions/company'
/* LFG */
export default {
  name: 'CompanyForm',
  data() {
    return {
      company: {
        Name: null,
        LegalName: null,
        TaxNumber: null,
        CountryCode: null,
        Timezone: null,
        BaseCurrency: null,
      },
      countryList: countries,
      timezoneList: timezones,
      currencyList: currencies,
    }
  },
  async mounted() {
    const companyData = await company.getCompanyData()
    Object.assign(this.company, companyData)
  },
}
</script>
<style lang="sass" scoped>
.uku-form
  max-width: 800px
  margin-left: 184px
  padding: 0
  .uku-form-box
    max-width: 400px
  .q-input
    max-width: 800px
  .q-field__label
    font-size: 13px
    line-height: 20px
    font-weight: 400
    letter-spacing: .00937em
    margin-top: 10px
  .company-username
    font-size: 20px
    font-weight: bold
    line-height: 1.2
    color: #2e3133
    margin-top: 58px
    margin-bottom: 12px
  .company-subtitle
    font-size: 20px
    font-weight: bold
    line-height: 1.2
    color: #2e3133
    margin-top: 49px
    margin-bottom: 12px
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
  .company-date
    font-size: 14px
    font-weight: 500
    font-style: italic
    line-height: 1
    color: #828689
    margin-bottom: 32px
  .company-active-status-dot
    height: 8px
    width: 8px
    background-color: #45d597
    border-radius: 50%
    display: inline-block
  .company-change-button
    font-size: 10px
    line-height: 1.4
    color: #828689
  .company-notifications
    font-size: 14px
    font-weight: 500
    line-height: 1
    color: #000000
    padding-right: 28px
  .company-button-padding
    margin: 20px
.select-menu-item
  width: auto
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
    .uku-form-box
      max-width: 400px
      .q-input
        max-width: 800px
// $breakpoint-sm: 839px !default
@media only screen and (max-width: 839px)
  .uku-form
    max-width: 800px
    margin-left: 0
    padding: 0
    .uku-form-box
      max-width: 400px
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
