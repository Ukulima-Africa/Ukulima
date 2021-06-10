/**
 * @plugin $log
 * @extends Vue
 * @description Controlled logger for Sentry Reporting on errors
 * @example
 *  this.$log('hello')
 *  this.$log.error(error)
 */
import Vue from 'vue'
// import * as Sentry from '@sentry/browser'
// import * as Integrations from '@sentry/integrations'

/* Initalize the Sentry SDK if production  */
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  // Sentry.init({
  //   dsn: process.env.SENTRY_DSN,
  //   integrations: [
  //     new Integrations.Vue({
  //       Vue,
  //       attachProps: true
  //     })
  //   ]
  // })
}

/* Base log -> USAGE: this.$log('hello errors')  */
const log = (...msg) => {
  if (process.env.NODE_ENV !== 'production' && msg) {
    console.log(
      `%c[ Console Log : ]\n${  JSON.stringify(...msg, null, 4)}`,
      'color: lightGreen'
    )
  }
}

/* Error log -> USAGE: this.$log.error(error)  */
log.error = (...msg) => {
  if (process.env.NODE_ENV === 'development' && msg) {
    console.error('%c[ Console Log: : ERROR ]\n', 'color: red', ...msg)
    throw new Error(...msg)
  } else if (
    (msg && process.env.NODE_ENV === 'staging') ||
    process.env.NODE_ENV === 'production'
  ) {
    // Sentry.captureException(msg)
  }
}

/* Production enhancements */
if (
  process.browser &&
  process.env.NODE_ENV === 'production' &&
  typeof window === 'object'
) {
  /* Capture all window error events  */
  window.onerror = err => {
    log.error(err)
  }
  /* Overwrite console as a catchall */
  // eslint-disable-next-line no-multi-assign
  console.log = console.warn = () => {
    /* Do nothing */
  }
  console.error = err => {
    log.error(err)
  }
}

/* Setup Namespace */
log.install = Vue => {
  Vue.prototype.$log = log
}

/* Init */
Vue.use(log)
