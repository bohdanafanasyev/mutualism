import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Wrap from '../wrap';



//----------------------------------------------
// Container Component
//----------------------------------------------

export default class Container extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired
  }


  // By default it's true, will stop component rerendering when new state or props are being recieved.
  shouldComponentUpdate() {
    return false;
  }


  //----------------------
  // Render
  //----------------------

  render() {

    return (
      <Provider store={this.props.store} >
        <BrowserRouter>
            <Route path='/' component={Wrap} onWheel={this.scroll} />
        </BrowserRouter>
      </Provider>
    )
  }
}
