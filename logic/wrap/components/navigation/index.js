import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';

// Components
import SocialIcons from '../socialicons';



//----------------------------------------------
// Navigation Component
//----------------------------------------------

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);

    // Component State
    this.state = { initialLoad: true,
                   showSocial: false,
                   hideSocial: false,
                   hideShare: false,
                   removeShare: false,
                   shareThrottle: false,
                   redirectThrottle: false,
                   timerOn: {},
                   timerOff: {},
                   timerAbout: {},
                   timerContact: {}
                 };

    // Manage container on rounte change
    this.props.history.listen((location, action) => {
      this.manageContainer(location)
    });

    // Helpers Bindings
    this.socialIconsOn = this.socialIconsOn.bind(this);
    this.socialIconsAutoOn = this.socialIconsAutoOn.bind(this);
    this.socialIconsOff = this.socialIconsOff.bind(this);
    this.changeSlide = this.changeSlide.bind(this);
    this.autoRedirect = this.autoRedirect.bind(this);
    this.manageContainer = this.manageContainer.bind(this);
  }


  //----------------------------------------------
  // Manage container on initial load
  //----------------------------------------------

  componentWillMount() {
    let location = this.props.history.location;

    // Backup for initial load on description route
    if (location.pathname.indexOf('d') > 0 && this.state.initialLoad) return this.setState({ hideShare: true, removeShare: true })

    // Morph container depending on loaded route
    this.manageContainer(location)
  }



  //----------------------------------------------
  // Morph container for description routes
  //----------------------------------------------

  manageContainer(location) {
    if (location.pathname.indexOf('d') > 0) {
      this.setState({ hideShare: true, hideSocial: true })
      setTimeout(() => this.setState({ removeShare: true, showSocial: false }), 625)
    }
    else this.setState({ removeShare: false, hideShare: false });
  }




  //----------------------------------------------
  // Redirect Helpers
  //----------------------------------------------

  changeSlide(path) {
    if (!this.state.redirectThrottle) {
      this.props.history.push(path);
      setTimeout(() => this.setState({ redirectThrottle: false }), 1625);
    }

    // Ignore the interaction while slide changes
    if (this.state.redirectThrottle) return;
    this.setState({ redirectThrottle: true })
  }

  autoRedirect() {
    let currentRoute = this.props.history.location.pathname;

    if (currentRoute == '/about') this.setState({ timerContact: setTimeout(() => this.changeSlide('/contact'), 1000) })
    if (currentRoute == '/contact') this.setState({ timerAbout: setTimeout(() => this.changeSlide('/about'), 1000) })
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
                                      }, 220)
                                    }, 600)
                               }, 2000)
                            })

  }


  //----------------------
  // Render
  //----------------------

  render() {

    // Button underline state
    let about = this.props.history.location.pathname == '/about' ? true : false,
        contact = this.props.history.location.pathname == '/contact' ? true : false;



    return (

      <div className={classNames(styles.container, this.state.removeShare ? styles.containerNoShare : null)} >

        <div className={styles.wrap}>
          <div onClick={() => this.changeSlide('/about')} onMouseEnter={() => this.autoRedirect()} onMouseLeave={() => this.clearTimer(this.state.timerAbout)} className={classNames(styles.button, about ? styles.active : null)}>ABOUT</div>
          <div onClick={() => this.changeSlide('/contact')} onMouseEnter={() => this.autoRedirect()} onMouseLeave={() => this.clearTimer(this.state.timerContact)} className={classNames(styles.button, contact ? styles.active : null)}>CONTACT</div>

          <div className={styles.share} style={{display: this.state.removeShare ? 'none' : 'inline-block', pointerEvents: this.state.shareThrottle ? 'none' : 'all'}}
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
