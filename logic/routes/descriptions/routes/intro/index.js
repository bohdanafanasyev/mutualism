export default {
  path : 'intro/description',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const introDescription = require('./components/intro').default

      /*  Add the reducer to the store on key 'counter'  */


      /*  Return getComponent   */
      cb(null, introDescription)

    /* Webpack named bundle   */
  }, 'introDescription')
  }
}
