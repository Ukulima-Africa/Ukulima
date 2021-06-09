<template>
  <div class="row uku-about">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-sm">
      <div class="uku-about-title">{{ title }}</div>
      <div class="uku-about-subtitle">{{ subtitle }}</div>
      <div class="uku-about-text">
        Ukulima empowers African farmers by utilising Blockchain Technology to manage, finance and insure smallhold farmers throughout Africa
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      title: 'About',
      subtitle: 'About Ukulima Africa',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"

.uku-about
  min-height: 500px
  .uku-about-title
    color: $white
    font-size: 26px
    line-height: 30px
    font-weight: 400
    letter-spacing 0.10px
    word-spacing 1px
    margin: 0 0 15px 0
  .uku-about-subtitle
    color: $white
    font-size: 20px
    line-height: 26px
    font-weight: 400
    letter-spacing 0.6px
    margin: 0 0 15px 0
  .uku-about-text
    color: $white
    font-size: 15px
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
