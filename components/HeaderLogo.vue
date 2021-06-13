<template>
  <q-header name="header" class="uku-logo-header absolute-top">
    <q-toolbar>
      <div class="row full-width items-center justify-center uku-logo-link" align="center">
        <nuxt-link to="/" class="items-center justify-center">
          <img src="~/static/icon.png" alt="Ukulima Africa" width="90px" class="uku-logo" /> <span class="uku-logo-text">Ukulima</span>
        </nuxt-link>
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
export default {
  name: 'HeaderLogo',
}
</script>
<style lang="sass" scoped>
@import "../assets/sass/theme-variables"
.uku-logo-header
  color: $secondary
  background: none !important
  box-shadow: none !important
  .q-toolbar
    min-height: 100px !important
    margin: 0 auto !important
    background-color: none !important
    padding: 0
  a,
  .nuxt-link,
  .uku-logo-link
    color: $secondary !important
    text-decoration: none
    cursor: pointer
    &:hover,
    &:active,
    &:focus,
    .nuxt-link-exact-active
      text-decoration: none !important
      cursor: pointer
  .uku-logo
    width: 90px
    margin-bottom: -30px
    &:hover, &:focus
      text-decoration: none
  .uku-logo-text
    color: $secondary
    font-size: 32px
    line-height: 26px
    font-weight: 500
    &:hover, &:focus
      text-decoration: none !important
  .q-layout__section--marginal
    background-color: none !important
</style>
