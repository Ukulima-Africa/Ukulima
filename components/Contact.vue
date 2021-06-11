<template>
  <div class="row uku-contact">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xl">
      <div class="uku-contact-title">{{ title }}</div>
      <div class="uku-contact-text">
        We would love to hear from you! Our team are always keen to meet new people - so please get in touch, provide feedback or request to receive
        more information about our products.
      </div>
      <div class="uku-social"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Contact',
  data() {
    return {
      title: 'Get in Touch',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"

.uku-contact
  min-height: 500px
  .uku-contact-title
    color: $black
    font-size: 32px
    line-height: 32px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 0 0 15px 0
  .uku-contact-subtitle
    color: $black
    font-size: 20px
    line-height: 26px
    font-weight: 500
    letter-spacing 0.6px
    margin: 0 0 15px 0
  .uku-contact-text
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
