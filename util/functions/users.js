const users = {
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
  /* Get User Data */
  async getUser(userId) {
    const organisationId = await this.getOrganisationId()
    const userRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .doc(userId)
    let userData = ''
    await userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            userData = doc.data()
          } catch (err) {}
        }
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User data: ${err}`
          })
        }
      })
    return userData
  },
  /* Get User Data */
  async getUsers() {
    const organisationId = await this.getOrganisationId()
    const userRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
    const usersData = []
    await userRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usersData.push(doc.data())
        })
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User data: ${err}`
          })
        }
      })
    return usersData
  },
  /* Create User Data */
  async createUser(data) {
    const organisationId = await this.getOrganisationId()
    const docData = {
      organisationId: data.organisationId,
      role: 'User',
      name: data.name,
      email: data.email,
      phoneCode: data.phoneCode,
      phoneNumber: data.phoneNumber,
      photoURL: data.photoURL,
      profileType: data.profileType,
      integrationType: data.integrationType,
      binanceId: data.binanceId,
      busdWalletAddress: data.busdWalletAddress,
      metaMaskAccount: data.metaMaskAccount,
      onboardingState: 'Guest',
      dateCreated: new Date(),
      lastEdit: new Date()
    }
    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .add(docData)
      .then((doc) => {
        console.log("User has been created successfully!", doc)
        return true
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error creating User data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error creating User data: ${err}`
          })
        }
      })
      return false
  },
  /* Save User Data */
  async saveUser(data) {
    const organisationId = await this.getOrganisationId()
    const userId = data.uid
    const docData = {
      organisationId,
      role: 'User',
      name: data.name,
      legalName: data.legalName,
      taxNumber: data.taxNumber,
      countryCode: data.countryCode,
      timezone: data.timezone,
      baseCurrency: data.baseCurrency,
      userType: data.userType,
      lastEdit: new Date()
    }
    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .doc(userId)
      .set(docData, { merge: true })
      .then(() => {
        // $nuxt.$store.commit('SET_COMPANY', docData)
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving User data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving User data: ${err}`
          })
        }
      })
  },
  /* Get User Type */
  async getUserType(user) {
    const organisationId = await this.getOrganisationId()
    const userId = user.uid
    const userRef = $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .doc(userId)
    let userType = ''
    await userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            userType = doc.data().profileType
          } catch (err) {}
        }
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User type: ${err}`
          })
        }
      })
    return userType
  },
  /* Save User Type */
  async saveUserType(user) {
    const organisationId = await this.getOrganisationId()
    const userId = user.uid
    const isSuccess = await $nuxt.$fireStore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .doc(userId)
      .update({
        profileType: user.profileType
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving User type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving User type: ${err}`
          })
        }
      })
    return isSuccess
  },
  /* Save User Role */
  async saveUserRole(user) {
    const organisationId = await this.getOrganisationId()
    const userId = user.uid
    const isSuccess = await $nuxt.$fireStore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .doc(userId)
      .update({
        role: user.role
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving User type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving User type: ${err}`
          })
        }
      })
    return isSuccess
  },
  /* Get Organisation Admins */
  async getOrganisationAdmins() {
    const organisationId = await this.getOrganisationId()
    const outletRef = await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
    let adminData = ''
    await outletRef
      .get()
      .where('role', '==', 'admin')
      .then((snapshot) => {
        if (snapshot.docs) {
          adminData = snapshot.docs
        }
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation User Admins: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Organisation User Admins: ${err}`
          })
        }
      })
    return adminData
  },
}

export default users
