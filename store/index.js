import pollWeb3 from '../util/pollWeb3'

const state = () => ({
  web3: {},
  contracts: {
    contractInstance: null,
    UKUContract: null,
  },
  user: {
    web3Instance: false,
    isMetaMask: false,
    chainIdHEX: null,
    chainId: null,
    chainName: null,
    account: null,
    balance: null,
    step: 0,
  },
  profile: {
    isAuthenticated: false,
    userId: null,
    hasMasterPin: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
  },
  profileType: '',
  company: null,
    branch: null,
    branches: 0,
    sidebarTotals: null,
    branchTotals: null,
    isBranchRefreshRequired: false,
    progressCalculations: 0,
  nfts: [],
  nftCats: [],
  searchText: '',
  leftDrawerOpen: false,
})

const actions = {
  async onAuthStateChangedAction(state, {
    authUser,
    claims
  }) {
    if (!authUser) {
      /* Remove State */
      state.commit('SET_USER', null)
      state.commit('SET_COMPANY', null)
      state.commit('SET_BRANCHES', 0)
      state.commit('SET_BRANCH', null)
      state.commit('SET_PROFILE_TYPE', '')
      state.commit('SET_SIDEBAR_TOTALS', null)
    } else {
      const {
        uid
      } = authUser
      // This happens when auth changes,
      // e.g. login or explicit page refresh
      // Get userdata from database once
      const userRef = this.$fire.firestore.collection('users').doc(uid)

      let orgId = ''
      // eslint-disable-next-line no-unused-vars
      let currentBranchId = ''

      await userRef
        .get()
        // eslint-disable-next-line func-names
        .then(function (doc) {
          if (doc.exists) {
            const user = doc.data()
            user.uid = uid
            try {
              if (user.organisationId !== undefined) {
                orgId = user.organisationId
              }
            } catch (error) {
              orgId = ''
            }

            try {
              if (user.currentBranchId !== undefined) {
                currentBranchId = user.currentBranchId
              }
            } catch (error) {
              currentBranchId = ''
            }

            state.commit('SET_USER', user)
          } else {
            state.commit('SET_USER', {
              uid,
            })
          }
        })
        // eslint-disable-next-line func-names
        .catch((error) => {
          console.log('error', error)
          state.commit('SET_USER', {
            uid,
          })
        })

      /* Get data from firestore once */
      if (orgId !== '' && orgId !== undefined) {
        /* existing user and finished integration */
        const orgRef = this.$fire.firestore.collection('organisations').doc(orgId)

        await orgRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (doc.data().profileType !== undefined) {
                state.commit('SET_PROFILE_TYPE', doc.data().profileType)
              }
            }
          })
          .catch((error) => {
            console.log('error', error)
          })

        const docRef = this.$fire.firestore.collection('organisations').doc(orgId).collection('organisations').limit(1)
        await docRef
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.docs && querySnapshot.docs[0]) {
              const company = querySnapshot.docs[0].data()
              state.commit('SET_COMPANY', company)
            }
          })
          .catch((error) => {
            console.log('error', error)
          })

      }
    }
  },
  pollWeb3({
      commit
      }, payload) {
      commit('POLL_WEB3', payload)
  },
  setStep({
    commit
  }, payload) {
    commit('SET_STEP', payload)
  },
  }

