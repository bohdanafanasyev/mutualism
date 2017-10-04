import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';



//----------------------------------------------
// Social Icons Component
//----------------------------------------------

export default class SocialIcons extends React.Component {

  constructor(props) {
    super(props)

    // Component State
    this.state = { timerOff: {} }

    // Helpers Bindings
    this.socialIconsAutoOff = this.socialIconsAutoOff.bind(this);
  }


  //----------------------------------------------
  // Helper for Auto Turn Off
  //----------------------------------------------

  socialIconsAutoOff() {
    this.setState({ timerOff: setTimeout(() => this.props.socialIconsOff(), 6000) })
  }



  //----------------------
  // Render
  //----------------------

  render () {

    let parentState = this.props.parentState,
        socialIconsOff = this.props.socialIconsOff,
        clearTimer = this.props.clearTimer;

    return (

      <div className={styles.container} style={{display: parentState.showSocial ? 'block' : 'none'}}
           onMouseLeave={() => socialIconsOff()}
           onMouseEnter={() => {clearTimer(parentState.timerOff); clearTimer(this.state.timerOff)}}>

        <div className={styles.wrap}>
          <a className={classNames(styles.socialIcon, styles.facebook, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.google, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.pinterest, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.twitter, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
        </div>

        <div className={styles.dummy} onAnimationStart={() => this.socialIconsAutoOff()}></div>

      </div>

    )
  }
}
