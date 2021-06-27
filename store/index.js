import pollWeb3 from '../util/pollWeb3'

const state = () => ({
  notice: true,
  account: {
    web3Instance: null,
    isMetaMask: null,
    chainIdHEX: null,
    chainId: null,
    chainName: null,
    account: null,
    symbol: null,
    balance: 0.0,
    step: 0,
  },
  profile: {
    isAuthenticated: null,
    userId: null,
    name: null,
    preferred_username: null,
    email: null,
    firstName: null,
    lastName: null,
  },
  tokens: [],
  wallet: {
    address: null,
    balance: 0.0,
    symbol: null,
    decimals: null,
    secretType: null,
  },
  wallets: [],
  user: {
    uid: null,
    organisationId: null,
    role: 'user',
    name: null,
    email: null,
    emailVerified: null,
    phoneCode: null,
    phoneNumber: null,
    photoURL: null,
    profileType: null,
    integrationType: 'BEP-20',
    binanceId: null,
    binanceAccount: null,
    metaMaskAccount: null,
    onboardingState: null,
    dateCreated: null,
    lastEdit: null
  },
  company: {
    name: null,
    legalName: null,
    taxNumber: null,
    countryCode: null,
    timezone: null,
    baseCurrency: null,
    companyType: null,
    dateCreated: null,
    lastEdit: null
  },
  branch: null,
  branches: 0,
  sidebarTotals: null,
  branchTotals: null,
  isBranchRefreshRequired: false,
  progressCalculations: 0,
  inventory: [],
  grants: [],
  myGrants: [],
  sponsors: [],
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
        .then((doc) => {
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
        /* Existing user and finished onboarding */
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
  setLeftDrawer({
    commit
  }, payload) {
    commit('SET_LEFTDRAWER', payload)
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
        emailVerified,
        displayName,
        phoneNumber,
        photoURL
      } = authUser
      state.user = {
        uid,
        email,
        emailVerified,
        displayName,
        phoneNumber,
        photoURL
      }
    }
  },
  /* Web3 & Providers */
  POLL_WEB3(state, payload) {
    state.account.account = payload.account
    state.account.chainId = payload.chainId
    state.account.chainIdHEX = payload.chainIdHEX
    state.account.chainName = payload.chainName
    state.account.symbol = payload.symbol
    state.account.balance = payload.balance
  },
  /* Tokens */
  SET_TOKENS(state, payload) {
    state.tokens.push(payload)
  },
  /* Wallets */
  SET_WALLET_ADDRESS(state, payload) {
    state.wallet.address = payload
  },
  SET_WALLET_BALANCE(state, payload) {
    state.wallet.balance = payload
  },
  SET_WALLET_BALANCE_SYMBOL(state, payload) {
    state.wallet.symbol = payload
  },
  SET_WALLET_BALANCE_DECIMALS(state, payload) {
    state.wallet.decimals = payload
  },
  SET_WALLET_NETWORK(state, payload) {
    state.wallet.secretType = payload
  },
  SET_WALLETS(state, payload) {
    state.wallets.push(payload)
  },
  /* Metamask Account */
  SET_ACCOUNT(state, payload) {
    Object.assign(state.account, payload)
  },
  SET_WEB3_INSTANCE(state, payload) {
    state.account.web3Instance = payload
    if (payload === true) {
      pollWeb3()
    }
  },
  SET_IS_METAMASK(state, payload) {
    state.account.isMetaMask = payload
  },
  SET_CHAIN_ID(state, payload) {
    state.account.chainId = payload
  },
  SET_CHAIN_ID_HEX(state, payload) {
    state.account.chainIdHEX = payload
  },
  SET_CHAIN_NAME(state, payload) {
    state.account.chainName = payload
  },
  SET_ACCOUNT_ADDRESS(state, payload) {
    state.account.account = payload
  },
  SET_SYMBOL(state, payload) {
    state.account.symbol = payload
  },
  SET_BALANCE(state, payload) {
    state.account.balance = payload
  },
  SET_STEP(state, payload) {
    state.account.step = payload
  },
  /* Arkane Profile */
  SET_PROFILE(state, payload) {
    Object.assign(state.profile, payload)
  },
  RESET_PROFILE(state) {
    state.profile = {
      isAuthenticated: false,
      userId: null,
      name: null,
      preferred_username: null,
      email: null,
      firstName: null,
      lastName: null,
    }
  },
  SET_PROFILE_ISAUTHENTICATED(state, payload) {
    state.profile.isAuthenticated = payload
  },
  SET_PROFILE_USERID(state, payload) {
    state.profile.userId = payload
  },
  SET_PROFILE_USERNAME(state, payload) {
    state.profile.preferred_username = payload
  },
  SET_PROFILE_NAME(state, payload) {
    state.profile.name = payload
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
  /* User */
  SET_USER(state, payload) {
    Object.assign(state.user, payload)
  },
  RESET_USER(state) {
    state.user = {
      uid: null,
      email: null,
      emailVerified: null,
      displayName: null,
      phoneNumber: null,
      photoURL: null,
      onboardingState: 'Guest',
    }
  },
  SET_PROFILE_TYPE(state, profileType) {
    state.user.profileType = profileType
  },
  RESET_PROFILE_TYPE(state, profileType) {
    state.user.profileType = profileType
  },
  SET_ORGANISATION(state, orgid) {
    state.user.organisationId = orgid
  },
  SET_ONBOARDING_STATE(state, onboardingState) {
    state.user.onboardingState = onboardingState
  },
  SET_CONFETTI_STATE(state, value) {
  state.user.hasInvested = value
  },
  SET_DAILY_EXPIRY(state, value) {
    state.user.dailyExpiryDate = value
  },
  /* Company, Organisation or Farm */
  SET_COMPANY(state, company) {
    state.company = company
  },
  SET_COMPANY_TYPE(state, company) {
    state.company.companyType = company
  },
  SET_BRANCHES(state, branches) {
    state.branches = branches
  },
  SET_BRANCH(state, branch) {
    state.branch = branch
    // we also update the users doc in the database
    // so that it will remember the branch they last viewed
    // if they change devices etc.
    // try {
    //   const userID = await this.$fire.auth.currentUser.uid
    //   console.log("userID", userID)
    //   if (userID) {
    //     const userRef = this.$fire.firestore.collection('users').doc(userID)
    //     await userRef.get().then(async (doc) => {
    //       if (doc.exists) {
    //         await doc.ref.update({
    //           currentBranchId: branch.ExternalID,
    //         })
    //       }
    //     })
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
  },
  /* Other Totals */
  SET_SIDEBAR_TOTALS(state, sidebarTotals) {
    state.sidebarTotals = sidebarTotals
  },
  SET_BRANCH_TOTALS(state, branchTotals) {
    state.branchTotals = branchTotals
  },
  SET_BRANCH_TOTALS_REFRESH_REQUIRED(state, isBranchRefreshRequired) {
    state.isBranchRefreshRequired = isBranchRefreshRequired
  },
  SET_PROGRESS_CALCS(state, progressCalculations) {
    state.progressCalculations = progressCalculations
  },
  /* Grants */
  SET_GRANTS(state, payload) {
    state.grants.push(payload)
  },
  SET_MY_GRANTS(state, payload) {
    state.myGrants.push(payload)
  },
  /* Sponsors */
  SET_SPONSORS(state, payload) {
    state.sponsors.push(payload)
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
  SET_LEFTDRAWER(state, payload) {
    state.leftDrawerOpen = payload
  },
  TOGGLE_LEFTDRAWER(state) {
    state.leftDrawerOpen = !state.leftDrawerOpen
  },
  SET_NOTICE(state, payload) {
    state.notice = payload
  },
  TOGGLE_NOTICE(state) {
    state.notice = !state.notice
  },
}

const getters = {
  /* Metamask Account */
  getAccount(state) {
    return state.account
  },
  getWeb3Instance(state) {
    return state.account.web3Instance
  },
  getIsMetaMask(state) {
    return state.account.isMetaMask
  },
  getChainId(state) {
    return state.account.chainId
  },
  getChainIdHEX(state) {
    return state.account.chainIdHEX
  },
  getChainName(state) {
    return state.account.chainName
  },
  getAccountAddress(state) {
    return state.account.account
  },
  getSymbol(state) {
    return state.account.symbol
  },
  getBalance(state) {
    return state.account.balance
  },
  getStep(state) {
    return state.account.step
  },
  /* Arkane Profile */
  getProfile(state) {
    return state.profile
  },
  getIsAuthenticated(state) {
    return state.profile.isAuthenticated
  },
  getUserId(state) {
    return state.profile.userId
  },
  getUsername(state) {
    return state.profile.preferred_username
  },
  getName(state) {
    return state.profile.name
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
  /* Wallets */
  getWallet(state) {
    return state.wallet
  },
  getWalletAddress(state) {
    return state.wallet.address
  },
  getWalletBalance(state) {
    return state.wallet.balance
  },
  getWalletBalanceSymbol(state) {
    return state.wallet.symbol
  },
  getWalletBalanceDecimals(state) {
    return state.wallet.decimals
  },
  getWalletNetwork(state) {
    return state.wallet.secretType
  },
  getWallets(state) {
    return state.wallets
  },
  /* Tokens */
  getTokens(state) {
    return state.tokens
  },
  /* User */
  getUser(state) {
    return state.user
  },
  getProfileType(state) {
    return state.user.profileType
  },
  getOnboardingState(state) {
    return state.user.onboardingState
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
  getSidebarTotals(state) {
    return state.sidebarTotals
  },
  getBranchTotals(state) {
    return state.branchTotals
  },
  getIsBranchRefreshRequired(state) {
    return state.isBranchRefreshRequired
  },
  /* GRANTS */
  getGrants(state) {
    return state.grants
  },
  getMyGrants(state) {
    return state.myGrants
  },
  /* Sponsors */
  getSponsors(state) {
    return state.sponsors
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
  getNotice(state) {
    return state.notice
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
