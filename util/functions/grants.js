const grants = {
  /* Get User or Organisations ID */
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
  /* Get Grant Data by Grant Id */
  async getGrant(grantId) {
      const grantRef = await $nuxt.$fire.firestore
      .collection('grants')
      .doc(grantId)
    let grantData = ''
    await grantRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            grantData = doc.data()
          } catch (err) {}
        }
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Grant data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting grant data: ${err}`
          })
        }
      })
    return grantData
  },
  /* Get all Active Grants */
  async getActiveGrants() {
    const grantRef = await $nuxt.$fire.firestore
      .collection('grants')
    const grantsData = []
    await grantRef
      .where('active', '==', true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          grantsData.push(doc.data())
        })
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Grants data for Organisation: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Grants data for Organisation: ${err}`
          })
        }
      })
    return grantsData
  },
  /* Get Grant Data for Organisation and User */
  async getMyGrants() {
    const organisationId = await this.getOrganisationId()
    const grantRef = await $nuxt.$fire.firestore
      .collection('grants')
    const grantsData = []
    await grantRef
      .where('organisationId', '==', organisationId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          grantsData.push(doc.data())
        })
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Grants data for Organisation: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Grants data for Organisation: ${err}`
          })
        }
      })
    return grantsData
  },
  /* Create Grant Data */
  async createGrant(data) {
    const docData = {
      userId: data.userId,
      organisationId: data.organisationId,
      name: data.name,
      email: data.email,
      phoneCode: null,
      contactNumber: data.contactNumber,
      imageURL: data.imageURL,
      twitter: data.twitter,
      facebook: data.facebook,
      amount: data.amount,
      grantType: data.grantType,
      description: data.description,
      link: data.link,
      active: data.active,
      dateCreated: new Date(),
      lastEdit: new Date()
    }
    await $nuxt.$fire.firestore
      .collection('grants')
      .add(docData)
      .then((doc) => {
        console.log("Grant has been created successfully!", doc)
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error creating Grant data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          $nuxt.$log.error(err)
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error creating Grant data: ${err}`
          })
        }
      })
    return false
  },
  /* Save Grant Data */
  async saveGrant(data) {
    const grantId = data.uid
    const docData = {
      userId: data.userId,
      organisationId: data.organisationId,
      name: data.name,
      email: data.email,
      phoneCode: null,
      contactNumber: data.contactNumber,
      imageURL: data.imageURL,
      twitter: data.twitter,
      facebook: data.facebook,
      amount: data.amount,
      grantType: data.grantType,
      description: data.description,
      link: data.link,
      active: data.active,
      lastEdit: new Date()
    }
    await $nuxt.$fire.firestore
      .collection('grants')
      .doc(grantId)
      .set(docData, {
        merge: true
      })
      .then((doc) => {
            console.log("Grant has been updated successfully!", doc)
            console.log("organisation Id:", grantId)
        return true
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Grant data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Grant data: ${err}`
          })
        }
      })
    return false
  },
  /* Get Grant Type */
  async getGrantType(grantId) {
      const grantRef = $nuxt.$fire.firestore
        .collection('grants')
        .doc(grantId)
      let grantType = ''
      await grantRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            try {
              grantType = doc.data().grantType
            } catch (err) {}
          }
        })
        .catch(error => {
          try {
            $nuxt.$q.notify({
              color: 'red-6',
              textColor: 'white',
              icon: 'warning',
              message: `Error getting Grant type: ${error.message ? error.message : error}`
            })
          } catch (err) {
            $nuxt.$log.error(err)
            $nuxt.$q.notify({
              color: 'red-6',
              textColor: 'white',
              icon: 'warning',
              message: `Error getting Grant type: ${err}`
            })
          }
        })
      return grantType
    },
    /* Save Grant Type */
    async saveGrantType(grantId, type) {
      const isSuccess = await $nuxt.$fireStore
        .collection('organisations')
        .doc(grantId)
        .update({
          grantType: type
        })
        .then(() => {
          console.log("Grant Id:", grantId)
          console.log("Grant Type:", type)
        })
        .catch(error => {
          try {
            $nuxt.$q.notify({
              color: 'red-6',
              textColor: 'white',
              icon: 'warning',
              message: `Error saving user Grant type: ${error.message ? error.message : error}`
            })
          } catch (err) {
            $nuxt.$q.notify({
              color: 'red-6',
              textColor: 'white',
              icon: 'warning',
              message: `Error saving Grant type: ${err}`
            })
          }
        })
      return isSuccess
    },
}

export default grants
