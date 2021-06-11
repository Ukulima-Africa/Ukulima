<template>
  <q-header name="header" class="uku-logo-header absolute-top">
    <q-toolbar>
      <div class="row full-width items-center justify-center" align="center">
        <nuxt-link to="/" class="items-center justify-center">
          <img src="~/static/icon.png" alt="Ukulima Africa" class="uku-logo" /> <span class="uku-logo-text">Ukulima</span>
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
  .uku-logo
    width: 80px
    margin-bottom: -25px
  .uku-logo-text
    color: $secondary
    font-size: 26px
    line-height: 26px
    font-weight: 500
  .q-layout__section--marginal
    background-color: none !important
</style>
