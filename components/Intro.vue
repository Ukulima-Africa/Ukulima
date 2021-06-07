<template>
  <q-card flat bordered class="uku-intro">
    <q-card-section>
      <div class="uku-intro-title">Welcome to {{ title }}</div>
      <div class="uku-intro-subtitle">Empowering African Farmers Through Blockchain</div>
      <div class="uku-intro-text">
        Ukulima empowers African farmers by utilising Blockchain Technology to manage and finance smallhold farmers throughout Africa.
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'Intro',
  data() {
    return {
      title: 'Ukulima',
    }
  },
}
</script>
<style lang="sass">
.uku-intro
  min-height: 380px
  .uku-intro-title
    color: $black
    font-family: $heading-font
    font-size: 26px
    line-height: 30px
    font-weight: 400
    letter-spacing 0.10px
    word-spacing 1px
    margin: 10px 10px 15px 0
  .uku-intro-subtitle
    color: $black
    font-family: $heading-font
    font-size: 20px
    line-height: 26px
    font-weight: 400
    letter-spacing 0.6px
    margin: 0 10px 15px 0
  .uku-intro-text
    min-height: 130px
    color: $black
    font-family: $body-font
    font-size: 15px
    line-height: 26px
    font-weight: 400
    margin: 0 10px 10px 0

  /* CSS Media Queries */
/* $breakpoint-xl: 2400px */
@media only screen and (max-width: 2400px)
  .hide-on-bigscreen
    display: none

/* $breakpoint-lg:  1199px */
@media only screen and (max-width: 1199px)
  .hide-on-tablet
    display: none

/* $breakpoint-md: 1023px */
@media only screen and (max-width: 1023px)
  .hide-on-tablet
    display: none

/* $breakpoint-md: 959px */
@media only screen and (max-width: 959px)
  .hide-on-mobile
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
