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
  // Helpers
  //----------------------------------------------

  socialIconsAutoOff() {
    if (typeof this.props.socialIconsOff == 'function')  this.setState({ timerOff: setTimeout(() => this.props.socialIconsOff(), 2000) }) }

  socialIconsOff() {
    if (typeof this.props.socialIconsOff == 'function') this.props.socialIconsOff(); }

  clearTimer(timer) {
    if (typeof this.props.clearTimer == 'function') this.props.clearTimer(timer); }



  //----------------------
  // Render
  //----------------------

  render () {

    let parentState = this.props.parentState;

    return (

      <div className={styles.container} style={{display: parentState.showSocial ? 'block' : 'none'}}
           onMouseLeave={() => this.socialIconsOff()}
           onMouseEnter={() => {this.clearTimer(parentState.timerOff); this.clearTimer(this.state.timerOff)}}>

        <div className={styles.wrap}>
          <a className={classNames(styles.socialIcon, styles.facebook, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.google, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.pinterest, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
          <a className={classNames(styles.socialIcon, styles.twitter, parentState.hideSocial ? styles.fadeOut : styles.fadeIn )}>&nbsp;</a>
        </div>

        <div className={styles.autoOffLever} onAnimationStart={() => this.socialIconsAutoOff()}></div>
      </div>

    )
  }
}
