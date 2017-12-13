import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.css';

// Components
import Images from './components/images';
import LearnMore from './components/learnmore'



//----------------------------------------------
// Slide Component
//----------------------------------------------

class Slides extends React.Component {

  constructor(props) {
    super(props);

    // Component's State
    this.state = { breaker: false,
                   loaded: false,
                   textfilter: false,
                   fadeContent: false,
                   animationTimer: {} }


   //Helpers Binding
   this.manageContent = this.manageContent.bind(this);
  }



  //----------------------------------------------
  // On Mount Component temporary freeze
  //----------------------------------------------

  componentWillMount() {
    this.setState({ animationTimer: setTimeout(() => this.setState({ loaded: true }), 2000) })
  }

  componentWillUnmount() {
    if (typeof this.state.animationTimer !== undefined) clearTimeout(this.state.animationTimer)
  }


  //----------------------------------------------
  // On unMount Component Fade out Helper
  //----------------------------------------------

  manageContent() {
    this.setState({ fadeContent: true });
  }



  //----------------------------------------------
  // Wheel Scroll Helpers
  //----------------------------------------------

  onWheel(e) {
    e.preventDefault();

    // Wheel Redirect for Slides
    if (this.state.loaded && !this.state.breaker) {
      this.scrollRedirect(e); }
  }

  scrollRedirect(e) {
    let path = this.props.location.pathname,
        goTo = (route) => { this.setState({ breaker: true }); this.props.history.push(route); }

    // Route response
    if (!this.state.breaker) {
      if (e.deltaY > 0 && path == '/intro') goTo('/benefit');
      if (e.deltaY < 0 && path == '/intro') goTo('/start');

      if (e.deltaY > 0 && path == '/benefit') goTo('/people');
      if (e.deltaY < 0 && path == '/benefit') goTo('/intro');

      if (e.deltaY > 0 && path == '/people') goTo('/start');
      if (e.deltaY < 0 && path == '/people') goTo('/benefit');

      if (e.deltaY > 0 && path == '/start') goTo('/intro');
      if (e.deltaY < 0 && path == '/start') goTo('/people');
    }
  }



  //----------------------
  // Render
  //----------------------

  render () {

    // Virables
    let path = this.props.location.pathname.slice(1),
        slide = this.props.slides[path],
        images = {
          upper: { backgroundImage: `url(${require(`./assets/${slide.imageUpper}.jpg`)})` },
          main: { backgroundImage: `url(${require(`./assets/${slide.imageMain}.jpg`)})` }
        };




    return (

        <div className={classNames(styles.container, this.props.fadeEnter ? styles.unclipBottom : styles.unclipTop)} onWheel={(e) => this.onWheel(e)} ref="container">
          <div className={styles.wrap} onMouseEnter={() => this.setState({ textfilter: true })}>

          <div style={{opacity: this.state.fadeContent ? '0' : '1', transition: '.325s ease-out'}}>
              <div className={styles.headersWrap}>
                  <h1 className={styles.mainHeader}>{slide.header}</h1>
                  <h2 className={styles.subHeader}>{slide.subHeader}</h2>
              </div>
              <p className={styles.description}>{slide.description}</p>
              <LearnMore manageContent={this.manageContent} />
            </div>
          </div>

          <div className={styles.filter} style={{opacity: this.state.textfilter ? "1" : ".6"}} onMouseOver={() => this.setState({ textfilter: false })} />
          <Images images={images} fadeEnter={this.props.fadeEnter} bottomEnter={this.props.bottomEnter} fadeContent={this.state.fadeContent}/>
        </div>

    )
  }
}



//----------------------------------------------
// Redux Store
//----------------------------------------------

const mapStateToProps = (state) => ({
  slides: state.slides
});

export default connect(mapStateToProps)(Slides);
