<template>
  <div class="row uku-power">
    <div class="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 items-center justify-center" align="center">
      <div class="uku-power-title">{{ title }}</div>
    </div>
    <div class="col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 uku-power-col">
      <div class="uku-power-box">
        <div class="uku-power-img full-width" align="center">
          <img src="~/assets/images/Decentralised.png" alt="Decentralised" style="width: 70%" :ratio="1" />
        </div>
        <div class="uku-power-subtitle">Decentralised &amp; Distributed</div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
        <div class="uku-power-text">
          Blockchain ensures that no one person can "hack" or change the data. Information is only added to the spreadsheet if the network of
          computers all agree that the new information is valid and correct.
        </div>
      </div>
    </div>
    <div class="col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 uku-power-col">
      <div class="uku-power-box">
        <div class="uku-power-img full-width" align="center">
          <img src="~/assets/images/Consensus.png" alt="Consensus" style="width: 70%" :ratio="1" />
        </div>
        <div class="uku-power-subtitle">Consensus</div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
        <div class="uku-power-text">
          Consensus means everyone agrees that each transaction is valid. The blockchain system is a distributed network of computers, called “nodes”,
          which validate each others’ data, ensuring that no single node can corrupt or falsify the information.
        </div>
      </div>
    </div>
    <div class="col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 uku-power-col">
      <div class="uku-power-box">
        <div class="uku-power-img full-width" align="center">
          <img src="~/assets/images/Provenance.png" alt="Provenance" style="width: 70%" :ratio="1" />
        </div>
        <div class="uku-power-subtitle">Provenance</div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
        <div class="uku-power-text">
          Provenance means everyone knows where each asset came from, who owned it and at what time. This is because the blockchain system holds a
          complete history of all transactions that can never be changed - right back to when transactions were first created.
        </div>
      </div>
    </div>
    <div class="col-3 col-lg-3 col-md-6 col-sm-12 col-xs-12 uku-power-col">
      <div class="uku-power-box">
        <div class="uku-power-img full-width" align="center">
          <img src="~/assets/images/Immutability.png" alt="Immutability" style="width: 70%" :ratio="1" />
        </div>
        <div class="uku-power-subtitle">Immutability</div>
        <q-separator class="q-mt-lg q-mb-lg q-mr-md" color="white" />
        <div class="uku-power-text">
          Immutability means no one can tamper with the data - absolutely never! No transaction can be erased or changed once stored on the blockchain
          system.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlockchainPower',
  data() {
    return {
      title: 'The Power of Blockchain',
    }
  },
}
</script>
<style lang="sass" scope>
@import "../../assets/sass/theme-variables"
.uku-power
  min-height: 400px
  border-bottom: solid 2px $white
  .uku-power-title
    width: 100%
    color: $black
    font-size: 32px
    line-height: 32px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 40px 0 0 0
  .uku-power-col
    padding: 40px
    .uku-power-box
      background: $secondary
      border-radius: 5px
      box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.08)
      padding: 30px 20px
      margin: 0 0 30px 0
      .uku-power-subtitle
        color: $white
        font-size: 20px
        line-height: 26px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
        text-align: center
      .uku-power-text
        color: $white
        font-size: 16px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
      .uku-power-img
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
  .uku-power-title
    font-size: 30px
    line-height: 30px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 20px 0 0 0
  .uku-power-col
    padding: 30px
    .uku-power-box
      padding: 30px 20px
      .uku-power-subtitle
        font-size: 18px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-power-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
      .uku-power-img
        margin: 0 0 10px 0
/* $breakpoint-sm: 839px */
@media only screen and (max-width: 839px)
  .hide-on-mobile
    display: none
  .uku-power-title
    font-size: 30px
    line-height: 30px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 20px 0 0 0
  .uku-power-col
    padding: 10px 10px 0 10px
    .uku-power-box
      padding: 30px 20px
      .uku-power-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-power-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
      .uku-power-img
        margin: 0 0 10px 0
/* $breakpoint-xs: 479px */
@media only screen and (max-width: 479px)
  .hide-on-mobile
    display: none
  .uku-power-title
    font-size: 26px
    line-height: 30px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 30px 0 10px 0 !important
  .uku-power-col
    padding: 10px 15px 10px 15px !important
    .uku-power-box
      padding: 30px 20px
      margin: 0 !important
      .uku-power-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-power-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
      .uku-power-img
        margin: 0
// This is for old phone screen sizes 360px and smaller
@media only screen and (max-width: 359px)
  .hide-on-mobile
    display: none
  .uku-power-title
    font-size: 26px
    line-height: 30px
    font-weight: 500
    letter-spacing 0.10px
    word-spacing 1px
    margin: 30px 0 10px 0 !important
  .uku-power-col
    padding: 10px 15px 10px 15px !important
    .uku-power-box
      padding: 30px 20px
      margin: 0 !important
      .uku-power-subtitle
        font-size: 16px
        line-height: 24px
        font-weight: 500
        letter-spacing 0.6px
        margin: 0
      .uku-power-text
        font-size: 14px
        line-height: 24px
        font-weight: 400
        margin: 0 0 10px 0
      .uku-power-img
        margin: 0
</style>
