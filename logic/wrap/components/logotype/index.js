import React from 'react';
import styles from './styles.css';


//----------------------------------------------
// Logotype Component
//----------------------------------------------

export default class Logotype extends React.Component {

  constructor(props) {
    super(props);
  }

  //----------------------
  // Render
  //----------------------

  render() {

    return (

      <div className={styles.logotype}>
        <div className={styles.logoWrap}>
          <span className={styles.logo}></span>
        </div>
        <p className={styles.type}>mutualism inc.</p>
      </div>

    )
  }
}
