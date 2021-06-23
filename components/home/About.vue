<template>
  <div class="row uku-about">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 uku-about-col">
      <div class="uku-about-title">{{ title }}</div>
      <div class="uku-about-text">
        Ukulima Africa's core focus is enabling inclusive agriculture through organized value chains, which will radically reduce poverty, improve
        food security and build climate resilient economies in Africa.
      </div>
      <div class="uku-about-text">
        Africa is the breadbasket of the world, but much of its agricultural value chain management and financing are still inefficient, opaque and
        out of reach of our local farmers.
      </div>
      <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
      <div class="uku-about-text">
        We aim to bring financial stability to our African farmers by providing innovative insurance solution for protection against weather related
        losses to growing crops and other extremes which farms may face.
      </div>
      <div class="uku-about-text">
        We continue to invest in effective risk management in order to make a real difference in helping create a sustainable future in agriculture in
        Africa.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      title: 'About Us',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"
.uku-about
  min-height: 400px
  .uku-about-col
    padding: 40px
    .uku-about-title
      color: $white
      font-size: 32px
      line-height: 32px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 30px 0
    .uku-about-subtitle
      color: $white
      font-size: 20px
      line-height: 26px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 25px 0
    .uku-about-text
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
  .uku-about-col
    padding: 10px 10px 0 10px
    .uku-about-title
      font-size: 30px
      line-height: 30px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 25px 0
    .uku-about-subtitle
      font-size: 18px
      line-height: 24px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 20px 0
    .uku-about-text
      font-size: 14px
      line-height: 24px
      font-weight: 400
      margin: 0 0 10px 0
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-about-col
    padding: 0 10px 0 10px
    .uku-about-title
      font-size: 30px
      line-height: 30px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 25px 0
    .uku-about-subtitle
      font-size: 16px
      line-height: 24px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 20px 0
    .uku-about-text
      font-size: 14px
      line-height: 24px
      font-weight: 400
      margin: 0 0 10px 0
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-about-col
    padding: 15px !important
    .uku-about-title
      font-size: 26px
      line-height: 30px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 15px 0 !important
    .uku-about-subtitle
      font-size: 16px
      line-height: 24px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 20px 0
    .uku-about-text
      font-size: 14px
      line-height: 24px
      font-weight: 400
      margin: 0 0 10px 0
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-about-col
    padding: 15px !important
    .uku-about-title
      font-size: 26px
      line-height: 30px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 15px 0 !important
    .uku-about-subtitle
      font-size: 16px
      line-height: 24px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 20px 0
    .uku-about-text
      font-size: 14px
      line-height: 24px
      font-weight: 400
      margin: 0 0 10px 0
</style>
