<template>
  <div class="row uku-intro items-center justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 uku-intro-col">
      <div class="uku-intro-card">
        <img src="~/assets/images/logo.png" alt="Ukulima Africa" class="float-right" width="100px" />
        <div class="uku-intro-title">{{ title }}</div>
        <div class="uku-intro-subtitle">{{ subtitle }}</div>
        <div class="uku-intro-text">
          Ukulima empowers African farmers by utilising Blockchain Technology to manage, finance and insure small-hold farmers throughout Africa.
          Together we bring in all stakeholders in the agricultural supply chain, allowing them to make better-informed decisions, reducing supply
          chain inefficiencies and agriculture associated risks.
          <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
          Our core focus is enabling inclusive agriculture through organized value chains, which will radically reduce poverty, improve food security
          and build climate resilient economies.
          <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
          Africa is the breadbasket of the world, but much of its agricultural value chain management and financing are still inefficient, opaque and
          out of reach of the farmer.
        </div>
        <div class="uku-intro-buttons full-width q-mt-xl" align="right">
          <q-btn rounded type="a" href="#invest" color="primary" class="q-ml-sm q-mb-sm" label="Investing" />
          <q-btn rounded type="a" href="#insurance" color="secondary" class="q-ml-sm q-mb-sm" label="Insurance" />
          <q-btn outline rounded type="a" href="#latest-news" color="white" class="q-ml-sm q-mb-sm" label="Read More" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Intro',
  data() {
    return {
      title: 'Ukulima Africa',
      subtitle: 'Empowering African farmers through Blockchain Technology',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"
.uku-intro
  .uku-intro-col
    padding: 40px
    .uku-intro-card
      background: rgba(0, 0, 0, 0.8)
      padding: 40px 30px
      .uku-intro-title
        color: $white
        font-size: 32px
        line-height: 32px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 20px 0
      .uku-intro-subtitle
        color: $white
        font-size: 20px
        line-height: 26px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 15px 0
      .uku-intro-text
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
  .uku-intro-col
    padding: 30px
    .uku-intro-card
      padding: 30px 20px
      .uku-intro-title
        font-size: 30px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-intro-subtitle
        font-size: 20px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-intro-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-intro-col
    padding: 10px 10px 0 10px
    .uku-intro-card
      padding: 30px 20px
      .uku-intro-title
        font-size: 28px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-intro-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-intro-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-intro-col
    padding: 10px 10px 0 10px
    .uku-intro-card
      padding: 30px 20px
      .uku-intro-title
        font-size: 28px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-intro-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-intro-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-intro-col
    padding: 10px 10px 0 10px
    .uku-intro-card
      padding: 30px 20px
      .uku-intro-title
        font-size: 28px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-intro-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-intro-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
</style>
