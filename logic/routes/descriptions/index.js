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
  }


  //----------------------------------------------------------
  // Close Button
  //----------------------------------------------------------

  closeVisibility() {
    if (this.state.closeCross) this.setState({ closeCross: false });
    else if (!this.state.closeCross) this.setState({ closeCross: true }); }

  closePosition() {
    Helpers.closePosition.call(null, this); }


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
    Helpers.scrollBarWidth.call(null, this); }


  //----------------------------------------------------------
  // Dynamicly handle background header position
  //----------------------------------------------------------

  backgroundHeaderPosition(e) {
    Helpers.backgroundHeaderPosition.call(null, e, this); }


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
    // Depending methods
    this.scrollBarWidth();
    this.scrollBarHighlight();
    this.closePosition();
    this.backgroundHeaderPosition(e);
  }

  updateData() {
    Helpers.closePosition.call(null, this);
    Helpers.scrollBarWidth.call(null, this);
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
      console.log(this.props)
  }

  // <div className={styles.socialSocialIcons}>
  //   <SocialIcons />
  // </div>

  //----------------------
  // Render
  //----------------------

  render() {

    const closePosition = { right: this.state.closePosition },
          backgroundHeaderPosition = { marginLeft: this.state.backgroundHeaderPosition + '%'},
          scrollBarWidth = { width: this.state.scrollBarPercents + '%'},
          nextSlideImage = this.props.nextSlide;


          return (

            <div className={styles.container} onWheel={this.onWheel} ref='container'>
              <div className={!this.state.scrollBarHighlighted ? styles.scrollBar : classNames(styles.scrollBar, styles.scrollBarActive)} style={scrollBarWidth} />

              <div onMouseEnter={this.closeVisibility} onMouseLeave={this.closeVisibility} className={styles.close} style={closePosition} onClick={()=> this.props.manageContent(false, true)} ref='close'>
                <a className={this.state.closeCross ? styles.closeCross : styles.closeLine}>&nbsp;</a>
              </div>

              <div className={styles.content} >
                { this.props.children }
              </div>

              <div className={styles.nextSlide} ref='nextSlide'>
                <div className={styles.nextSlideContent} onClick={() => this.nextSlide()}>
                  <div className={styles.articleName}>{this.props.nextPart}
                  <p className={styles.nextPart}>{this.state.startRoute ? '& PROSPER' : 'NEXT PART'}</p></div>
                </div>

                <div className={styles.socialShare}>
                  <SocialIcons parentState={{ showSocial: true }} />
                </div>
              </div>

              <div className={styles.nextSlideImage} onClick={() => this.nextSlide()} ref="nextSlideImage">
                <img src={nextSlideImage} />
              </div>

              <div className={styles.background}>
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