import React, { Component } from 'react';
import Wrap from '../..';
import styles from './styles/styles.css';
import classNames from 'classnames';



//----------------------------------------------
// Start's Description Component
//----------------------------------------------

export default class StartDescription extends Component {

  constructor(props) {
    super(props)

    // Component's State
    this.state = { Pureview: true,
                   Environment: false,
                   Legislation: false,
                   Footprint: false }


    // Helpers' binding
    this.elementsVisibility = this.elementsVisibility.bind(this);
  }



  //----------------------------------------------
  // Subscribing & Unsubscribing to scrolling
  //----------------------------------------------

  componentDidMount() {
    window.addEventListener("scroll", this.elementsVisibility, false) }

  componentDidUpdate() {
    if (this.state.ASUClinic && this.state.OneCentralPark) window.removeEventListener("scroll", this.elementsVisibility, false) }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.elementsVisibility, false) }



  //----------------------------------------------
  // Elements visibility helper
  //----------------------------------------------

  elementsVisibility() {
    const elements = ['Environment', 'Legislation', 'Footprint'],
          windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    elements.forEach((el) => {
      let bounds = this.refs[el].getBoundingClientRect(),
          visible = ((bounds.left + bounds.width / 2.6) <= windowWidth) && ((bounds.left + bounds.width) >= 0);
      if (visible) this.setState({ [el] : true  })
    })
  }



  //----------------------
  // Render
  //----------------------

  render() {

    // Variables
    const images = {
      pureview: { backgroundImage: `url(${require('./assets/pureview.png')})` },
      legislation: { backgroundImage: `url(${require('./assets/legislation.png')})` },
      footprint: { backgroundImage: `url(${require('./assets/footprint.png')})` },
      environment: { backgroundImage: `url(${require('./assets/environment.png')})` }
    }


    return (

      <div className={styles.container} ref='container'>
      <Wrap nextSlide={null} nextPart={'Live long'} nextRoute={'/intro'} header={'Start'}>

        <div className={styles.introduction}>
          <h2 className={styles.introductionHeader}>Build for the Future</h2>
          <p className={styles.introductionText}>Numerous passive architectural strategies have been developed over time. Examples of such strategies include the arrangement of rooms or the sizing and orientation of windows in a building, and the orientation of facades and streets or the ratio between building heights and street widths for urban planning.
          <br /><br />
          The idea of sustainability, or ecological design, is to ensure that our actions and decisions today do not inhibit the opportunities of future generations..</p>
        </div>


        <div className={classNames(styles.contentBlock, styles.firstChild, this.state.Pureview ? styles.contentBlockAnimate : null)} ref='Pureview'>
          <div className={styles.vertical} style={images.pureview} />
          <div className={styles.description}>
            <div className={styles.headers}>
              <h5 className={styles.mainHeader}>Pureview</h5>
              <h6 className={styles.subHeader}>Learn & Research</h6>
            </div>
            <p className={styles.text}>
              American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
            </p>
            <p className={styles.quote}>
              ‘’By surronding a main building with a greenhouse, will help to maintain warm temperaures inside, just using solar energy natural heat’’
            </p>
          </div>
        </div>


        <div className={classNames(styles.contentBlock, this.state.Legislation ? styles.contentBlockAnimate : null)} ref='Legislation'>
          <div className={classNames(styles.description, styles.descriptionNarrow)}>
            <div className={styles.headers}>
              <h5 className={styles.mainHeader}>Legislation</h5>
              <h6 className={styles.subHeader}>Local Regulations</h6>
            </div>
            <p className={styles.text}>
              American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
            </p>
          </div>

          <div className={styles.quotedImageColumn}>
            <div className={styles.rectangular} style={images.legislation} />
            <p className={styles.quote}>
              ‘’It took almost 17 years for Mike Raynolds, developer of eartships concept to prove the effectivity of his ideas to local authorities’’
            </p>
          </div>
        </div>


        <div className={classNames(styles.contentBlock, styles.contentBlockColumn, this.state.Environment ? styles.contentBlockAnimate : null)} ref='Environment'>
        <div className={styles.square} style={images.environment} />
          <div className={classNames(styles.description, styles.descriptionSquare)}>
            <div className={styles.headers}>
              <h5 className={styles.mainHeader}>Environment</h5>
              <h6 className={styles.subHeader}>Landscape & Climate</h6>
            </div>
            <p className={styles.text}>
              American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
            </p>
          </div>
          <p className={styles.quote}>
            ‘’This brownfield reclaim project minimized disturbance to the site, as the previous excavations to remove an old Chevron pipeline left a scar on the bluff’’
          </p>
        </div>


        <div className={classNames(styles.contentBlock, styles.contentBlockColumn, this.state.Footprint ? styles.contentBlockAnimate : null)} ref='Footprint'>
          <div className={classNames(styles.description, styles.descriptionWide)}>
            <div className={styles.headers}>
              <h5 className={styles.mainHeader}>Footprint</h5>
              <h6 className={styles.subHeader}>Look for the Ways</h6>
            </div>
            <p className={styles.text}>
              American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
            </p>
          </div>

          <div className={styles.quotedImageRow}>
            <div className={classNames(styles.rectangular, styles.rectangularReversed)} style={images.footprint} />
            <p className={styles.quote}>
              ’’Built right into a Japanese forest—but despite all that indoor and outdoor space, the actual land the home takes up is much less than if this house were built traditionally’’
            </p>
          </div>
        </div>

      </Wrap>
      </div>
    )
  }
}
