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
  /* Get Grant Data by Organisations Id */
  async getGrant() {
    const organisationId = await this.getOrganisationId()
    const grantRef = $nuxt.$fire.firestore
      .collection('grants')
      .doc(organisationId)
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
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Grant data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting grant data: ${err}`
          })
        }
      })
    return grantData
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
      link: data.link,
      description: data.description,
      dateCreated: new Date(),
      lastEdit: new Date()
    }
    await $nuxt.$fire.firestore
      .collection('grants')
      .add(docData)
      .then(async (docRef) => {
        console.log("Grant has been created successfully!", docRef.id)
        return true
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Grant data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Grant data: ${err}`
          })
        }
      })
    return false
  },
  /* Save Grant Data */
  async saveGrant(data) {
    const organisationId = await this.getOrganisationId()
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
      link: data.link,
      description: data.description,
      lastEdit: new Date()
    }
    await $nuxt.$fire.firestore
      .collection('grants')
      .doc(organisationId)
      .set(docData, {
        merge: true
      })
      .then((docRef) => {
        console.log("Grant has been updated successfully!", docRef.id)
        console.log("organisation Id:", organisationId)
        return true
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Grant data: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Grant data: ${err}`
          })
        }
      })
    return false
  },
  // /* Get Grant Type */
  // async getGrantType() {
  //   const organisationId = await this.getOrganisationId()
  //   const grantRef = $nuxt.$fire.firestore
  //     .collection('grants')
  //     .doc(organisationId)
  //   let grantType = ''
  //   await grantRef
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         try {
  //           grantType = doc.data().grantType
  //         } catch (err) {}
  //       }
  //     })
  //     .catch(error => {
  //       try {
  //         this.$log.error(error.message ? error.message : error)
  //         this.$q.notify({
  //           color: 'red-6',
  //           textColor: 'white',
  //           icon: 'warning',
  //           message: `Error getting Grant type: ${error.message ? error.message : error}`
  //         })
  //       } catch (err) {
  //         this.$log.error(err)
  //         this.$q.notify({
  //           color: 'red-6',
  //           textColor: 'white',
  //           icon: 'warning',
  //           message: `Error getting Grant type: ${err}`
  //         })
  //       }
  //     })
  //   return grantType
  // },
  // /* Save Grant Type */
  // async saveGrantType(type) {
  //   const organisationId = await this.getOrganisationId()

  //   await $nuxt.$fireStore
  //     .collection('organisations')
  //     .doc(organisationId)
  //     .update({
  //       grantType: type
  //     })
  //     .then(() => {
  //       console.log("Grant type been updated successfully!", type)
  //       console.log("organisation Id:", organisationId)
  //     })
  //     .catch(error => {
  //       try {
  //         this.$log.error(error.message ? error.message : error)
  //         this.$q.notify({
  //           color: 'red-6',
  //           textColor: 'white',
  //           icon: 'warning',
  //           message: `Error saving user grant type: ${error.message ? error.message : error}`
  //         })
  //       } catch (err) {
  //         this.$log.error(err)
  //         this.$q.notify({
  //           color: 'red-6',
  //           textColor: 'white',
  //           icon: 'warning',
  //           message: `Error saving user grant type: ${err}`
  //         })
  //       }
  //     })
  // },
}

export default grants
