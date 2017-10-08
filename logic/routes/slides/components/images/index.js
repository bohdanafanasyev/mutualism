import React from 'react';
import styles from './styles.css';


//----------------------------------------------
// Images Component
//----------------------------------------------

export default class Images extends React.Component {

  constructor(props) {
    super(props)
  }


  //----------------------
  // Render
  //----------------------

  render () {

    return (

      <div className={styles.images}>
        <div className={styles.mainWrap}>
          <div className={styles.main} style={this.props.image.main} />
        </div>
        <div className={styles.filterNormal} />
        <div className={styles.upperWrap}>
          <div className={styles.upper} style={this.props.image.upper} />
          <div className={styles.filterHard} />
        </div>
      </div>

    )
  }
}
