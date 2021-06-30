<template>
  <q-footer name="footer" class="uku-footer-centered" height-hint="80">
    <q-toolbar align="center">
      <q-toolbar-title class="copyright">
        <span><strong>Ukulima Africa</strong> &copy; {{ year }}. All Rights Reserved</span>
        <a
          href="https://www.ukulima.africa/privacy"
          alt="Privacy &amp; Data Policy"
          target="_blank"
          class="white footer-link"
          >Legal Notices ›</a
        >
        <span class="footer-text">Got a question?</span>
        <a
          href="mailto:info@ukulima.africa"
          target="_blank"
          rel="external nofollow"
          title="Contact us"
          class="white footer-link"
          >Contact us ›</a
        >
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>
<script>
export default {
  name: 'FooterWhite',
  data() {
    return {
      year: null,
    }
  },
  mounted() {
    const timeStamp = new Date()
    const year = timeStamp.getFullYear()
    this.year = year
  },
}
</script>
<style lang="sass" scoped>
@import "../../assets/sass/theme-variables"
.uku-footer-centered
  background-color: inherit
  position: absolute
  .q-toolbar
    padding: 0 12px 30px
  .q-layout__section--marginal
    background-color: inherit
  .copyright
    color: $white
    font-size: 14px
    font-weight: normal
    font-stretch: normal
    font-style: normal
    line-height: 1.57
    letter-spacing: normal
    text-align: center
    margin: 0 auto
  .footer-text
    margin-left: 5px
  .footer-link
    color: $white
    font-size: 14px
    font-weight: bold
    line-height: 1.57
    margin-left: 5px
// $breakpoint-md: 959px !default
@media only screen and (max-width : 959px)
  .copyright
    font-size: 13px
    line-height: 26px
  .footer-text
    margin-left: 4px
  .footer-link
    font-size: 13px
    line-height: 26px
// $breakpoint-sm: 839px !default
@media only screen and (max-width : 839px)
  .copyright
    font-size: 12px
    line-height: 26px
  .footer-text
    margin-left: 4px
  .footer-link
    font-size: 12px
    line-height: 26px
// $breakpoint-xs: 479px !default
@media only screen and (max-width : 479px)
  .q-footer
    display: none
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width : 359px)
  .q-footer
    display: none
</style>
