const profile = {
  /* Get User's Organisation Id */
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
  /* Get Current User's Profile Data */
  async getProfile() {
    const profileRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
    let profileData = ''
    await profileRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            profileData = doc.data()
          } catch (err) {}
        }
      })
      .catch((error) => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Profile data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Profile data: ${err}`
          })
        }
      })
    return profileData
  },
  /* Save Current Users Profile Data */
  async saveProfile(data) {
    const docData = {
      name: data.name,
      email: data.email,
      phoneCode: data.phoneCode,
      phoneNumber: data.phoneNumber,
      photoURL: data.photoURL,
      profileType: data.profileType,
      integrationType: data.integrationType,
      binanceId: data.binanceId,
      binanceAccount: data.binanceAccount,
      metaMaskAccount: data.metaMaskAccount,
      lastEdit: new Date()
    }

    await $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .set(docData, { merge: true })
      .then((docRef) => {
        console.log("User's Profile has been updated successfully!", docRef.id)
        console.log("User Id:", $nuxt.$fire.auth.currentUser.uid)
        $nuxt.$store.commit('SET_USER', docData)
        this.$q.notify({
          color: 'green-13',
          textColor: 'white',
          icon: 'cloud_done',
          message:
            'Congratulations, your Profile data has been updated successfully!'
        })
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving current user's Profile data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving current user's Profile data: ${err}`
          })
        }
      })
  },
  /* Get Profile Type */
  async getProfileType() {
    const profileRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)

    let profileType = ''
    await profileRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            profileType = doc.data().profileType
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
            message: `Error getting profle type: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting profile type: ${err}`
          })
        }
      })
    return profileType
  },
  /* Save User Type */
  async saveProfileType(type) {
    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc($nuxt.$store.state.user.organisationId)
      .update({
        profileType: type
      })
      .then(() => {
        $nuxt.$store.commit('SET_PROFILE_TYPE', type)
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user profile type: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user profile type: ${err}`
          })
        }
      })
  },
}

export default profile
