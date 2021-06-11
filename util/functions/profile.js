const profile = {
  async saveProfileType(type) {
    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc($nuxt.$store.state.user.organisationId)
      .update({
        profileType: type
      })
      .then(function () {
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
        } catch (error) {
          this.$log.error(error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user profile type: ${error}`
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
  async getProfileData() {
    const profileRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
    let profileData = ''
    await profileRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          try {
            profileData = doc.data()
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
            message: `Error getting profile data: ${
              error.message ? error.message : error
            }`
          })
        } catch (error) {
          this.$log.error(error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting profile data: ${error}`
          })
        }
      })
    return profileData
  }
}

export default profile
