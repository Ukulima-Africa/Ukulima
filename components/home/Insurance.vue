<template>
  <div id="insurance" class="row uku-insurance">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 uku-insurance-col">
      <div class="uku-border-box">
        <div class="uku-insurance-title">{{ title }}</div>
        <div class="uku-insurance-subtitle">{{ subtitle }}</div>
        <div class="uku-insurance-text">
          Ukulima understands your farm is very important to you, regardless its nature or size. As your partner in agriculture, our goal is to make
          crop insurance even more accessible, affordable and easy to use.
        </div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="black" />
        <div class="uku-insurance-text">
          When you are insured, you can enjoy peace of mind knowing that your crops and assets are fully covered by technical experts who understand
          the demands of the agriculture industry.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Insurance',
  data() {
    return {
      title: 'Insurance Cover',
      subtitle: 'Protection for your livelihood',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"
.uku-insurance
  .uku-insurance-col
    padding: 40px
    .uku-border-box
      background: $beige
      border-radius: 5px
      border: solid 2px $secondary
      box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
      padding: 30px 20px
      .uku-insurance-title
        width: 100%
        color: $black
        font-size: 32px
        line-height: 32px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 15px 0
        text-align: center
      .uku-insurance-subtitle
        width: 100%
        color: $black
        font-size: 20px
        line-height: 26px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 15px 0
        text-align: center
      .uku-insurance-text
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
  .uku-insurance-col
    padding: 30px
    .uku-border-box
      padding: 30px 20px
      .uku-insurance-title
        font-size: 30px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-insurance-subtitle
        font-size: 18px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-insurance-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-insurance-col
    padding: 20px 20px 0 20px
    .uku-border-box
      padding: 30px 20px
      .uku-insurance-title
        font-size: 30px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-insurance-subtitle
        font-size: 18px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-insurance-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-insurance-col
    padding: 10px 10px 0 10px
    .uku-border-box
      padding: 30px 20px
      .uku-insurance-title
        font-size: 28px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-insurance-subtitle
        font-size: 18px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-insurance-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-insurance-col
    padding: 10px 10px 0 10px
    .uku-border-box
      padding: 30px 20px
      .uku-insurance-title
        font-size: 28px
        line-height: 30px
        font-weight: 500
        letter-spacing 0.10px
        word-spacing 1px
        margin: 0 0 25px 0
      .uku-insurance-subtitle
        font-size: 18px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0 0 20px 0
      .uku-insurance-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
</style>
