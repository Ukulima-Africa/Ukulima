<template>
  <div id="latest-news" class="row uku-news">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xl">
      <div class="uku-news-title">{{ title }}</div>
      <div class="row">
        <div class="col-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <div class="uku-intro-image">
            <img src="~/assets/images/Crop-Insurance.jpeg" alt="Ukulima Africa" style="width: 120px" :ratio="1" />
          </div>
        </div>
        <div class="col-10 col-lg-10 col-md-10 col-sm-10 col-xs-10 q-px-sm">
          <div class="uku-news-subtitle">Ukulima launches AGRI Token on Binance Smart Chain (BSC)</div>
          <div class="uku-news-text">
            Africa is the breadbasket of the world, but much of its agricultural value chain management and financing are still inefficient, opaque
            and out of reach of the local farmer. Ukulima strives to empower local farmers and agriculture by utilising Blockchain Technology to
            manage finance and insure small-hold farms throughout Africa and abroad.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'News',
  data() {
    return {
      title: 'Lastest News',
      subtitle: 'Empowering African Farmers Through Blockchain',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"

.uku-news
  min-height: 200px
  .uku-news-title
    color: $white
    font-size: 32px
    line-height: 32px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 0 0 15px 0
  .uku-news-subtitle
    color: $white
    font-size: 20px
    line-height: 26px
    font-weight: 500
    letter-spacing 0.6px
    margin: 0 0 5px 0
  .uku-news-text
    color: $white
    font-size: 14px
    line-height: 24px
    font-weight: 300
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
