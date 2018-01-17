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
      redirectTrigger: false,
      filterTrigger: false,
      recolorBackground: false,
      fadeContent: false,

      nextSlideAnimateStep: 0,

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
    this.nextSlideAnimate = this.nextSlideAnimate.bind(this);
    this.nextSlideRedirectThrottler = this.nextSlideRedirectThrottler.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.updateData = this.updateData.bind(this);
    this.scrollBarWidth = this.scrollBarWidth.bind(this);
    this.manageClose = this.manageClose.bind(this);
  }



  //----------------------------------------------
  // On unMount Component Fade out Helper
  //----------------------------------------------

  manageClose() {
    // Navigate to parent slide
    this.props.history.push(this.props.history.location.pathname.slice(0, -12))

    // Fade out content
    this.setState({ fadeContent: true });
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

  nextSlideAnimate() {
    // Trigger Next Slide Unclipping
    this.setState({redirectTrigger: true });


    // If Start route redirect to About
    if (this.props.nextPart == 'Live long') this.props.history.push('/intro');
  }

  nextSlideRedirectThrottler() {
    this.setState({ nextSlideAnimateStep: this.state.nextSlideAnimateStep + 1});
  }

  nextSlideRedirect() {
    // Redirect to next description
    if (this.state.nextSlideAnimateStep == 2) {
      window.scroll({ left: 0, top: 0 })
      this.props.history.push(this.props.nextRoute); }
  }



  //----------------------------------------------------------
  // Change window position on wheel scroll & recalculate data
  //----------------------------------------------------------

  onWheel(e) {
    // Rewriting default behavior
    e.preventDefault();
    // window.scrollBy(e.deltaY / 1.6, 0);

    var i = 1;


    if (i == 1) {
      console.log('w')
      i = 2

    }

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
          imageName = this.props.nextPart.toLowerCase(),
          nextSlideImage = (imageName == 'live long') ? null : this.state.redirectTrigger ? { backgroundImage: `url(${require(`./assets/${this.props.nextPart.toLowerCase()}.jpg`)})` } :
                                                                                            { backgroundImage: `url(${require(`../slides/assets/${imageName  + 'Main'}.jpg`)})` },
          backgroundImage = { backgroundImage: `url(${require(`./assets/${this.props.header.toLowerCase()}.jpg`)})` }



          return (

            <div className={classNames(styles.container)} onWheel={this.onWheel} ref='container'>
              <div className={!this.state.scrollBarHighlighted ? styles.scrollBar : classNames(styles.scrollBar, styles.scrollBarActive)} style={scrollBarWidth} />

              <div onMouseEnter={this.closeVisibility} onMouseLeave={this.closeVisibility} className={styles.close} style={closePosition} ref='close' onClick={() => this.manageClose()}>
                <a className={this.state.closeCross ? styles.closeCross : styles.closeLine}>&nbsp;</a>
              </div>

              <div className={styles.content} style={{opacity: this.state.fadeContent ? '0' : '1', transition: '.325s ease-out'}}>
                { this.props.children }
              </div>

              <div className={styles.nextSlide} ref='nextSlide'>
                <div className={styles.nextSlideContent} onClick={() => this.nextSlideAnimate()} onMouseEnter={() => this.setState({ recolorBackground: true })} onMouseLeave={() => this.setState({ recolorBackground: false })}>
                  <p className={classNames(styles.articleName, this.state.animateTrigger ? styles.animateArticleName : null)}>{this.props.nextPart}</p>
                  <p className={classNames(styles.nextPart, this.state.animateTrigger ? styles.animateNextPart : null)}>{this.state.startRoute ? '& PROSPER' : 'NEXT PART'}</p>
                </div>

                <div className={styles.socialShare} style={{ opacity: this.state.animateTrigger ? '1' : '0' }}>
                  <SocialIcons parentState={{ showSocial: true }}  />
                </div>
              </div>

              <div style={{display: this.props.nextPart.toLowerCase() != 'live long' ? 'block' : 'none'}}>
                <div className={classNames(styles.imageShadow, this.state.animateTrigger ? styles.imageShadowAnimate : null)} />
                <div className={styles.nextSlideImageContainer} ref="nextSlideImage" onClick={() => this.nextSlideAnimate()} onMouseEnter={() => this.setState({ recolorBackground: true })} onMouseLeave={() => this.setState({ recolorBackground: false })} >
                  <div className={classNames(styles.nextSlideImageWrap, this.state.animateTrigger ? styles.nextSlideImageWrapClip : null, this.state.redirectTrigger ? styles.nextSlideImageWrapUnclip : null)} onAnimationStart={() => this.nextSlideRedirectThrottler()} onAnimationEnd={() => this.nextSlideRedirect()} >
                    <div style={nextSlideImage} className={classNames(styles.nextSlideImage, this.state.recolorBackground && !this.state.redirectTrigger ? styles.nextSlideImageMove : null, this.state.redirectTrigger ? styles.nextSlideImageBlur : null)} />
                    <div className={classNames(styles.imageFilter, this.state.recolorBackground ? null : styles.imageFilterHard)}  />
                  </div>
                </div>
              </div>

              <div className={styles.backgroundWrap}>
                <div style={backgroundImage} className={classNames(styles.backgroundImage, this.props.fadeEnter ? styles.fadeBackground : styles.fadeBackground)} />
                <div className={styles.backgroundFilter} />
                <div className={classNames(styles.backgroundFilterNormal, this.state.filterTrigger ? styles.backgroundFilterNormalAnimate : null)} />
                <div className={classNames(styles.backgroundFilterHard, this.state.recolorBackground ? styles.backgroundFilterHardAnimate : null)} />
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
