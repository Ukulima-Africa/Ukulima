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
    /* Do nothing if a user wants to sign out */
  } else if (
    route.path !== '/auth/signin' &&
    route.path !== '/auth/signin/' &&
    route.path !== '/auth/signup' &&
    route.path !== '/auth/signup/' &&
    route.path !== '/auth/reset-password' &&
    route.path !== '/auth/reset-password/' &&
    route.path !== '/auth/email-verification' &&
    route.path !== '/auth/email-verification/' &&
    route.path !== '/auth/email-confirmation' &&
    route.path !== '/auth/email-confirmation/'
  ) {
    /* We are on a protected route, check if we have a token */
    const UserIdToken = store.getters.getUser

    if (!app.$fire.auth.currentUser || !UserIdToken) {
      /* Take them to the login page */
      return redirect('/auth/signin')
    }
    // if (route.path === '/') {
    // redirect to dashboard for now if someone lands on index
    // return doOnboardingCheck(store, route)
    // }
    // redirect to dashboard for now if someone lands on index
    return doOnboardingCheck(store, route)
  } else if (
    route.path === '/auth/signin' ||
    route.path === '/auth/signup' ||
    route.path === '/auth/reset-password' ||
    route.path === '/auth/email-verification' ||
    route.path === '/auth/email-confirmation' ||
    route.path === '/auth/signin/' ||
    route.path === '/auth/signup/' ||
    route.path === '/auth/reset-password/' ||
    route.path === '/auth/email-verification/' ||
    route.path === '/auth/email-confirmation/'
  ) {
    const UserIdToken = store.getters.getUser

    // If there is no token, we must be dealing with a GUEST
    if (!app.$fire.auth.currentUser || !UserIdToken) {
      // leave them on the login page
    } else {
      // logged in but need to be directed, do onboarding checks
      return doOnboardingCheck(store, route)
    }
  }

  function doOnboardingCheck(store, route) {
    if (route.path === '/' || route.path === '/') {
      // do nothing
    } else if (
      route.path === '/profile' ||
      route.path === '/profile/' ||
      route.path === '/company' ||
      route.path === '/company/'
    ) {
      // do nothing
    } else if (store.getters.getUser.onboardingState !== onboardingStates.DONE) {
      // also make sure we are not routing to a page if we are already on that page
      // this means we are not done with onboarding

      switch (store.getters.getUser.onboardingState) {
        case onboardingStates.INTEGRATION: {
          if (route.path !== '/auth/integrations') {
            return redirect('/auth/integrations')
          }
          break
        }
        case onboardingStates.PAYMENT: {
          if (route.path !== '/auth/payment') {
            return redirect('/auth/payment')
          }
          break
        }
        case onboardingStates.BRANCHES: {
          if (route.path !== '/branches') {
            return redirect('/branches')
          }
          break
        }
        case onboardingStates.WELCOME: {
          if (route.path !== '/welcome') {
            return redirect('/welcome')
          }
          break
        }
        case onboardingStates.WAITING: {
          if (route.path !== '/waiting') {
            return redirect('/waiting')
          }
          break
        }
        case onboardingStates.ONBOARDING: {
          if (
            route.path === '/inventory/load-items/resell' ||
            route.path === '/inventory/load-items/resell/' ||
            route.path === '/inventory/load-items/make' ||
            route.path === '/inventory/load-items/make/' ||
            route.path === '/inventory/load-items/materials' ||
            route.path === '/inventory/load-items/materials/'
          ) {
            // don't redirect these
          } else if (route.path !== '/onboarding') {
            return redirect('/onboarding')
          }
          break
        }
        case onboardingStates.CALCULATING: {
          if (route.path !== '/calculating') {
            return redirect('/calculating')
          }
          break
        }
        default: {
          if (store.getters.getUser.onboardingState === undefined) {
            // our first entrypoint after signing in
            if (route.path === '/index') {
              return redirect('/index')
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
          route.path === '/daily' ||
          route.path === '/daily/' ||
          route.path === '/auth/signin' ||
          route.path === '/auth/signin/' ||
          route.path === '/auth/signup' ||
          route.path === '/auth/signup/' ||
          route.path === '/auth/reset-password' ||
          route.path === '/auth/reset-password/' ||
          route.path === '/auth/email-verification' ||
          route.path === '/auth/email-verification/' ||
          route.path === '/auth/email-confirmation' ||
          route.path === '/auth/email-confirmation/' ||
          route.path === '/auth/integrations/' ||
          route.path === '/auth/integrations' ||
          route.path === '/auth/payment/' ||
          route.path === '/auth/payment' ||
          route.path === '/inventory/load-items/resell' ||
          route.path === '/inventory/load-items/resell/' ||
          route.path === '/inventory/load-items/make' ||
          route.path === '/inventory/load-items/make/' ||
          route.path === '/inventory/load-items/materials' ||
          route.path === '/inventory/load-items/materials/' ||
          route.path === '/welcome/' ||
          route.path === '/welcome' ||
          route.path === '/branches/' ||
          route.path === '/branches' ||
          route.path === '/waiting/' ||
          route.path === '/waiting' ||
          route.path === '/onboarding/' ||
          route.path === '/onboarding' ||
          route.path === '/calculating/' ||
          route.path === '/calculating'
        ) {
          redirect('/dashboard')
        }
      }
    }
  }
}
