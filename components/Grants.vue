<template>
  <div class="row uku-inventory items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xl">
      <div class="uku-inventory-card">
        <div class="uku-inventory-title">{{ title }}</div>
        <div class="uku-inventory-subtitle">{{ subtitle }}</div>
        <div class="uku-inventory-text">
          Ukulima empowers African farmers by utilising Blockchain Technology to manage, finance and insure small-hold farmers throughout Africa.
          Together we bring in all stakeholders in the agricultural supply chain, allowing them to make better-informed decisions, reducing supply
          chain inefficiencies and agriculture associated risks.
        </div>
        <div class="uku-inventory-buttons full-width q-mt-xl" align="right">
          <q-btn outline rounded color="white" class="q-ml-sm q-mb-sm" label="Cancel" />
          <q-btn rounded color="primary" class="q-ml-sm q-mb-sm" label="+ Add New" />
          <q-btn rounded color="secondary" class="q-ml-sm q-mb-sm" label="Insurance" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GrantsList',
  data() {
    return {
      title: 'Grants',
      subtitle: 'Add your inventory and products',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"
.uku-inventory
  min-height: 660px
  .uku-inventory-card
    background: rgba(0, 0, 0, 0.6)
    padding: 40px 30px
    .uku-inventory-title
      color: $white
      font-size: 32px
      line-height: 32px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 20px 0
    .uku-inventory-subtitle
      color: $white
      font-size: 20px
      line-height: 26px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 15px 0
    .uku-inventory-text
      color: $white
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

/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none

/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none

// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
</style>
