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
  /* Set Current User's Company or Organisations ID */
  async setOrganisationId(organisationId) {
    await $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .set({
        organisationId
      })
      .then(() => {
        $nuxt.$store.commit('SET_ORGANISATION', organisationId)
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving current User's Organisation Id: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving current User's Organisation Id: ${err}`
          })
        }
      })
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
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation data: ${err}`
          })
        }
      })
    return companyData
  },
  /* Create Company Data */
  async createCompany(data) {
    const docData = {
      name: data.name,
      legalName: data.legalName,
      taxNumber: data.taxNumber,
      countryCode: data.countryCode,
      timezone: data.timezone,
      baseCurrency: data.baseCurrency,
      companyType: data.companyType,
      dateCreated: new Date(),
      lastEdit: new Date()
    }
    await $nuxt.$fire.firestore
      .collection('organisations')
      .add(docData)
      .then((doc) => {
        console.log("Organisation has been created successfully!", doc.id)
        $nuxt.$store.commit('SET_COMPANY', docData)
        const success = this.setOrganisationId(doc.id)
        console.log("Organisation Added:", success)
        return true
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Organisation data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Organisation data: ${err}`
          })
        }
      })
      return false
  },
  /* Save Company Data */
  async saveCompany(data) {
    const organisationId = await this.getOrganisationId()
    const docData = {
      name: data.name,
      legalName: data.legalName,
      taxNumber: data.taxNumber,
      countryCode: data.countryCode,
      timezone: data.timezone,
      baseCurrency: data.baseCurrency,
      companyType: data.companyType,
      lastEdit: new Date()
    }
    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .set(docData, { merge: true })
      .then(() => {
        $nuxt.$store.commit('SET_COMPANY', docData)
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Organisation data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Organisation data: ${err}`
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
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation type: ${err}`
          })
        }
      })
    return companyType
  },
  /* Save Company Type */
  async saveCompanyType(type) {
    const organisationId = await this.getOrganisationId()
    const isSuccess = await $nuxt.$fireStore
      .collection('organisations')
      .doc(organisationId)
      .update({
        companyType: type
      })
      .then(() => {
        $nuxt.$store.commit('SET_COMPANY_TYPE', type)
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Organisation type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Organisation type: ${err}`
          })
        }
      })
    return isSuccess
  },
  /* Get Company Central Stock Location Branch */
  async getCompanyCSLBranch() {
    const organisationId = await this.getOrganisationId()
    const outletRef = await $nuxt.$fire.firestore
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
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation CSL branch: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation CSL branch: ${err}`
          })
        }
      })
    return cslData
  },
  /* Get Company Branches or Stock Locations */
  async getCompanyBranches() {
    const organisationId = await this.getOrganisationId()
    const outletRef = await $nuxt.$fire.firestore
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
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation Branches: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation Branches: ${err}`
          })
        }
      })
    return outletData
  },
}

export default company
