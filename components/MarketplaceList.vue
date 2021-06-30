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
            <q-btn outline rounded color="white" class="q-ml-sm q-mb-sm" label="Cancel" />
            <q-btn rounded color="primary" class="q-ml-sm q-mb-sm" label="+ Add New" />
          </div>
        </div>
      </div>
      <div class="uku-marketplace row items-start justify-center">
        <div class="col-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 uku-marketplace-col">
          <div class="uku-marketplace-title">{{ title }}</div>
          <div class="uku-marketplace-subtitle">{{ subtitle }}</div>
          <div class="uku-marketplace-text">
            Ukulima empowers African farmers by utilising Blockchain Technology to manage, finance and insure small-hold
            farmers throughout Africa. Together we bring in all stakeholders in the agricultural supply chain, allowing
            them to make better-informed decisions, reducing supply chain inefficiencies and agriculture associated
            risks.
          </div>
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 uku-marketplace-col">
          <div class="uku-marketplace-title">{{ title }}</div>
          <div class="uku-marketplace-subtitle">{{ subtitle }}</div>
          <div class="uku-marketplace-text">
            Ukulima empowers African farmers by utilising Blockchain Technology to manage, finance and insure small-hold
            farmers throughout Africa. Together we bring in all stakeholders in the agricultural supply chain, allowing
            them to make better-informed decisions, reducing supply chain inefficiencies and agriculture associated
            risks.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MarketplaceList',
  data() {
    return {
      title: 'Marketplace',
      subtitle: 'Add your marketplace and products',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"
.uku-marketplace-col
  padding: 40px
.uku-marketplace-title
  color: $black
  font-size: 32px
  line-height: 32px
  font-weight: 500
  letter-spacing 0.10px
  word-spacing 1px
  margin: 0 0 20px 0
.uku-marketplace-subtitle
  color: $black
  font-size: 20px
  line-height: 24px
  font-weight: 400
  letter-spacing 0.6px
  margin: 0 0 15px 0
.uku-marketplace-text
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
  .uku-marketplace-col
    padding: 30px
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-marketplace-col
    padding: 10px 10px 0 10px
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-marketplace-col
    padding: 10px 10px 0 10px
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-marketplace-col
    padding: 10px 10px 0 10px
</style>
