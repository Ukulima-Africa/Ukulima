/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-lonely-if */
/* eslint-disable no-use-before-define */
import {
  onboardingStates
} from '../util/enums/states/onboardingStates'

export default function ({
  store,
  route,
  app,
  redirect
}) {
  // Normal checks
  if (route.path === '/logout') {
    /* Do nothing if a user wants to Sign Out */
  } else if (
    route.path !== '/auth/signin/' &&
    route.path !== '/auth/signin' &&
    route.path !== '/auth/signup/' &&
    route.path !== '/auth/signup' &&
    route.path !== '/auth/reset-password/' &&
    route.path !== '/auth/reset-password' &&
    route.path !== '/auth/email-verification/' &&
    route.path !== '/auth/email-verification' &&
    route.path !== '/auth/email-confirmation/' &&
    route.path !== '/auth/email-confirmation' &&
    route.path !== '/terms/' &&
    route.path !== '/terms' &&
    route.path !== '/privacy/' &&
    route.path !== '/privacy' &&
    route.path !== '/grants/' &&
    route.path !== '/grants' &&
    route.path !== '/sponsors/' &&
    route.path !== '/sponsors' &&
    route.path !== '/marketplace/' &&
    route.path !== '/marketplace' &&
    route.path !== '/nfts/' &&
    route.path !== '/nfts'
  ) {
    /* We are on a protected route, check if we have a token */
    // const UserIdToken = store.getters.getUser

    // if (!app.$fire.auth.currentUser || !UserIdToken) {
    //   /* Take them to the login page */
    //   return doOnboardingCheck(store, route)
    // }
    // if (route.path === '/') {
    //   /* Redirect to dashboard for now if someone lands on index */
    //   return doOnboardingCheck(store, route)
    // }
    /* redirect to dashboard for now if someone lands on index */
    return doOnboardingCheck(store, route)
  } else if (
    route.path === '/auth/signin' ||
    route.path === '/auth/signin/' ||
    route.path === '/auth/signup' ||
    route.path === '/auth/signup/' ||
    route.path === '/auth/reset-password' ||
    route.path === '/auth/reset-password/' ||
    route.path === '/auth/email-verification' ||
    route.path === '/auth/email-verification/' ||
    route.path === '/auth/email-confirmation' ||
    route.path === '/auth/email-confirmation/'
  ) {
    // const MetaMaskAccount = store.getters.getAccount
    const UserIdToken = store.getters.getUser

    /* If there is no token, we must be dealing with a GUEST */
    if (!app.$fire.auth.currentUser || !UserIdToken ) {
      /* leave them on the login page */
    } else {
      /* Logged in but need to be directed, do onboarding checks */
      return doOnboardingCheck(store, route)
    }
  }

  function doOnboardingCheck(store, route) {
    if (route.path === '/' || route.path === '/') {
      /* Do nothing */
    } else if (
      route.path === '/terms' ||
      route.path === '/terms/' ||
      route.path === '/privacy' ||
      route.path === '/privacy/' ||
      route.path === '/grants' ||
      route.path === '/grants/' ||
      route.path === '/sponsors' ||
      route.path === '/sponsors/' ||
      route.path === '/marketplace' ||
      route.path === '/marketplace/' ||
      route.path === '/nfts' ||
      route.path === '/nfts/'
    ) {
      /* Do nothing */

    } else if (store.getters.getUser.onboardingState !== onboardingStates.DONE) {
      // also make sure we are not routing to a page if we are already on that page
      // this means we are not done with onboarding
      switch (store.getters.getUser.onboardingState) {
        case onboardingStates.GUEST: {
          if (
            route.path === '/dashboard' ||
            route.path === '/dashboard/' ||
            route.path === '/inventory' ||
            route.path === '/inventory/' ||
            route.path === '/company' ||
            route.path === '/company/' ||
            route.path === '/profile' ||
            route.path === '/profile/'
          ) {
            // return redirect('/auth/signin')
          }
          break
        }
        case onboardingStates.PAYMENT: {
          if (route.path !== '/auth/payment') {
            return redirect('/auth/payment')
          }
          break
        }
        case onboardingStates.ONBOARDING: {
          if (route.path !== '/onboarding') {
            return redirect('/onboarding')
          }
          break
        }
        default: {
          if (store.getters.getUser.onboardingState === undefined) {
            /* our first entrypoint after signing in */
            if (route.path === '/') {
              return redirect('/')
            }
          } else if (route.path !== '/dashboard') {
            return redirect('/dashboard')
          }
          break
        }
      }
    } else {
      // Onboarding is done, user is logged in, let them go where they want, except for onboarding routes
      if (store.getters.getUser.onboardingState === onboardingStates.DONE) {
        // On 2 February 2021, we turned off the daily tasks.
        // There is a high possiblility that this feature will
        // return, so we just redirect users for now.
        // if (route.path !== '/daily' && route.path !== '/daily/') {
        //   if (store.getters.getUser.dailyExpiryDate) {
        //     let today = new Date()
        //     today = today.getTime()
        //     if (today > store.getters.getUser.dailyExpiryDate) {
        //       if (store.getters.getUser.hasConfettiShown) {
        //         redirect('/daily')
        //       }
        //     }
        //   } else {
        //     if (store.getters.getUser.hasConfettiShown) {
        //       redirect('/daily')
        //     }
        //   }
        // }
        if (
          route.path === '/auth/payment/' ||
          route.path === '/auth/payment' ||
          route.path === '/auth/onboarding/' ||
          route.path === '/auth/onboarding'
        ) {
          redirect('/dashboard')
        }
      }
    }
  }
}
