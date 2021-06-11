import axios from 'axios'
/* util
  These are some helper functions that I thought might be useful in our application.
*/
const util = {
  async getAccessToken() {
    const docRef = $nuxt.$fire.firestore
      .collection('users')
      .doc($nuxt.$fire.auth.currentUser.uid)

    let refreshToken = ''
    let domainPrefix = ''
    let provider = ''
    let orgId = ''

    await docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          orgId = doc.data().organisationId
          provider = doc.data().integrationType
          domainPrefix = doc.data().domainPrefix
        } else {
          console.log("doc", doc)
        }
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting a User's profile in order to get the refreshtoken: ${
              error.message ? error.message : error
            }`
          })
        } catch (error) {
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting a user's profile in order to get the refreshtoken: ${error}`
          })
          this.$log.error(error)
        }
      })

    await $nuxt.$fireStore
      .collection('organisations')
      .doc(orgId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          refreshToken = doc.data().refreshToken
        }
      })

    const accessToken = await axios
      .post(process.env.refreshToken_url, {
        refreshToken,
        orgId,
        provider,
        domainPrefix
      })
      .then(res => {
        return res
      })

    return accessToken
  },
  async removeConnections_url() {
    // remove XERO cookies for login reset

    let accessToken = ''
    accessToken = await this.getAccessToken()

    await axios
      .post(process.env.removeConnections_url, {
        accessToken
      })
      .then(res => {
        return res
      })
      .catch(error => {
        this.$log.error(error)
      })
  },
  /* saveValue(key,value)
     This function will save any key with its value to local storage. We also
     encrypt these values.
  */
  saveValue(key, value) {
    try {
      const str = value
      const buff = Buffer.from(str, 'utf-8')
      const base64 = buff.toString('base64')
      if (process.browser) {
        localStorage.setItem(key, base64)
      }
    } catch (error) {}
  },
  /* retrieveValue(key)
     This function will retrieve a key's value from local storage. We also
     decrypt the value first.
  */
  retrieveValue(key) {
    try {
      const base64 = localStorage.getItem(key)
      const buff = Buffer.from(base64, 'base64')
      return buff.toString('utf-8')
    } catch (error) {
      return ''
    }
  },
  getCircularReplacer() {
    const seen = new WeakSet()
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return
        }
        seen.add(value)
      }
      return value
    }
  }
}

export default util
