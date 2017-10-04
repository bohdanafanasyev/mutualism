import React from 'react';
import classNames from 'classnames';
import styles from './styles/styles.css';

// Helpers
import Helpers from './Scripts/helpers';

// Components
import SocialIcons from '../../wrap/components/socialicons';


//----------------------------------------------
// Description's Wrap Component
//----------------------------------------------

export default class Wrap extends React.Component {

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
    Helpers.closePosition.call(null, this);
    Helpers.scrollBarWidth.call(null, this);
  }


  //----------------------------------------------------------
  // Subscribe to wheel events
  //----------------------------------------------------------

  componentDidMount() {
    console.log(this.props)
    // Reset scroll position on page refresh
    window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

    // Set up initial close position & reset scroll position
    window.scrollTo(0, 0)

    // Recalculate close & header positions on window resize
    window.addEventListener('resize', this.updateData);

    // Handle nextSlide button text content
    const checkRoute = () => { return this.props.location.pathname.slice(1, -12) == 'start' }
    //
    if (checkRoute()) this.setState({ startRoute: true});
    else if (!checkRoute() & this.state.startRoute == true) this.setState({ startRoute: false });
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
          images = {
            nextSlideImage: this.props.nextSlide,
            background: { backgroundImage: `url(${this.props.background})` }
          }


          return (

            <div className={styles.container} onWheel={this.onWheel} ref='container' >
              <div className={!this.state.scrollBarHighlighted ? styles.scrollBar : classNames(styles.scrollBar, styles.scrollBarActive)} style={scrollBarWidth} />

              <div onMouseEnter={this.closeVisibility} onMouseLeave={this.closeVisibility} className={styles.close} style={closePosition} onClick={()=> hashHistory.push(hashHistory.getCurrentLocation().pathname.slice(0, -12))} ref='close'>
                <a className={this.state.closeCross ? styles.closeCross : styles.closeLine}>&nbsp;</a>
              </div>

              <div className={styles.content} >

              </div>

              <div className={styles.nextSlide} ref='nextSlide'>
                <div className={styles.nextSlideContent} onClick={() => this.nextSlide()}>
                  <div className={styles.articleName}>{this.props.nextPart}
                  <p className={styles.nextPart}>{this.state.startRoute ? '& PROSPER' : 'NEXT PART'}</p></div>
                </div>

                <div className={styles.socialSocialIcons}>
                  <SocialIcons />
                </div>
              </div>

              <div className={styles.nextSlideImage} onClick={() => this.nextSlide()} ref="nextSlideImage">
                <img src={images.nextSlideImage} />
              </div>

              <div className={styles.background}>
                <div className={styles.backgroundImage} style={images.background} />
                <h2 className={styles.backgroundHeader} style={backgroundHeaderPosition}>{this.props.header}</h2>
              </div>
            </div>
          )
  }
}
