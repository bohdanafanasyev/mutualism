import React from 'react';
import classNames from 'classnames';
import styles from './styles/styles.css';
import { withRouter } from 'react-router-dom';


// Helpers
import Helpers from './Scripts/helpers';

// Components
import SocialIcons from '../../wrap/components/socialicons';



//----------------------------------------------
// Description's Wrap Component
//----------------------------------------------

class Wrap extends React.Component {

  constructor(props) {
    super(props);

    // Component's State
    this.state = {
      animateTrigger: false,

      backgroundHeaderPosition: 1,
      startRoute: false,

      scrollBarPercents: 0,
      scrollBarHighlighted: false,
      scrollBarTimer: false,

      closeCross: false,
      closePosition: 79 }

    // Helpers' binding
    this.closeVisibility = this.closeVisibility.bind(this);
    this.closePosition = this.closePosition.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.updateData = this.updateData.bind(this);
    this.scrollBarWidth = this.scrollBarWidth.bind(this);
    this.scrollBarWidth = this.scrollBarWidth.bind(this);
  }



  //----------------------------------------------------------
  // Close Button
  //----------------------------------------------------------

  closeVisibility() {
    if (this.state.closeCross) this.setState({ closeCross: false });
    else if (!this.state.closeCross) this.setState({ closeCross: true }); }

  closePosition() {
    Helpers.closePosition.call(false, this); }


  //----------------------------------------------------------
  // Scroll Bar
  //----------------------------------------------------------

  scrollBarHighlight() {
    if (!this.state.scrollBarHighlighted) {
      this.setState({ scrollBarHighlighted: true });

    } else if (this.state.scrollBarHighlighted & !this.state.scrollBarTimer) {
      this.setState({
        scrollBarTimer: setTimeout(() => this.setState({ scrollBarHighlighted: false, scrollBarTimer: false }), 400)
      });
    }
  }

  scrollBarWidth() {
    Helpers.scrollBarWidth.call(false, this); }


  //----------------------------------------------------------
  // Dynamicly handle background header position
  //----------------------------------------------------------

  backgroundHeaderPosition(e) {
    Helpers.backgroundHeaderPosition.call(false, e, this); }


  //----------------------------------------------------------
  // Navigate to subsequent slide
  //----------------------------------------------------------

  nextSlide() {
    this.props.history.push(this.props.nextRoute);
  }



  //----------------------------------------------------------
  // Change window position on wheel scroll & recalculate data
  //----------------------------------------------------------

  onWheel(e) {
    // Rewriting default behavior
    e.preventDefault();
    window.scrollBy(e.deltaY, 0);

    // Depending methods
    this.scrollBarWidth();
    this.scrollBarHighlight();
    this.closePosition();
    this.backgroundHeaderPosition(e);
  }

  updateData() {
    Helpers.closePosition.call(false, this);
    Helpers.scrollBarWidth.call(false, this);
  }



  //----------------------------------------------------------
  // Subscribe to wheel events
  //----------------------------------------------------------

  componentDidMount() {
    // Reset scroll position on page refresh
    window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

    // Set up initial close position & reset scroll position
    window.scrollTo(0, 0)

    // Recalculate close & header positions on window resize
    window.addEventListener('resize', this.updateData);

    // Handle nextSlide button text content
    const checkRoute = location.href.indexOf('start')
    //
    if (checkRoute > 1) this.setState({ startRoute: true});
    else if (checkRoute < 0 & this.state.startRoute == true) this.setState({ startRoute: false });
  }


  //----------------------------------------------------------
  // Un-Subscribe from wheel events
  //----------------------------------------------------------

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateData);

    // Clear highlighted scroll bar effect clearing
    if (this.state.scrollBarTimer != false) {
      clearTimeout(this.state.scrollBarTimer)
      this.setState({ scrollBarHighlighted: false, scrollBarTimer: false })}
  }



  //----------------------
  // Render
  //----------------------

  render() {

    const closePosition = { right: this.state.closePosition },
          backgroundHeaderPosition = { marginLeft: this.state.backgroundHeaderPosition + '%'},
          scrollBarWidth = { width: this.state.scrollBarPercents + '%'},
          backgroundImage = require(`./assets/${this.props.header.toLowerCase()}.jpg`),
          nextSlideImage = this.props.nextSlide



          return (

            <div className={classNames(styles.container, this.props.fadeEnter ? styles.fadeContainer : styles.sideContainer)} onWheel={this.onWheel} ref='container'>
              <div className={!this.state.scrollBarHighlighted ? styles.scrollBar : classNames(styles.scrollBar, styles.scrollBarActive)} style={scrollBarWidth} />

              <div onMouseEnter={this.closeVisibility} onMouseLeave={this.closeVisibility} className={styles.close} style={closePosition} ref='close' onClick={() => this.props.history.push(this.props.history.location.pathname.slice(0, -12))}>
                <a className={this.state.closeCross ? styles.closeCross : styles.closeLine}>&nbsp;</a>
              </div>

              <div className={styles.content} >
                { this.props.children }
              </div>

              <div className={styles.nextSlide} ref='nextSlide'>
                <div className={styles.nextSlideContent} onClick={() => this.nextSlide()}>
                  <p className={classNames(styles.articleName, this.state.animateTrigger ? styles.animateArticleName : false)}>{this.props.nextPart}</p>
                  <p className={classNames(styles.nextPart, this.state.animateTrigger ? styles.animateNextPart : false)}>{this.state.startRoute ? '& PROSPER' : 'NEXT PART'}</p>
                </div>

                <div className={styles.socialShare} style={{ opacity: this.state.animateTrigger ? '1' : '0' }}>
                  <SocialIcons parentState={{ showSocial: true }}  />
                </div>
              </div>

              <div className={classNames(styles.nextSlideImage, this.state.animateTrigger ? styles.nextSlideImageAnimate : false)} onClick={() => this.nextSlide()} ref="nextSlideImage">
                <img src={nextSlideImage} />
              </div>

              <div className={classNames(styles.imageShadow, this.state.animateTrigger ? styles.imageShadowAnimate : false)} />

              <div className={styles.backgroundWrap}>
                <img src={backgroundImage} className={styles.backgroundImage}/>
                <div className={styles.backgroundFilter} />
                <h2 className={styles.backgroundHeader} style={backgroundHeaderPosition}>{this.props.header}</h2>

              </div>
            </div>
          )
  }
}


//----------------------------------------------
// Export
//----------------------------------------------

export default withRouter(Wrap);
