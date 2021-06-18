<template>
  <div class="row uku-hero items-start justify-center">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div class="row items-start uku-hero-card">
        <div class="col-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <div class="uku-hero-title">{{ title }}</div>
          <div class="uku-hero-subtitle">{{ subtitle }}</div>
        </div>
        <div class="col-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <div class="uku-hero-buttons full-width" align="right">
            <q-btn outline rounded color="white" class="q-ml-sm q-mb-sm" label="Cancel" @click="hideCreateGrantForm()" />
            <q-btn
              v-if="user.organisationId && user.profileType === 'Sponsor'"
              rounded
              color="primary"
              class="q-ml-sm q-mb-sm"
              label="+ Add New"
              @click="showCreateGrantForm()"
            />
          </div>
        </div>
      </div>
      <div class="row items-start justify-center q-pa-lg">
        <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="uku-grants-title">{{ title }}</div>
          <div class="uku-grants-subtitle">{{ subtitle }}</div>
          <div vv-if="!showCreateForm" class="uku-grants-text">
            Ukulima empowers African farmers by utilising Blockchain Technology to manage, finance and insure small-hold farmers throughout Africa.
            Together we bring in all stakeholders in the agricultural supply chain, allowing them to make better-informed decisions, reducing supply
            chain inefficiencies and agriculture associated risks.
          </div>
        </div>
        <div
          v-if="user.organisationId && user.profileType === 'Sponsor' && showCreateForm === true"
          class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <div class="uku-grants-title">Create a Grant</div>
          <div class="uku-grants-text">
            <GrantsForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* Components */
import GrantsForm from './forms/GrantsForm.vue'
/* LFG */
export default {
  name: 'GrantsList',
  components: {
    GrantsForm,
  },
  data() {
    return {
      title: 'Grants & Subsidies',
      subtitle: 'Support local farmers and sustainable agriculture',
      showCreateForm: false,
    }
  },
  computed: {
    ...mapState(['user', 'company']),
    ...mapGetters({
      getUser: 'getUser',
      getCompany: 'getCompany',
    }),
    user: {
      get() {
        return this.$store.state.user
      },
      set(value) {
        this.$store.commit('SET_USER', value)
      },
    },
    company: {
      get() {
        return this.$store.state.company
      },
      set(value) {
        this.$store.commit('SET_COMPANY', value)
      },
    },
  },
  methods: {
    showCreateGrantForm() {
      this.showCreateForm = true
    },
    hideCreateGrantForm() {
      this.showCreateForm = false
    },
  },
}
</script>
<style lang="sass" scope>
@import "../assets/sass/theme-variables"
.uku-grants-title
  color: $black
  font-size: 32px
  line-height: 32px
  font-weight: 500
  letter-spacing 0.10px
  word-spacing 1px
  margin: 0 0 20px 0
.uku-grants-subtitle
  color: $black
  font-size: 20px
  line-height: 24px
  font-weight: 400
  letter-spacing 0.5px
  margin: 0 0 15px 0
.uku-grants-text
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