const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, {
    authUser,
    claims
  }) => {
    if (!authUser) {
      /* claims = null */
      /* Perform logout operations */
    } else {
      /* Do something with the authUser and the claims object... */
      const {
        uid,
        email,
        emailVerified
      } = authUser
      state.user = {
        uid,
        email,
        emailVerified,
      }
    }
  },
  /* Web3 & Providers */
  SET_WEB3(state, payload) {
    Object.assign(state.web3, payload)
    pollWeb3()
  },
  POLL_WEB3(state, payload) {
    state.user.account = payload.account
    state.user.chainId = payload.chainId
    state.user.chainIdHEX = payload.chainIdHEX
    state.user.chainName = payload.chainName
    state.user.balance = payload.balance
  },
  /* User */
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_WEB3_INSTANCE(state, payload) {
    state.user.web3Instance = payload
  },
  SET_IS_METAMASK(state, payload) {
    state.user.isMetaMask = payload
  },
  SET_CHAIN_ID(state, payload) {
    state.user.chainId = payload
  },
  SET_CHAIN_ID_HEX(state, payload) {
    state.user.chainIdHEX = payload
  },
  SET_CHAIN_NAME(state, payload) {
    state.user.chainName = payload
  },
  SET_ACCOUNT(state, payload) {
    state.user.account = payload
  },
  SET_BALANCE(state, payload) {
    state.user.balance = payload
  },
  SET_STEP(state, payload) {
    state.user.step = payload
  },
  /* Arkane Profile */
  SET_PROFILE(state, payload) {
    Object.assign(state.profile, payload)
  },
  SET_PROFILE_ISAUTHENTICATED(state, payload) {
    state.profile.isAuthenticated = payload
  },
  SET_PROFILE_USERID(state, payload) {
    state.profile.userId = payload
  },
  SET_PROFILE_HASMASTERPIN(state, payload) {
    state.profile.hasMasterPin = payload
  },
  SET_PROFILE_USERNAME(state, payload) {
    state.profile.username = payload
  },
  SET_PROFILE_EMAIL(state, payload) {
    state.profile.email = payload
  },
  SET_PROFILE_FIRSTNAME(state, payload) {
    state.profile.firstName = payload
  },
  SET_PROFILE_LASTNAME(state, payload) {
    state.profile.lastName = payload
  },
  SET_PROFILE_TYPE(state, profileType) {
      state.profileType = profileType
    },
    SET_SIDEBAR_TOTALS(state, sidebarTotals) {
      state.sidebarTotals = sidebarTotals
    },
    SET_BRANCH_TOTALS(state, branchTotals) {
      state.branchTotals = branchTotals
    },
    SET_BRANCH_TOTALS_REFRESH_REQUIRED(state, isBranchRefreshRequired) {
      state.isBranchRefreshRequired = isBranchRefreshRequired
    },
    SET_ORGANISATION(state, orgid) {
      state.user.organisationId = orgid
    },
    SET_ONBOARDING_STATE(state, onboardingState) {
      state.user.onboardingState = onboardingState
    },
    SET_CONFETTI_STATE(state, value) {
      state.user.hasConfettiShown = value
    },
    SET_DAILY_EXPIRY(state, value) {
      state.user.dailyExpiryDate = value
    },
    SET_COMPANY(state, company) {
      state.company = company
    },
    SET_BRANCHES(state, branches) {
      state.branches = branches
    },
    SET_PROGRESS_CALCS(state, progressCalculations) {
      state.progressCalculations = progressCalculations
    },
    async SET_BRANCH(state, branch) {
        state.branch = branch
        // we also update the users doc in the database
        // so that it will remember the branch they last viewed
        // if they change devices etc.
        try {
      console.log("this.$fire.auth.currentUser.uid", $nuxt.$fire.auth.currentUser.uid)
      if (this.$fire.auth.currentUser.uid) {
        const userRef = $nuxt.$fire.firestore.collection('users').doc($nuxt.$fire.auth.currentUser.uid)

        await userRef.get().then(async (doc) => {
          if (doc.exists) {
            await doc.ref.update({
              currentBranchId: branch.ExternalID,
            })
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  /* Contracts */
  SET_CONTRACT_INSTANCE(state, payload) {
    state.contracts.contractInstance = payload
  },
  SET_CONTRACT_UKUCONTRACT(state, payload) {
    state.contracts.UKUContract = payload
  },
  /* NFTs */
  SET_NFT(state, payload) {
    state.nfts.push(payload)
  },
  SET_NFT_CAT(state, payload) {
    state.nftCats.push(payload)
  },
  /* Website */
  SET_SEARCH(state, payload) {
    state.searchText = payload
  },
  TOGGLE_LEFTDRAWER(state) {
    state.leftDrawerOpen = !state.leftDrawerOpen
  },
}

const getters = {
  /* Contracts */
  getContractInstance(state) {
    return state.contracts.contractInstance
    },
    getUKUContract(state) {
      return state.contracts.N3RDContract
    },
  /* Web3 */
  getWeb3(state) {
    return state.web3
  },
  /* User */
  getUser(state) {
    return state.user
  },
  getWeb3Instance(state) {
    return state.user.web3Instance
  },
  getIsMetaMask(state) {
    return state.user.isMetaMask
  },
  getChainId(state) {
    return state.user.chainId
  },
  getChainIdHEX(state) {
    return state.user.chainIdHEX
  },
  getChainName(state) {
    return state.user.chainName
  },
  getAccount(state) {
    return state.user.account
  },
  getBalance(state) {
    return state.user.balance
  },
  getStep(state) {
    return state.user.step
  },
  /* Profile */
  getProfile(state) {
    return state.profile
  },
  getIsAuthenticated(state) {
    return state.profile.isAuthenticated
  },
  getUserId(state) {
    return state.profile.userId
  },
  getHasMasterPin(state) {
    return state.profile.hasMasterPin
  },
  getUsername(state) {
    return state.profile.username
  },
  getEmail(state) {
    return state.profile.email
  },
  getFirstName(state) {
    return state.profile.firstName
  },
  getLastName(state) {
    return state.profile.lastName
  },
  /* Profile Info */
  getProfileType(state) {
      return state.profileType
    },
    getOnboardingState(state) {
      return state.user.onboardingState
    },
    getSidebarTotals(state) {
      return state.sidebarTotals
    },
    getBranchTotals(state) {
      return state.branchTotals
    },
    getIsBranchRefreshRequired(state) {
      return state.isBranchRefreshRequired
    },
    getOrganisationId(state) {
      return state.user.organisationId
    },
    getCompany(state) {
      return state.company
  },
  getBranch(state) {
      return state.branch
  },
  getBranches(state) {
      return state.branches
  },
  /* NFTs */
  getNfts(state) {
    return state.nfts
  },
  getNftCats(state) {
    return state.nftCats
  },
  /* Website */
  getSearchText(state) {
    return state.searchText
  },
  getLeftDrawerState(state) {
    return state.leftDrawerOpen
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
