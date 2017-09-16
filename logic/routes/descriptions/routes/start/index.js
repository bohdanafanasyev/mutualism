export default {
  path : 'start/description',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const startDescription = require('./components/start').default

      /*  Add the reducer to the store on key 'counter'  */


      /*  Return getComponent   */
      cb(null, startDescription)

    /* Webpack named bundle   */
  }, 'startDescription')
  }
}
