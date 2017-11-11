import React from 'react';
import classNames from 'classnames';
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
        <div className={styles.mainWrap} >
          <div className={classNames(styles.main, this.props.fadeEnter ? styles.fadeMain : styles.slideMain)} style={this.props.images.main} />
        </div>
        <div className={styles.filterNormal} />
        <div className={styles.upperWrap}>
          <div className={styles.upper} style={this.props.images.upper} />
          <div className={styles.filterHard} />
        </div>
        <div className={styles.sideGradient} />
      </div>

    )
  }
}
