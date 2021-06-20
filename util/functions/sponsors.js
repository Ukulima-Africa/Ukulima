const sponsors = {
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
  /* Get Sponsor Data by Sponsor Id */
  async getSponsor(sponsorId) {
    const sponsorRef = await $nuxt.$fire.firestore
    .collection('sponsors')
    .doc(sponsorId)
  let sponsorData = ''
  await sponsorRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        try {
          sponsorData = doc.data()
        } catch (err) {}
      }
    })
    .catch(error => {
      try {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error getting Sponsor data: ${error.message ? error.message : error}`
        })
      } catch (err) {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error getting sponsor data: ${err}`
        })
      }
    })
  return sponsorData
},
/* Get all Active Sponsors */
async getAllSponsors() {
  const sponsorRef = await $nuxt.$fire.firestore
    .collection('sponsors')
  const sponsorsData = []
  await sponsorRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        sponsorsData.push(doc.data())
      })
    })
    .catch(error => {
      try {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error getting all Sponsors data for Organisation: ${error.message ? error.message : error}`
        })
      } catch (err) {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error getting all Sponsors data for Organisation: ${err}`
        })
      }
    })
  return sponsorsData
},
/* Get all Active Sponsors */
async getActiveSponsors() {
  const sponsorRef = await $nuxt.$fire.firestore
    .collection('sponsors')
  const sponsorsData = []
  await sponsorRef
    .where('active', '==', true)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        sponsorsData.push(doc.data())
      })
    })
    .catch(error => {
      try {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error getting Sponsors data for Organisation: ${error.message ? error.message : error}`
        })
      } catch (err) {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error getting Sponsors data for Organisation: ${err}`
        })
      }
    })
  return sponsorsData
},
/* Get Sponsor Data for Organisation and User */
async getMySponsors() {
  const organisationId = await this.getOrganisationId()
  const sponsorRef = await $nuxt.$fire.firestore
    .collection('sponsors')
  const sponsorsData = []
  await sponsorRef
    .where('organisationId', '==', organisationId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        sponsorsData.push(doc.data())
      })
    })
    .catch(error => {
      try {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error getting Sponsors data for Organisation: ${error.message ? error.message : error}`
        })
      } catch (err) {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error getting Sponsors data for Organisation: ${err}`
        })
      }
    })
  return sponsorsData
},
/* Create Sponsor Data */
async createSponsor(data) {
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
    sponsorType: data.sponsorType,
    description: data.description,
    link: data.link,
    active: data.active,
    dateCreated: new Date(),
    lastEdit: new Date()
  }
  await $nuxt.$fire.firestore
    .collection('sponsors')
    .add(docData)
    .then((doc) => {
      console.log("Sponsor has been created successfully!", doc)
    })
    .catch(error => {
      try {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error creating Sponsor data: ${
            error.message ? error.message : error
          }`
        })
      } catch (err) {
        $nuxt.$log.error(err)
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error creating Sponsor data: ${err}`
        })
      }
    })
  return false
},
/* Save Sponsor Data */
async saveSponsor(data) {
  const sponsorId = data.uid
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
    sponsorType: data.sponsorType,
    description: data.description,
    link: data.link,
    active: data.active,
    lastEdit: new Date()
  }
  await $nuxt.$fire.firestore
    .collection('sponsors')
    .doc(sponsorId)
    .set(docData, {
      merge: true
    })
    .then((doc) => {
          console.log("Sponsor has been updated successfully!", doc)
          console.log("organisation Id:", sponsorId)
      return true
    })
    .catch(error => {
      try {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error saving Sponsor data: ${
            error.message ? error.message : error
          }`
        })
      } catch (err) {
        $nuxt.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'warning',
          message: `Error saving Sponsor data: ${err}`
        })
      }
    })
  return false
},
/* Get Sponsor Type */
async getSponsorType(sponsorId) {
    const sponsorRef = $nuxt.$fire.firestore
      .collection('sponsors')
      .doc(sponsorId)
    let sponsorType = ''
    await sponsorRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          try {
            sponsorType = doc.data().sponsorType
          } catch (err) {}
        }
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Sponsor type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$log.error(err)
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error getting Sponsor type: ${err}`
          })
        }
      })
    return sponsorType
  },
  /* Save Sponsor Type */
  async saveSponsorType(sponsorId, type) {
    const isSuccess = await $nuxt.$fireStore
      .collection('organisations')
      .doc(sponsorId)
      .update({
        sponsorType: type
      })
      .then(() => {
        console.log("Sponsor Id:", sponsorId)
        console.log("Sponsor Type:", type)
      })
      .catch(error => {
        try {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving user Sponsor type: ${error.message ? error.message : error}`
          })
        } catch (err) {
          $nuxt.$q.notify({
            color: 'red-6',
            textColor: 'white',
            icon: 'warning',
            message: `Error saving Sponsor type: ${err}`
          })
        }
      })
    return isSuccess
  },
}

export default sponsors
