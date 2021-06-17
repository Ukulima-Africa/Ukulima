<template>
  <div class="row uku-contact">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-xl">
      <div class="uku-contact-title">{{ title }}</div>
      <div class="uku-contact-subtitle">We would love to hear from you...</div>
      <div class="uku-contact-text">
        Our team are always keen to meet new people, so please feel free to get in touch with us!<br />
        We value your feedback or request to receive more information about our services.
      </div>
      <div class="uku-social">
        <q-btn
          dense
          type="a"
          href="http://www.ukulima.africa/"
          target="_blank"
          class="q-mr-md q-mb-sm float-left"
          :icon="`img:${require('@/assets/icons/Web3dotjs.svg') ? require('@/assets/icons/Web3dotjs.svg') : ''}`"
          size="14px"
          label="Website"
        />
        <q-btn
          dense
          type="a"
          href="https://github.com/Ukulima-Africa"
          target="_blank"
          class="q-mr-md q-mb-sm float-left"
          :icon="`img:${require('@/assets/icons/Github.svg') ? require('@/assets/icons/Github.svg') : ''}`"
          size="14px"
          label="Github"
        />
        <q-btn
          dense
          type="a"
          href="https://web.facebook.com/UkulimaAfrica"
          target="_blank"
          class="q-mr-md q-mb-sm float-left"
          :icon="`img:${require('@/assets/icons/Facebook.svg') ? require('@/assets/icons/Facebook.svg') : ''}`"
          size="14px"
          label="Facebook"
        />
        <q-btn
          dense
          type="a"
          href="https://twitter.com/UkulimaAfrica"
          target="_blank"
          class="q-mr-md q-mb-sm float-left"
          :icon="`img:${require('@/assets/icons/Twitter.svg') ? require('@/assets/icons/Twitter.svg') : ''}`"
          size="14px"
          label="Twitter"
        />
      </div>
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
@import "../../assets/sass/theme-variables"

.uku-contact
  min-height: 200px
  .uku-contact-title
    color: $white
    font-size: 32px
    line-height: 32px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 0 0 15px 0
  .uku-contact-subtitle
    color: $white
    font-size: 20px
    line-height: 26px
    font-weight: 500
    letter-spacing 0.6px
    margin: 0 0 5px 0
  .uku-contact-text
    color: $white
    font-size: 14px
    line-height: 24px
    font-weight: 300
    margin: 0 0 15px 0
  .uku-social
    .q-btn__wrapper:before
        content: ''
        display: block
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
        border-radius: inherit
        box-shadow: none
    a,
    .nuxt-link,
    .uku-logo-link
      box-shadow: none
      color: $black !important
      background-color: $primary
      text-decoration: none
      cursor: pointer
      &:hover,
      &:active,
      &:focus,
      .nuxt-link-exact-active
        text-decoration: none !important
        cursor: pointer


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
