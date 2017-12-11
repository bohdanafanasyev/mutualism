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
  }


  //----------------------
  // Render
  //----------------------

  render() {

    // Variables
    const images = {
      pureview: require('./assets/pureview.png'),
      legislation: require('./assets/legislation.png'),
      footprint: require('./assets/footprint.png'),
      environment: require('./assets/environment.png')
    }


    return (

      <Wrap nextSlide={null} nextPart={'Live long'} nextRoute={'/intro'} header={'Start'}>

        <div className={styles.introduction}>
          <h2 className={styles.introductionHeader}>Selfsuficient & Independent</h2>
          <p className={styles.introductionText}>Seeks to minimize the negative environmental impact By efficiency and moderation in the use of materials, energy, and development space and the ecosystem at large. Sustainable architecture uses a conscious approach to energy and ecological conservation in the design of the built environment.
          <br /><br />
          The idea of sustainability, or ecological design, is to ensure that our actions and decisions today do not inhibit the opportunities of future generations..</p>
        </div>

        <div className={styles.contentBlock}>
          <img className={styles.vertical} src={images.pureview} />
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

        <div className={styles.contentBlock}>

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
            <img src={images.legislation} />
            <p className={styles.quote}>
              ‘’It took almost 17 years for Mike Raynolds, developer of eartships concept to prove the effectivity of his ideas to local authorities’’
            </p>
          </div>
        </div>


        <div className={styles.contentBlock}>

          <div className={styles.description}>
            <div className={styles.headers}>
              <h5 className={styles.mainHeader}>Environment</h5>
              <h6 className={styles.subHeader}>Landscape & Climate specificities</h6>
            </div>
            <p className={styles.text}>
              American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
            </p>
            <p className={styles.quote}>
              ‘’This brownfield reclaim project minimized disturbance to the site, as the previous excavations to remove an old Chevron pipeline left a scar on the bluff’’
            </p>
          </div>
          <img className={styles.square} src={images.environment} />
        </div>

        <div className={classNames(styles.contentBlock, styles.contentBlockColumn)}>

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
            <img className={styles.rectangular} src={images.footprint} />
            <p className={styles.quote}>
              ’’Built right into a Japanese forest—but despite all that indoor and outdoor space, the actual land the home takes up is much less than if this house were built traditionally’’
            </p>
          </div>
        </div>

      </Wrap>
    )
  }
}
