<template>
  <q-drawer v-model="leftDrawerOpen" content-class="uku-sidebar-left" :width="240">
    <q-scroll-area class="fit">
      <q-list dark padding>
        <q-item-label v-if="user.uid" header class="text-weight-bold text-uppercase"> Account Details </q-item-label>
        <q-item v-if="user.uid" v-ripple to="/dashboard" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="user.uid" v-ripple to="/company" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="store" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Organisation</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="user.uid" v-ripple to="/users" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="group" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Users</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="user.uid" v-ripple to="/inventory" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="inventory" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Inventory</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="user.uid" v-ripple to="/mygrants/" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="ballot" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Grants</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="user.uid" v-ripple to="/profile" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="account_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label v-if="user.uid" header class="text-weight-bold text-uppercase"> Community Menu</q-item-label>
        <q-item v-ripple to="/marketplace" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Marketplace</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple to="/sponsors" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="supervised_user_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sponsors</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple to="/grants" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="ballot" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Grants &amp; Subsidies</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple to="/nfts" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="photo_library" />
          </q-item-section>
          <q-item-section>
            <q-item-label>NFTs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple to="/learn" clickable>
          <q-item-section avatar>
            <q-icon color="white" name="spa" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Learn &amp; Grow</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator v-if="user.uid" color="white" />
        <q-item v-if="user.uid" v-ripple clickable @click="signOut()">
          <q-item-section avatar>
            <q-icon color="white" name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sign Out</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator color="white" class="q-mb-lg" />
        <div class="q-px-md">
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <nuxt-link to="/terms" class="footer-link"> Terms &amp; Conditions </nuxt-link>
            <nuxt-link to="/privacy" class="footer-link"> Privacy Policy </nuxt-link>
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* LFG */
export default {
  name: 'SidebarLeft',
  data() {
    return {}
  },
  computed: {
    ...mapState(['user', 'leftDrawerOpen']),
    ...mapGetters({
      getUser: 'getUser',
      getLeftDrawerState: 'getLeftDrawerState',
    }),
    user: {
      get() {
        return this.$store.state.user
      },
      set(value) {
        this.$store.commit('SET_USER', value)
      },
    },
    leftDrawerOpen: {
      get() {
        return this.$store.state.leftDrawerOpen
      },
      set(value) {
        this.$store.commit('SET_LEFTDRAWER', value)
      },
    },
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut()
      this.$store.commit('RESET_USER')
      this.$store.commit('RESET_PROFILE')
      this.$store.commit('RESET_PROFILE_TYPE', 'Guest')
      $nuxt.$router.push('/')
    },
  },
}
</script>
<style lang="sass">
@import "../assets/sass/theme-variables"
.uku-sidebar-left
  background-color: $secondary
  .uku-logo
    color: $black
  a,
  .nuxt-link
    color: #ffffff
    text-decoration: none
    cursor: pointer
    &:hover,
    &:active,
    &:focus,
    .nuxt-link-exact-active
      text-decoration: none
      cursor: pointer
  .q-item.q-router-link--active,
  .q-item--active
    color: #ffffff !important
    background-color: $primary
    padding: 4px 8px !important
    border-radius: 0 !important
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
