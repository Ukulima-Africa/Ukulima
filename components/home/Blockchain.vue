<template>
  <div class="row uku-blockchain">
    <div class="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 uku-blockchain-col">
      <div class="uku-blockchain-title">{{ title }}</div>
      <div class="uku-blockchain-subtitle">
        According to The World Bank, 1.7 billion adults around the globe<br class="hide-on-mobile" />
        don’t have access to a bank account or reliable insurance services
      </div>
      <div class="uku-blockchain-text">
        Blockchain has sparked a massive transformation in cross-border payments with the ability to easily and safely transfer money using smart
        contracts. The use of Blockchain technologies provides people the opportunity to be their own bank without needing to sign up for a bank
        account and has led us to an era of decentralised finance (Defi) and decentralised insurance products.
      </div>
      <div class="uku-blockchain-text">
        With the help of Blockchain solutions and smart contracts, we are building trust and confidence in our agriculture and food supply chains
        through a platform where everyone can have access to reliable and transparent information on the origin, journey and quality of their food.
      </div>
      <div class="uku-blockchain-text">
        We can aggregate real time data into one dashboard for predictive consumer analytics, and by leveraging Blockchain Technology, ioT, AI and
        Machine Learning we can create a world in which access to data equals transparency, security and better food for all.
      </div>
      <div class="uku-intro-buttons full-width q-mt-lg" align="left">
        <q-btn rounded color="primary" text-color="secondary" class="q-mr-sm q-mb-md" label="Data Feeds" />
        <q-btn outline rounded color="white" class="q-mr-sm q-mb-md" label="Wind" />
        <q-btn outline rounded color="white" class="q-mr-sm q-mb-md" label="Rainfall" />
        <q-btn outline rounded color="white" class="q-mr-sm q-mb-md" label="Temperature" />
        <q-btn outline rounded color="white" class="q-mr-sm q-mb-md" label="Weather" />
        <q-btn outline rounded color="white" class="q-mr-sm q-mb-md" label="Other" />
      </div>
    </div>
    <div class="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 q-pa-sm" align="center">
      <div class="uku-blockchain-image full-width">
        <img src="~/assets/images/Agriculture-Supply-Chain.png" alt="Ukulima Africa" style="width: 100%" :ratio="1" />
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
@import "../../assets/sass/theme-variables"

.uku-blockchain
  min-height: 200px
  .uku-blockchain-col
    padding: 40px
    .uku-blockchain-title
      color: $white
      font-size: 32px
      line-height: 32px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 30px 0
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
      margin: 0 0 20px 0
    .uku-blockchain-image
      margin-top: 40px
      overflow: hidden !important

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
  .uku-blockchain-col
    padding: 30px
    .uku-blockchain-title
      font-size: 30px
      line-height: 30px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 25px 0
    .uku-blockchain-subtitle
      color: $white
      font-size: 18px
      line-height: 24px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 20px 0
    .uku-blockchain-text
      font-size: 14px
      line-height: 24px
      font-weight: 400
      margin: 0 0 10px 0
    .uku-blockchain-image
      margin-top: 20px
      overflow: hidden !important

/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-blockchain-col
    padding: 20px
    .uku-blockchain-title
      font-size: 30px
      line-height: 30px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 25px 0
    .uku-blockchain-subtitle
      color: $white
      font-size: 18px
      line-height: 24px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 20px 0
    .uku-blockchain-text
      font-size: 14px
      line-height: 24px
      font-weight: 400
      margin: 0 0 10px 0
    .uku-blockchain-image
      margin-top: 20px

/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-blockchain-col
    padding: 10px
    .uku-blockchain-title
      font-size: 28px
      line-height: 30px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 25px 0
    .uku-blockchain-subtitle
      font-size: 18px
      line-height: 24px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 20px 0
    .uku-blockchain-text
      font-size: 14px
      line-height: 24px
      font-weight: 400
      margin: 0 0 10px 0
    .uku-blockchain-image
      margin: 0

// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-blockchain-col
    padding: 10px
    .uku-blockchain-title
      font-size: 28px
      line-height: 30px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 25px 0
    .uku-blockchain-subtitle
      font-size: 18px
      line-height: 24px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 20px 0
    .uku-blockchain-text
      font-size: 14px
      line-height: 24px
      font-weight: 400
      margin: 0 0 10px 0
    .uku-blockchain-image
      margin: 0
</style>
