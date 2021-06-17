<template>
  <div class="row uku-row-grey-bg-full uku-page uku-requirements-bottom-bg-image no-margin no-padding">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 self-center">
      <div class="uku-form">
        <div class="row full-width items-center justify-center">
          <div class="uku-form-title">Not using Ukulima? No problem.</div>
        </div>
        <div class="row full-width items-center justify-center">
          <div class="uku-form-subtitle">We’d love to assist you in registering your farm, co-op or retail store</div>
        </div>
        <div class="row full-width items-center justify-center">
          <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="uku-form-body">
              <div class="uku-form-name">Please tell us what you require assistance with?</div>
              <q-form ref="ukuForm" class="q-gutter-md" method="POST" @submit="onSubmit" @reset="onReset">
                <QOptionGroup v-model="formData.group" name="group" :options="formData.options" type="radio" class="no-margin no-padding" />
                <QInput
                  v-model.trim="formData.textarea"
                  square
                  outlined
                  name="textarea"
                  placeholder="Please tell us more"
                  type="textarea"
                  color="black"
                  class="form-textarea"
                />
                <QCheckbox v-model="formData.accept" name="accept" color="black" label="Please notify me when Ukulima launches more products" />
                <QInput
                  v-model.trim="formData.email"
                  square
                  outlined
                  name="email"
                  type="email"
                  color="black"
                  label="Enter your email address"
                  class="form-email"
                  lazyRules
                  :rules="
                    formData.accept === true
                      ? [
                          (val) => (val !== null && val !== '') || 'Please enter your email address',
                          (val) => val.includes('@') || 'Please type a real email address',
                        ]
                      : []
                  "
                />
                <div align="right">
                  <q-btn flat label="Cancel" type="reset" color="black" class="cancel-button" />
                  <q-btn flat label="Send" type="submit" class="submit-button q-ml-md" />
                </div>
              </q-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      formData: {
        group: null,
        options: [
          { label: 'Farming', value: 'Farming', color: 'black' },
          { label: 'Co-Op', value: 'Co-Op', color: 'black' },
          { label: 'Retail Store', value: 'Retail-Store', color: 'black' },
          { label: 'Sponsor', value: 'Sponsor', color: 'black' },
          { label: 'Grants', value: 'Grants', color: 'black' },
          { label: 'Other', value: 'Other', color: 'black' },
        ],
        textarea: '',
        accept: false,
        email: null,
      },
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      if (this.formData) {
        await $nuxt.$fire.firestore.collection('form-submissions').add(this.formData)
        this.onReset()
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Thanks! Your request has been sent successfully.',
        })
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Oops! Something has gone wrong, please cancel and try again!',
        })
      }
    },
    onReset() {
      this.formData.group = null
      this.formData.textarea = ''
      this.formData.accept = false
      this.formData.email = null
      /* Reset validations */
      this.$refs.ukuForm.resetValidation()
    },
  },
}
</script>
<style lang="sass" scoped>
.uku-requirements-bottom-bg-image
  // background-image: url('../../assets/images/requirements-graphic-bottom.png')
  background-size: 100%
  background-repeat: no-repeat
  background-position: bottom left
  overflow: display
  margin: 0
  padding: 0
.uku-form
  width: 100%
  margin: 0
  padding: 0
  .uku-form-title
    color: #000000
    font-size: 38px
    line-height: 1.29
    font-weight: bold
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    margin: 0 0 35px 0
  .uku-form-subtitle
    color: #333333
    font-size: 20px
    line-height: 1.5
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    margin: 0 0 66px 0
  .uku-form-name
    color: #000000
    font-size: 17px
    line-height: 1.65
    font-weight: bold
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: left
    margin: 0 0 57px 0
  .uku-form-body
    width: 680px
    margin: 0 auto 80px
  .q-form
    color: #000000
    font-size: 14px
    line-height: 1
    font-weight: 500
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    .form-textarea
      color: #9c9fa2
      font-size: 14px
      font-weight: normal
      font-stretch: normal
      font-style: italic
      line-height: 1
      letter-spacing: normal
      text-align: left
      border-radius: 2px
      background-color: #ffffff
      margin: 10px 0 20px 47px
    .form-email
      margin: 10px 0 0 25px
  .submit-button
    color: #ffffff !important
    background-color: #337cfa
    border: 1px solid #337cfa
    border-radius: 5px
    font-size: 14px
    line-height: 1.14
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    &:hover,
    &:active
      color: #337cfa !important
      background-color: #ffffff !important
      text-decoration: none
      border: 1px solid #337cfa
  .cancel-button
    color: #575d64 !important
    background-color: #ffffff !important
    border: 1px solid #828689 !important
    border-radius: 5px
    font-size: 14px
    line-height: 1.14
    font-weight: normal
    font-stretch: normal
    font-style: normal
    letter-spacing: normal
    text-align: center
    &:hover,
    &:active
      color: #ffffff !important
      background-color: #828689 !important
      text-decoration: none
      border: 1px solid #828689 !important
// $breakpoint-xs: 479px !default
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-requirements-bottom-bg-image
    // background-image: url('../../assets/images/requirements-graphic-bottom.png')
    background-size: 100%
    background-repeat: no-repeat
    background-position: bottom left
    overflow: display
    margin: 0
    padding: 0
  .uku-form
    width: 100%
    margin: 0
    padding: 0 4%
    .uku-form-title
      color: #000000
      font-size: 32px
      line-height: 1.29
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 auto 25px
    .uku-form-subtitle
      color: #333333
      font-size: 20px
      line-height: 1.5
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 0 36px 0
    .uku-form-name
      color: #000000
      font-size: 17px
      line-height: 1.65
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: left
      margin: 0 0 57px 0
    .uku-form-body
      width: 100%
      margin: 0 auto 80px
    .q-form
      color: #000000
      font-size: 14px
      line-height: 1
      font-weight: 500
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      .form-textarea
        color: #9c9fa2
        font-size: 14px
        font-weight: normal
        font-stretch: normal
        font-style: italic
        line-height: 1
        letter-spacing: normal
        text-align: left
        border-radius: 2px
        background-color: #ffffff
        margin: 10px 0 20px 47px
      .form-email
        margin: 10px 0 0 25px
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-requirements-bottom-bg-image
    // background-image: url('../../assets/images/requirements-graphic-bottom.png')
    background-size: 100%
    background-repeat: no-repeat
    background-position: bottom left
    overflow: display
    margin: 0
    padding: 0
  .uku-form
    width: 100%
    margin: 0
    padding: 0 4%
    .uku-form-title
      color: #000000
      font-size: 32px
      line-height: 1.29
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 auto 25px
    .uku-form-subtitle
      color: #333333
      font-size: 20px
      line-height: 1.5
      font-weight: normal
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      margin: 0 0 36px 0
    .uku-form-name
      color: #000000
      font-size: 17px
      line-height: 1.65
      font-weight: bold
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      text-align: left
      margin: 0 0 57px 0
    .uku-form-body
      width: 100%
      margin: 0 auto 80px
    .q-form
      color: #000000
      font-size: 14px
      line-height: 1
      font-weight: 500
      font-stretch: normal
      font-style: normal
      letter-spacing: normal
      .form-textarea
        color: #9c9fa2
        font-size: 14px
        font-weight: normal
        font-stretch: normal
        font-style: italic
        line-height: 1
        letter-spacing: normal
        text-align: left
        border-radius: 2px
        background-color: #ffffff
        margin: 10px 0 20px 47px
      .form-email
        margin: 10px 0 0 25px
</style>
