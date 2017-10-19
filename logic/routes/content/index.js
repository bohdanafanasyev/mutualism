import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.css';

// Components
import Images from './components/images';
import IntroDescription from './descriptions/routes/intro'
import Slides from './slides'


//----------------------------------------------
// Slide Component
//----------------------------------------------

class Content extends React.Component {
  constructor(props) {
    super(props);

    // Component's State
    this.state = { breaker: false,
                   loaded: false,
                   animationTimer: {},
                   textfilter: false,
                   description: false,
                   slides: true };

    // Helpers' binding
    this.scrollRedirect = this.scrollRedirect.bind(this);
    this.manageContent = this.manageContent.bind(this);
    this.manageDescriptions = this.manageDescriptions.bind(this);
    this.manageSlides = this.manageSlides.bind(this);
  }



  //----------------------------------------------
  // On Mount Component Freeze
  //----------------------------------------------

  componentWillMount() {
    this.setState({ animationTimer: setTimeout(() => this.setState({ loaded: true }), 2000) })

    if (typeof this.props.location.state == 'object') {
      this.setState({ description: true })
    }
  }

  componentWillUnmount() {
    if (typeof this.state.animationTimer !== undefined) clearTimeout(this.state.animationTimer)
  }



  //----------------------------------------------
  // Description Visibility Helper
  //----------------------------------------------

  manageContent() {
    this.setState({ description: true, slides: false })
    // console.log(this.state.description)
  }

  nextDescription() {
    this.props.history.push({
      pathname: '/start',
      state: { description: true }
    });
  }



  //----------------------------------------------
  // Wheel Scroll Helpers
  //----------------------------------------------

  onWheel(e) {
    e.preventDefault();

    // Wheel Redirect for Slides
    if (this.state.loaded && !this.state.breaker) {
      this.scrollRedirect(e); }

    // Rewriting default behavior
    if (this.state.description) {
      window.scrollBy(e.deltaY, 0) }
  }

  scrollRedirect(e) {
    let path = this.props.location.pathname,
        goTo = (route) => { this.setState({ breaker: true }); this.props.history.push(route); }

    // Route response
    if (!this.state.breaker == !this.state.description) {
      if (e.deltaY < 0 && path == '/intro') goTo('/benefit');
      if (e.deltaY > 0 && path == '/benefit') goTo('/intro');
      if (e.deltaY < 0 && path == '/benefit') goTo('/people');
      if (e.deltaY > 0 && path == '/people') goTo('/benefit');
      if (e.deltaY < 0 && path == '/people') goTo('/start');
      if (e.deltaY > 0 && path == '/start') goTo('/people');
    }
  }

  manageDescriptions() {
    return this.state.description
  }

  manageSlides() {
    return this.state.slides
  }





  //----------------------
  // Render
  //----------------------

  render () {

    // Virables
    let path = this.props.location.pathname.slice(1),
        slide = this.props.slides[path],
        image = {
          upper: { backgroundImage: `url(${require(`./assets/${slide.imageUpper}.jpg`)})` },
          main: { backgroundImage: `url(${require(`./assets/${slide.imageMain}.jpg`)})` }
        };


    return (

        <div className={styles.container} ref="container" onWheel={(e) => this.onWheel(e)}>
          <Slides slide={slide} manageContent={this.manageContent} display={this.manageSlides} manageNumbersInDescriptions={this.props.manageNumbersInDescriptions}/>
          <IntroDescription display={this.manageDescriptions} />
          <Images image={image} />
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

export default connect(mapStateToProps)(Content);
