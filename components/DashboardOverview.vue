<template>
  <div class="row uku-hero items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row items-start uku-hero-card">
        <div class="col-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div class="uku-hero-title">{{ title }}</div>
          <div class="uku-hero-subtitle">{{ subtitle }}</div>
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="uku-hero-buttons full-width" align="right">
            <!-- <q-btn outline rounded color="white" class="q-ml-sm q-mb-sm" label="Cancel" /> -->
            <!-- <q-btn rounded color="primary" class="q-ml-sm q-mb-sm" label="+ Add New" /> -->
          </div>
        </div>
      </div>
      <div class="uku-dashboard row items-start justify-center">
        <div class="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 uku-dashboard-col">
          <div class="uku-dashboard-title">Data Feeds</div>
          <div class="uku-dashboard-subtitle">Weather widgets and more</div>
          <div class="uku-dashboard-text">Coming Soon!</div>
        </div>
        <div class="col-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 uku-dashboard-col">
          <Account />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* Components */
import Account from './Account.vue'
/* LFG */
export default {
  name: 'DashboardOverview',
  components: {
    Account,
  },
  data() {
    return {
      title: 'Dashboard',
      subtitle: 'An Overview of your Organisation',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"
.uku-dashboard-col
  padding: 40px
.uku-dashboard-title
  color: $black
  font-size: 32px
  line-height: 32px
  font-weight: 500
  letter-spacing 0.10px
  word-spacing 1px
  margin: 0 0 20px 0
.uku-dashboard-subtitle
  color: $black
  font-size: 20px
  line-height: 24px
  font-weight: 400
  letter-spacing 0.6px
  margin: 0 0 15px 0
.uku-dashboard-text
  color: $black
  font-size: 16px
  line-height: 24px
  font-weight: 400
  margin: 0 0 10px 0
/* CSS Media Queries */
/* $breakpoint-xl: 2400px */
@media only screen and (max-width: 2400px)
  .hide-on-bigscreen
    display: none
/* $breakpoint-lg:  1199px */
@media only screen and (max-width: 1199px)
  .hide-on-bigscreen
    display: none
/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .hide-on-tablet
    display: none
  .uku-dashboard-col
    padding: 30px
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-dashboard-col
    padding: 10px 10px 0 10px
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-dashboard-col
    padding: 10px 10px 0 10px
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-dashboard-col
    padding: 10px 10px 0 10px
</style>
