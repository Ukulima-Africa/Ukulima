<template>
  <div class="row uku-binance">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 items-center justify-center" align="center">
      <div class="uku-binance-title">{{ title }}</div>
    </div>
    <div class="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 uku-binance-col">
      <div class="uku-binance-box">
        <div class="uku-binance-subtitle">What is Binance Smart Chain?</div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
        <div class="uku-binance-text">
          Binance Smart Chain is an innovative solution to bring programmability and interoperability to Binance Chain.
          Binance Smart Chain relies on a system of 21 validators with Proof of Staked Authority (PoSA) consensus that
          can support short block time and lower fees. The most bonded validator candidates of staking will become
          validators and produce blocks.
        </div>
      </div>
    </div>
    <div class="col-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 uku-binance-col">
      <div class="uku-binance-box">
        <div class="uku-binance-subtitle">What can I do with Binance Smart Chain?</div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
        <div class="uku-binance-text">
          Binance Smart Chain (BSC) boasts smart contract functionality and compatibility with the Ethereum Virtual
          Machine (EVM). The design goal was to leave the high throughput of Binance Chain intact while introducing
          smart contracts into its ecosystem. Because BSC is EVM-compatible, it launched with support for the rich
          universe of Ethereum tools and DApps.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Binance',
  data() {
    return {
      title: 'Binance Smart Chain',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"
.uku-binance
  min-height: 400px
  border-bottom: solid 4px $secondary
  .uku-binance-title
    width: 100%
    color: $black
    font-size: 32px
    line-height: 32px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 40px 0 0 0
  .uku-binance-col
    padding: 40px
    .uku-binance-box
      min-height: 240px
      background: $secondary
      border-radius: 5px
      border: solid 2px $secondary
      box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
      padding: 30px 20px
      margin: 0 0 30px 0
      .uku-binance-subtitle
        color: $white
        font-size: 20px
        line-height: 26px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-binance-text
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
  .uku-binance-title
    font-size: 30px
    line-height: 30px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 20px 0 0 0
  .uku-binance-col
    padding: 30px
    .uku-binance-box
      padding: 30px 20px
      .uku-binance-subtitle
        font-size: 18px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-binance-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-binance-title
    font-size: 30px
    line-height: 30px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 20px 0 0 0
  .uku-binance-col
    padding: 10px 10px 0 10px
    .uku-binance-box
      padding: 30px 20px
      .uku-binance-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-binance-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-binance-title
    font-size: 26px
    line-height: 30px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 30px 0 20px 0 !important
  .uku-binance-col
    padding: 0 15px 0 15px !important
    .uku-binance-box
      padding: 30px 20px
      margin: 0 0 15px 0 !important
      .uku-binance-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-binance-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-binance-title
    font-size: 26px
    line-height: 30px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 30px 0 20px 0 !important
  .uku-binance-col
    padding: 15px 15px 15px 15px !important
    .uku-binance-box
      padding: 30px 20px
      margin: 0 0 15px 0 !important
      .uku-binance-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-binance-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
</style>
