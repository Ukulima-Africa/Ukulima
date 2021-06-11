const states = {
  async saveState(state) {
    const isSuccess = await $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
      .update({
        onboardingState: state
      })
      .then(function () {
        // Also update our local state, because it does not
        // immediately update until the next auth state change or page refresh
        $nuxt.$store.commit('SET_ONBOARDING_STATE', state)
        return true
      })
      .catch(error => {
        console.log("error", error)
        return false
      })
    return isSuccess
  },
  async getState() {
    const stateRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)
    let state = ''
    await stateRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          try {
            state = doc.data().onboardingState
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
            message: `Error getting a User's Onboarding State: ${
              error.message ? error.message : error
            }`
          })
        } catch (error) {
          this.$log.error(error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User's Onboarding State: ${error}`
          })
        }
      })
    return state
  }
}

export default states
