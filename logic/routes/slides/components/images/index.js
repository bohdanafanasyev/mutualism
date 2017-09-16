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
        <div className={styles.imageMain} style={this.props.image.right}></div>
        <div className={styles.filterNormal} />
        <div className={styles.upperWrap}>
          <div className={styles.imageUpper} style={this.props.image.left}></div>
          <div className={styles.filterHard} />
        </div>
      </div>

    )
  }
}
