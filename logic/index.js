import React from 'react';
import ReactDOM from 'react-dom';

// Store and Container
// Container is a necessary wrapper component for HM
import Store from './container/store/store';
import Container from './container';


//----------------------------------------------
// Render
//----------------------------------------------

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  const store = Store({});

  ReactDOM.render(
      <Container store={store} />,
    MOUNT_NODE
  );
};


//----------------------------------------------
// Hot Module Replacement
//----------------------------------------------

if (module.hot) {
  module.hot.accept('./routes/index', () =>
    setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
    // This method is used to break up long running operations and run a callback function immediately after the browser has completed other operations such as events and display updates.
  );
};

render();
