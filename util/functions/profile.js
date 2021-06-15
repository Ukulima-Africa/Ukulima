const profile = {
  async getProfileData() {
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
            message: `Error getting Profile data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting profile data: ${err}`
          })
        }
      })
    return profileData
  },
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
  async getProfileType() {
    let profileType = ''
    try {
      profileType = $nuxt.$store.getters.getProfileType
    } catch (error) {}

    // await profileRef
    //   .get()
    //   .then(function(doc) {
    //     if (doc.exists) {
    //       try {
    //         profileType = doc.data().profileType
    //       } catch (err) {}
    //     }
    //   })
    //   .catch(error => {
    //     try {
    //       this.$log.error(error.message ? error.message : error)
    //       this.$q.notify({
    //         color: 'red-6',
    //         textColor: 'white',
    //         icon: 'warning',
    //         message: `Error getting profle type: ${
    //           error.message ? error.message : error
    //         }`
    //       })
    //     } catch (error) {
    //       this.$log.error(error)
    //       this.$q.notify({
    //         color: 'red-6',
    //         textColor: 'white',
    //         icon: 'warning',
    //         message: `Error getting profile type: ${error}`
    //       })
    //     }
    //   })
    return profileType
  },

}

export default profile
