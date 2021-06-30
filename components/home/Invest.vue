<template>
  <div id="invest" class="row uku-invest">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 uku-invest-col">
      <div class="uku-border-box">
        <div class="uku-invest-title">{{ title }}</div>
        <div class="uku-invest-subtitle">{{ subtitle }}</div>
        <div class="uku-invest-text">
          In developing countries, as many as 270 million smallholder farmers are underinsured. Only 20% have access to
          agricultural insurance coverage, and in sub-Saharan Africa - despite the fivefold increase in agricultural
          microinsurance registered between 2011 and 2014
        </div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="black" />
        <div class="uku-invest-text">
          Ukulima's Blockchain Crop Insurance aims to increase smallholder farmers’ resilience to climate change through
          offering a more accessible index insurance product at scale.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Invest',
  data() {
    return {
      title: 'Grants & Investing',
      subtitle: 'Invest in African Farms',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"
.uku-invest
  .uku-invest-col
    padding: 40px
    .uku-border-box
      background: $beige
      border-radius: 5px
      border: solid 2px $secondary
      box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
      padding: 30px 20px
      .uku-invest-title
        width: 100%
        color: $black
        font-size: 32px
        line-height: 32px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 15px 0
        text-align: center
      .uku-invest-subtitle
        width: 100%
        color: $black
        font-size: 20px
        line-height: 26px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 15px 0
        text-align: center
      .uku-invest-text
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
  .uku-invest-col
    padding: 30px
    .uku-border-box
      padding: 30px 20px
      .uku-invest-title
        font-size: 30px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-invest-subtitle
        font-size: 18px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-invest-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-invest-col
    padding: 10px 10px 0 10px
    .uku-border-box
      padding: 30px 20px
      .uku-invest-title
        font-size: 30px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-invest-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-invest-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-invest-col
    padding: 15px 15px 0 15px !important
    .uku-border-box
      padding: 30px 20px
      .uku-invest-title
        font-size: 26px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-invest-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-invest-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-invest-col
    padding: 15px 15px 0 15px !important
    .uku-border-box
      padding: 30px 20px
      .uku-invest-title
        font-size: 26px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-invest-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-invest-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
</style>
