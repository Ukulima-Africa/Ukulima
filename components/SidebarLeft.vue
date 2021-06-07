<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2" :width="240">
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item v-for="link in links1" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-xs" />

        <q-item-label header class="text-weight-bold text-uppercase"> More from Youtube </q-item-label>

        <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-mt-md q-mb-lg" />

        <div class="q-px-md text-grey-9">
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a v-for="button in buttons1" :key="button.text" class="YL__drawer-footer-link" href="javascript:void(0)">
              {{ button.text }}
            </a>
          </div>
        </div>
        <div class="q-py-md q-px-md text-grey-9">
          <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
            <a v-for="button in buttons2" :key="button.text" class="YL__drawer-footer-link" href="javascript:void(0)">
              {{ button.text }}
            </a>
          </div>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarLeft',
  data() {
    return {
      storage: 0.26,
      links1: [
        { icon: 'add', text: 'Create' },
        { icon: 'photo', text: 'Browse' },
        { icon: 'photo_album', text: 'Collections' },
        { icon: 'assistant', text: 'Rankings' },
        { icon: 'book', text: 'Activity' },
        { icon: 'people', text: 'Sharing' },
      ],
      links2: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'help', text: 'Help & Feedback' },
      ],
      links3: [
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming' },
        { icon: 'live_tv', text: 'Live' },
      ],
      links4: [
        { icon: 'flag', text: 'Report history' },
        { icon: 'help', text: 'Help' },
        { icon: 'feedback', text: 'Send feedback' },
      ],
      buttons1: [
        { text: 'About' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: 'Contact us' },
        { text: 'Creators' },
        { text: 'Advertise' },
        { text: 'Developers' },
      ],
      buttons2: [{ text: 'Terms' }, { text: 'Privacy' }, { text: 'Policy & Safety' }, { text: 'Test new features' }],
    }
  },
  computed: {
    ...mapGetters({
      getSearchText: 'searchText',
      getLeftDrawerState: 'leftDrawerOpen',
    }),
    leftDrawerOpen: {
      get() {
        return this.$store.state.leftDrawerOpen
      },
      set(value) {
        this.$store.commit('TOGGLE_LEFTDRAWER', value)
      },
    },
  },
  methods: {
    toggleLeftDrawer(value) {
      this.$store.commit('TOGGLE_LEFTDRAWER', value)
    },
  },
}
</script>
<style lang="sass">
@import "../assets/sass/theme-variables"

.n3rd-sidebar-left
  background-color: $white
  .n3rd-logo
    color: $black
    font-family: $heading-font

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
