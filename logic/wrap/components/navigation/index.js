import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.css';


// Components
import SocialIcons from '../socialicons';



//----------------------------------------------
// Header Component
//----------------------------------------------

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);

    // Component State
    this.state = { showSocial: false,
                   hideSocial: false,
                   hideShare: false,
                   descriptionRoute: () => this.props.outerProps.location.pathname.length < 9 ? true : false
                 };
  }



  //----------------------------------------------
  // Helper for socialIcons & autoRedirect
  //----------------------------------------------

  clearTimer(timer) { if (typeof timer !== undefined) clearTimeout(timer) }



  //----------------------
  // Render
  //----------------------

  render() {

    //----------------------
    // Social Share Icons
    //----------------------

    const socialIcons = {
      // Turn ON
      On: () => {
        this.setState({ hideShare: true, shareOverlow: false })
        setTimeout(() => {
          this.setState({ shareOverlow: true, showSocial: true })
        }, 800);
      },

      // Automated On
      selfOn: () => socialIcons.Timer = setTimeout(() => socialIcons.On(), 1000),

      // Turn OFF
      Off: () => {
        socialIcons.Timer = setTimeout(() => {
          this.setState({ hideSocial: true })
          setTimeout(() => { this.setState({ showSocial: false, hideSocial: false})
                              setTimeout(() => this.setState({ shareOverlow: false, hideShare: false }), 600)
                           }, 600)
        }, 2000)},

      // Timer
      Timer: {}
    }


    //----------------------
    // Auto Redirect
    //----------------------

    const autoRedirect = {
      // Navigate to About Page
      goAbout: () => {
        autoRedirect.timerAbout = setTimeout(() => {
          if (this.props.outerProps.location.pathname != '/about') this.props.outerProps.push('/about')
        }, 1000)},

      // Navigate to Contact Page
      goContact: () => {
        autoRedirect.timerContact = setTimeout(() => {
          if (this.props.outerProps.location.pathname != '/contact') this.props.outerProps.push('/contact')
        }, 1000)},

      // Timers
      timerAbout: {},
      timerContact: {}
    }


    // Variables
    let about = this.props.outerProps.location.pathname == '/about' ? true : false,
        contact = this.props.outerProps.location.pathname == '/contact' ? true : false;



    return (

      <div className={classNames(styles.container, this.state.descriptionRoute() ? null : styles.containerNoShare)}>

        <div className={styles.wrap}>
          <Link to='/about' onMouseEnter={() => autoRedirect.goAbout()} onMouseLeave={() => this.clearTimer(autoRedirect.timerAbout)} className={classNames(styles.button, about ? styles.active : "")} >ABOUT</Link>
          <Link to='/contact' onMouseEnter={() => autoRedirect.goContact()} onMouseLeave={() => this.clearTimer(autoRedirect.timerContact)} className={classNames(styles.button, contact ? styles.active : "")} >CONTACT</Link>

            <div className={styles.share} style={{display: this.state.descriptionRoute() ? 'block' : 'none'}}>
                <div onMouseEnter={() => this.clearTimer(socialIcons.Timer)} onMouseLeave={() => socialIcons.Off()} >
                  <SocialIcons parentState={this.state} />
                  <a onClick={() => socialIcons.On()}
                    onMouseEnter={() => socialIcons.selfOn()}
                    onMouseLeave={() => this.clearTimer(socialIcons.Timer)}
                    className={classNames(styles.buttonShare, this.state.hideShare ? styles.slideOutShare : styles.slideInShare)}>SHARE
                  </a>
                </div>
            </div>

        </div>
      </div>

    )
  }
}
