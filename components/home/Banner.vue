<template>
  <div class="row uku-banner">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 uku-banner-col">
      <div class="uku-banner-image items-center justify-center">
        <img src="~/assets/images/Insurance-Smart-Contracts.png" alt="Ukulima Africa" width="100%" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Banner',
  data() {
    return {
      title: 'About Us',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"

.uku-banner
  min-height: 400px
  .uku-banner-col
    padding: 40px 40px 0 40px

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
  .uku-banner-col
    padding: 20px 20px 0 20px

/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-banner-col
    padding: 10px 10px 0 10px

/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-banner-col
    padding: 10px 10px 0 10px

// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-banner-col
    padding: 10px 10px 0 10px
</style>
