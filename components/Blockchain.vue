<template>
  <div class="row uku-blockchain">
    <div class="col-7 col-lg-7 col-md-7 col-sm-7 col-xs-7 q-pa-xl">
      <div class="uku-blockchain-title">{{ title }}</div>
      <div class="uku-blockchain-subtitle">
        According to The World Bank, 1.7 billion adults around the globe<br />
        don’t have access to a bank account or reliable insurance services
      </div>
      <div class="uku-blockchain-text">
        Blockchain has sparked a massive transformation in cross-border payments with the ability<br />to easily and safely transfer money using smart
        contracts. The use of Blockchain technologies<br />
        provides people the opportunity to be their own bank without needing to sign up for a bank account<br />
        and has led us to an era of decentralised finance or Defi.
      </div>
      <div class="uku-intro-buttons full-width q-mt-xl" align="left">
        <q-btn outline rounded color="white" class="q-mr-sm" label="Read More" />
        <q-btn rounded color="primary" class="q-mr-sm" label="Read More" />
      </div>
    </div>
    <div class="col-5 col-lg-5 col-md-5 col-sm-5 col-xs-5 q-pa-xl" align="center">
      <div class="uku-intro-image full-width q-pt-md">
        <img src="~/assets/images/Crop-Insurance.jpeg" alt="Ukulima Africa" width="360" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Blockchain',
  data() {
    return {
      title: 'Blockchain Solutions',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"

.uku-blockchain
  min-height: 200px
  // background-color: $primary
  .uku-blockchain-title
    color: $white
    font-size: 32px
    line-height: 32px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 10px 0 30px 0
  .uku-blockchain-subtitle
    color: $white
    font-size: 20px
    line-height: 26px
    font-weight: 500
    letter-spacing 0.6px
    margin: 0 0 25px 0
  .uku-blockchain-text
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
