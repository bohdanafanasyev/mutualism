import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';


//----------------------------------------------
// Social Icons Component
//----------------------------------------------

export default class SocialIcons extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    console.log("did")
    console.log(this.props.parentState.showSocial)
  }

  componentWillUpdate() {
    console.log("will")
    console.log(this.props.parentState.showSocial)
  }


  //----------------------
  // Render
  //----------------------

  render () {

    let parentState = this.props.parentState;

    return (

      <div className={styles.container} style={{display: parentState.showSocial ? 'block' : 'none'}} onMouseEnter={() => this.props.test()}>
        <div className={styles.wrap}>
          <a className={classNames(styles.socialIcon, styles.facebook, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.google, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.pinterest, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.twitter, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
        </div>
      </div>

    )
  }
}
