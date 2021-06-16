const company = {
  /* Get Company or Organisations ID */
  async getOrganisationId() {
    const userRef = await $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
    let organisationId = ''
    await userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            /* Might not have integrated yet */
            organisationId = doc.data().organisationId
          } catch (error) {
            organisationId = ''
          }
        }
      })
    return organisationId
  },
  /* Get Company Data */
  async getCompany() {
    const organisationId = await this.getOrganisationId()
    const companyRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
    let companyData = ''
    await companyRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            companyData = doc.data()
          } catch (err) {}
        }
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Company data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company data: ${err}`
          })
        }
      })
    return companyData
  },
  /* Save Company Data */
  async saveCompany(data) {
    const organisationId = await this.getOrganisationId()
    const docData = {
      name: data.name,
      legalName: data.legalName,
      taxNumber: data.taxNumber,
      companyType: data.companyType,
      countryCode: data.countryCode,
      timezone: data.timezone,
      baseCurrency: data.baseCurrency,
      lastEdit: $nuxt.$fire.firestore.FieldValue.serverTimestamp(),
    }

    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .set(docData)
      .then((docRef) => {
        console.log("Company has been updated successfully!", docRef.id)
        console.log("organisation Id:", organisationId)
        $nuxt.$store.commit('SET_COMPANY', docData)
        this.$q.notify({
          color: 'green-13',
          textColor: 'white',
          icon: 'cloud_done',
          message:
            'Congratulations, your Company data has been updated successfully!'
        })
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Company data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Company data: ${err}`
          })
        }
      })
  },
  /* Get Company Type */
  async getCompanyType() {
    const organisationId = await this.getOrganisationId()
    const companyRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
    let companyType = ''
    await companyRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            companyType = doc.data().companyType
          } catch (err) {}
        }
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Company type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Company type: ${err}`
          })
        }
      })
    return companyType
  },
  /* Save Company Type */
  async saveCompanyType(type) {
    const organisationId = await this.getOrganisationId()

    $nuxt.$fireStore
      .collection('organisations')
      .doc(organisationId)
      .update({
        companyType: type
      })
      .then(() => {
        console.log("Company type been updated successfully!", type)
        console.log("organisation Id:", organisationId)
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user company type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user company type: ${err}`
          })
        }
      })
  },
  /* Get Company Central Stock Location Branch */
  async getCompanyCSLBranch() {
    const organisationId = await this.getOrganisationId()

    const outletRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('stock-locations')

    let cslData = ''
    await outletRef
      .get()
      .where('IsCentralStockLocation', '==', true)
      .then((snapshot) => {
        if (snapshot.docs) {
          cslData = snapshot.docs
        }
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company CSL branch: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company CSL branch: ${err}`
          })
        }
      })
    return cslData
  },
  /* Get Company Branches or Stock Locations */
  async getCompanyBranches() {
    const organisationId = await this.getOrganisationId()

    const outletRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('stock-locations')

    let outletData = ''
    await outletRef
      .get()
      .then((snapshot) => {
        if (snapshot.docs) {
          outletData = snapshot.docs
        }
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company branches: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company branches: ${err}`
          })
        }
      })
    return outletData
  },
}

export default company
