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
                   shareThrottle: false,
                   timerOn: {},
                   timerOff: {},
                   descriptionRoute: () => this.props.outerProps.location.pathname.length < 9 ? true : false
                 };

    // Helpers Bindings
    this.socialIconsOn = this.socialIconsOn.bind(this);
    this.socialIconsAutoOn = this.socialIconsAutoOn.bind(this);
    this.socialIconsOff = this.socialIconsOff.bind(this);
  }



  //----------------------------------------------
  // Helper for socialIcons & autoRedirect
  //----------------------------------------------

  clearTimer(timer) { if (typeof timer !== undefined) clearTimeout(timer) }


  //----------------------------------------------
  // Helpers for socialIcons
  //----------------------------------------------

  socialIconsOn() {
    this.setState({ hideShare: true })
    setTimeout(() => {
      this.setState({ showSocial: true })
    }, 800);
  }

  socialIconsAutoOn() {
    this.setState({ timerOn: setTimeout(() => this.socialIconsOn(), 1000) })
  }

  socialIconsOff() {
    this.setState({ timerOff: setTimeout(() => {
                               this.setState({ hideSocial: true });
                               setTimeout(() => {
                                 this.setState({ showSocial: false, hideSocial: false, shareThrottle: true })
                                    setTimeout(() => {
                                      this.setState({ hideShare: false })
                                        setTimeout(() => this.setState({ shareThrottle: false }), 625)
                                      }, 600)
                                    }, 600)
                               }, 2000)
                            })

  }



  //----------------------
  // Render
  //----------------------

  render() {

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

      <div className={classNames(styles.container, this.state.descriptionRoute() ? null : styles.containerNoShare)} >

        <div className={styles.wrap}>
          <Link to='/about' onMouseEnter={() => autoRedirect.goAbout()} onMouseLeave={() => this.clearTimer(autoRedirect.timerAbout)} className={classNames(styles.button, about ? styles.active : "")} >ABOUT</Link>
          <Link to='/contact' onMouseEnter={() => autoRedirect.goContact()} onMouseLeave={() => this.clearTimer(autoRedirect.timerContact)} className={classNames(styles.button, contact ? styles.active : "")} >CONTACT</Link>

          <div className={styles.share} style={{display: this.state.descriptionRoute() ? 'inline-block' : 'none', pointerEvents: this.state.shareThrottle ? 'none' : 'all'}}
            onMouseEnter={() => this.clearTimer(this.state.timerOn)}>
            <SocialIcons parentState={this.state} clearTimer={this.clearTimer} socialIconsOff={this.socialIconsOff}  />
            <a onClick={() => this.socialIconsOn()}
              onMouseEnter={() => this.socialIconsAutoOn()}
              onMouseLeave={() => this.clearTimer(this.state.timerOn)}
              className={classNames(styles.buttonShare, this.state.hideShare ? styles.slideOutShare : styles.slideInShare)}>SHARE
            </a>
          </div>

        </div>
      </div>

    )
  }
}
