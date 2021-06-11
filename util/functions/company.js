const company = {
  /* Get Company or Organisations ID */
  async getCompanyId() {
    const docRef = await $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)

    let organisationId = ''
    await docRef
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
  /* Get Company Profile Data */
  async getCompanyData() {
    const organisationId = await this.getCompanyId()

    const companyRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('organisations')
      .limit(1)

    let companyData = ''
    await companyRef
      .get()
      .then((snapshot) => {
        if (snapshot.docs && snapshot.docs[0]) {
          companyData = snapshot.docs[0].data()
        }
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company data: ${error.message ? error.message : error}`
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
  /* Get Company Central Stock Location Branch */
  async getCompanyCSLBranch() {
    const organisationId = await this.getCompanyId()

    const outletRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('stock-locations')

    let cslData = ''
    await outletRef
      .get()
      .where('IsCentralStockLocation', '==', true)
      .then(function (snapshot) {
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
        } catch (error) {
          this.$log.error(error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company CSL branch: ${error}`
          })
        }
      })
    return cslData
  },
  /* Get Company Branches or Stock Locations */
  async getCompanyBranches() {
    const organisationId = await this.getCompanyId()

    const outletRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('stock-locations')

    let outletData = ''
    await outletRef
      .get()
      .then(function (snapshot) {
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
        } catch (error) {
          this.$log.error(error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company branches: ${error}`
          })
        }
      })
    return outletData
  },
  /* Get Company Type */
  async getCompanyType() {
    const organisationId = await this.getCompanyId()
    const companyRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
    let companyType = ''
    await companyRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          try {
            companyType = doc.data().OrganisationType
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
            message: `Error getting company type: ${error.message ? error.message : error}`
          })
        } catch (error) {
          this.$log.error(error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting company type: ${error}`
          })
        }
      })
    return companyType
  },
  async saveCompanyType(type) {
    const organisationId = await this.getCompanyId()

    $nuxt.$fireStore
      .collection('organisations')
      .doc(organisationId)
      .update({
        OrganisationType: type
      })
      .then(function () {})
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user company type: ${error.message ? error.message : error}`
          })
        } catch (error) {
          this.$log.error(error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user company type: ${error}`
          })
        }
      })
  },
}

export default company
