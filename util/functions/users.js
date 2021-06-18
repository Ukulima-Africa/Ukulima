const users = {
  /* Get User's Organisation Id */
  async getOrgId() {
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

  /* Create User */
  async createUser(data) {

    // const docData = {
    //   stringExample: "Hello world!",
    //   booleanExample: true,
    //   numberExample: 3.14159265,
    //   dateExample: $nuxt.$fire.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
    //   arrayExample: [5, true, "hello"],
    //   nullExample: null,
    //   objectExample: {
    //     a: 5,
    //     b: {
    //         nested: "foo"
    //     }
    //   }
    // };

    const organisationId = await this.getOrgId()

    const docData = {
      name: data.name,
      email: data.email,
      emailVerified: data.emailVerified,
      phoneNumber: data.phoneNumber,
      photoURL: data.photoURL,
      integrationType: data.integrationType,
      onboardingState: data.onboardingState,
      profileType: data.profileType,
      organisationId: data.organisationId,
      role: data.role,
      dateCreated: $nuxt.$fire.firestore.FieldValue.serverTimestamp(),
      lastEdit: $nuxt.$fire.firestore.FieldValue.serverTimestamp(),
    }
    // Add a new document with a generated id.
    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .add(docData)
      .then((docRef) => {
        console.log("User created successfully!", docRef.id)
        console.log("organisationId:", data.organisationId)
        this.$q.notify({
          color: 'green-13',
          textColor: 'white',
          icon: 'cloud_done',
          message:
            'Congratulations, your new User has been created successfully!'
        })
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error creating User: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error creating User: ${err}`
          })
        }
      })
  },
  /* Get User Data */
  async getUser(id) {
    const organisationId = await this.getOrgId()

    const userRef = await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .doc(id)

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
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User data: ${err}`
          })
        }
      })
    return userData
  },
  /* Get all Users Data */
  async getUsers() {
    const organisationId = await this.getOrgId()
    const usersArr = []

    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usersArr.push({ ...doc.data(), id: doc.id })
        })
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User data: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting User data: ${err}`
          })
        }
      })

    if (usersArr === undefined) {
      // eslint-disable-next-line no-unused-vars
      const usersArr = []
    }
    return usersArr
  },
  /* Create User */
  async editUser(data, id) {

    // const docData = {
    //   stringExample: "Hello world!",
    //   booleanExample: true,
    //   numberExample: 3.14159265,
    //   dateExample: $nuxt.$fire.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
    //   arrayExample: [5, true, "hello"],
    //   nullExample: null,
    //   objectExample: {
    //     a: 5,
    //     b: {
    //         nested: "foo"
    //     }
    //   }
    // };

    const organisationId = await this.getOrgId()

    const docData = {
      name: data.name,
      email: data.email,
      emailVerified: data.emailVerified,
      phoneNumber: data.phoneNumber,
      photoURL: data.photoURL,
      integrationType: data.integrationType,
      onboardingState: data.onboardingState,
      profileType: data.profileType,
      organisationId: data.organisationId,
      role: data.role,
      dateCreated: $nuxt.$fire.firestore.FieldValue.serverTimestamp(),
      lastEdit: $nuxt.$fire.firestore.FieldValue.serverTimestamp(),
    }
    // Add a new document with a generated id.
    await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .set(docData)
      .where(id)
      .then((docRef) => {
        console.log("User created successfully!", docRef.id)
        console.log("organisationId:", data.organisationId)
        this.$q.notify({
          color: 'green-13',
          textColor: 'white',
          icon: 'cloud_done',
          message:
            'Congratulations, your new User has been created successfully!'
        })
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error creating User: ${
              error.message ? error.message : error
            }`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error creating User: ${err}`
          })
        }
      })
  },

  /* Delete User */
  async deleteUser(id) {
    const organisationId = await this.getOrgId()
    const result = await $nuxt.$fire.firestore
      .collection('organisations')
      .doc(organisationId)
      .collection('users')
      .doc(id)
      .delete()
      .then(() => {
        return true
      })
      .catch(error => {
        try {
          this.$log.error(error.message ? error.message : error)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error deleting User ID: ${id} Error: ${error.message ? error.message : error}`
          })
        } catch (err) {
          this.$log.error(err)
          this.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error deleting User: ${err}`
          })
        }
        return false
      })
    return result
  },
}

export default users
