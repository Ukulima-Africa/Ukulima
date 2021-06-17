<template>
  <div class="row uku-defi">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xl">
      <div class="uku-border-box">
        <div class="uku-defi-title">{{ title }}</div>
        <div class="uku-defi-subtitle">{{ subtitle }}</div>
        <div class="uku-defi-text">
          Ukulima empowers African farmers by utilising Blockchain Technology to manage and finance smallhold farmers throughout Africa.
        </div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="black" />
        <div class="uku-defi-text">
          Ukulima empowers African farmers by utilising Blockchain Technology to manage and finance smallhold farmers throughout Africa.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Defi',
  data() {
    return {
      title: 'Yield Farming',
      subtitle: 'Decentralized Finance',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"

.uku-defi
  min-height: 500px
  .uku-border-box
    background: $beige
    border-radius: 5px
    border: solid 2px $secondary
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
    padding: 30px 20px
    .uku-defi-title
      width: 100%
      color: $black
      font-size: 32px
      line-height: 32px
      font-weight: 500
      letter-spacing 0.10px
      word-spacing 1px
      margin: 0 0 20px 0
      text-align: center
    .uku-defi-subtitle
      width: 100%
      color: $black
      font-size: 20px
      line-height: 26px
      font-weight: 500
      letter-spacing 0.6px
      margin: 0 0 15px 0
      text-align: center
    .uku-defi-text
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
