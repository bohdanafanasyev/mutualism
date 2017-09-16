import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles.css';

// Components
import Images from './components/images';
import LearnMore from './components/learnmore';



//----------------------------------------------
// Slide Component
//----------------------------------------------

class Slides extends React.Component {
  constructor(props) {
    super(props);

    // State
    this.state = { breaker: false, loaded: false };

    // Change after animation end
    setTimeout(() => this.setState({ loaded: true }), 2000);

    // Helpers' binding
    this.scrollRedirect = this.scrollRedirect.bind(this);
  }


  //----------------------------------------------
  // Wheel Scroll Helper
  //----------------------------------------------

  scrollRedirect(e) {

    let path = this.props.location.pathname;
    let goTo = (route) => { this.setState({ breaker: true }); this.props.history.push(route); }

    // Route response
    if (!this.state.breaker) {
      if (e.deltaY < 0 && path == '/intro') goTo('/benefit');
      if (e.deltaY > 0 && path == '/benefit') goTo('/intro');
      if (e.deltaY < 0 && path == '/benefit') goTo('/people');
      if (e.deltaY > 0 && path == '/people') goTo('/benefit');
      if (e.deltaY < 0 && path == '/people') goTo('/start');
      if (e.deltaY > 0 && path == '/start') goTo('/people');
    }
  }


  //----------------------
  // Render
  //----------------------

  render () {

    // Virables
    let path = this.props.location.pathname.slice(1),
          slide = this.props.slides[path],
          image = {
            left: { backgroundImage: `url(${require(`./assets/jpg/${slide.imageLeft}.jpg`)})` },
            right: { backgroundImage: `url(${require(`./assets/jpg/${slide.imageRight}.jpg`)})` }
          };


    return (

      <div className={styles.container} ref="container" onWheel={(e) => (this.state.loaded && !this.state.breaker) ? this.scrollRedirect(e) : null }>
        <div className={styles.wrap}>
          <div className={styles.headersWrap}>
            <div className={styles.mainHeaderWrap}>
              <h1 className={styles.mainHeader}>{slide.header}</h1>
            </div>
            <div className={styles.subHeaderWrap}>
              <h2 className={styles.subHeader}>{slide.subHeader}</h2>
            </div>
          </div>
          <p className={styles.description}>{slide.description}</p>
          <LearnMore parentProps={this.props} />
        </div>
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

export default connect(mapStateToProps)(Slides);
