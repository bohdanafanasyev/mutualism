import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';


//----------------------------------------------
// Images Component
//----------------------------------------------

export default class Images extends React.Component {

  constructor(props) {
    super(props)
  }
  //
  // <div className={styles.mainWrapSlides} style={{display: descriptions ? 'none' : 'block'}}>
  //   <div className={styles.main} style={this.props.images.main} />
  // </div>
  // <div className={styles.mainWrapDescriptions} style={{display: descriptions ? 'block' : 'none'}}>
  //   <div className={styles.main} style={this.props.images.main} />
  // </div>

  //----------------------
  // Render
  //----------------------

  render () {
    let descriptions = this.props.descriptions();

    return (

      <div className={styles.images}>
        <div className={classNames(descriptions ? styles.mainWrapDescriptions : styles.mainWrapSlides)}>
          <div className={styles.main} style={this.props.images.main} />
        </div>
        <div className={classNames(descriptions ? styles.filterNormalDescriptions : styles.filterNormalSlides)}  />
        <div className={styles.upperWrap} style={{display: descriptions ? 'none' : 'block'}}>
          <div className={styles.upper} style={this.props.images.upper} />
          <div className={styles.filterHard} />
        </div>
      </div>

    )
  }
}
