import React from 'react';
import styles from '../styles/styles.css';


//----------------------------------------------
// Numbers Component
//----------------------------------------------

export default class Number extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {

    return (

      <div>
        <span ref="currentPage" className={styles.currentPage}>{this.props.slideNumber}</span>
      </div>

    )
  }
}
