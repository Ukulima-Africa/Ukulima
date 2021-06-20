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
            <q-btn v-if="user.organisationId" rounded color="primary" class="q-ml-sm q-mb-sm" label="+ Add New" @click="showCreateGrantForm()" />
            <q-btn v-if="user.organisationId" outline rounded color="white" class="q-ml-sm q-mb-sm" label="Cancel" @click="hideCreateGrantForm()" />
          </div>
        </div>
      </div>
      <!-- Row of My Grants -->
      <div class="uku-mygrants-list row items-start justify-center">
        <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 uku-mygrants-list-col">
          <div v-if="!showCreateForm" class="row items-start q-gutter-lg">
            <template v-for="grant in myGrants">
              <q-card :key="grant.uid" class="uku-grant-card" flat bordered>
                <q-img :src="grant.imageURL ? grant.imageURL : 'https://cdn.quasar.dev/img/parallax2.jpg'" />
                <q-card-section>
                  <div class="text-overline text-orange-9">{{ grant.grantType }}</div>
                  <div class="text-h5 q-mt-sm q-mb-xs">{{ grant.name }}</div>
                  <div class="text-h5 q-mt-sm q-mb-xs"><q-icon name="money" size="1em" />{{ grant.amount }}</div>
                  <div class="text-caption text-grey">
                    {{ grant.description | truncate(120, '...') }}
                  </div>
                </q-card-section>
                <q-card-actions>
                  <q-btn flat color="secondary" label="Share" />
                  <q-btn flat color="primary" label="Apply" />
                  <q-space />
                  <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click="expanded = !expanded" />
                </q-card-actions>
                <q-slide-transition>
                  <div v-show="expanded">
                    <q-separator />
                    <q-card-section class="text-subitle2">
                      {{ grant.description }}
                    </q-card-section>
                  </div>
                </q-slide-transition>
              </q-card>
            </template>
          </div>
        </div>
      </div>
      <!-- Row of My Grants -->
      <div class="row items-start justify-center">
        <!-- Create Grants Form -->
        <div v-if="showCreateForm === true" class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <GrantsForm />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* Import Vuex State, Getters and Mutations */
import { mapState, mapGetters } from 'vuex'
/* Import Utils */
import grants from '../util/functions/grants'
/* Components */
import GrantsForm from './forms/GrantsForm.vue'
/* LFG */
export default {
  name: 'MyGrantsList',
  components: {
    GrantsForm,
  },
  filters: {
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      }
      return text
    },
  },
  data() {
    return {
      title: 'My Grants & Subsidies',
      subtitle: 'Supporting local farmers and sustainable agriculture in Africa and abroad',
      showCreateForm: false,
      myGrants: [],
      expanded: false,
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
  async mounted() {
    const grantsData = await grants.getMyGrants()
    this.myGrants = grantsData
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
.uku-mygrants-list-col
  padding: 40px
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
.uku-grant-card
  width: 100%
  max-width: 440px
  .uku-grant-description
    min-height: 80px

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
  .uku-mygrants-list-col
    padding: 30px
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-mygrants-list-col
    padding: 10px 10px 0 10px
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-mygrants-list-col
    padding: 10px 10px 0 10px
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-mygrants-list-col
    padding: 10px 10px 0 10px
</style>
