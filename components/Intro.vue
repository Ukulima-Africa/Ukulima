<template>
  <div class="row uku-intro items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xl">
      <div class="uku-intro-card">
        <img src="~/assets/images/logo.png" alt="Ukulima Africa" class="float-right" width="80px" />
        <div class="uku-intro-title">{{ title }}</div>
        <div class="uku-intro-subtitle">{{ subtitle }}</div>
        <div class="uku-intro-text">
          Ukulima empowers African farmers by utilising Blockchain Technology to manage and finance smallhold farmers throughout Africa
          <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
          Ukulima focusses on enabling inclusive agriculture through organized value chains, which will radically reduce poverty, improve food
          security and build climate resilient economies in Africa
        </div>
        <div class="uku-intro-buttons q-mt-lg" align="right">
          <q-btn rounded color="primary" label="Read More" />
          <q-btn rounded color="secondary" label="Read More" />
          <q-btn outline rounded color="white" label="Read More" />
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
      subtitle: 'Empowering African Farmers Through Blockchain',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"

.uku-intro
  min-height: 600px
  .uku-intro-card
    background: rgba(0, 0, 0, 0.6)
    padding: 30px
    .uku-intro-title
      color: $white
      font-size: 32px
      line-height: 30px
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
