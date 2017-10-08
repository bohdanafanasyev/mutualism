import React, { Component } from 'react';
import Wrap from '../../wrap/wrap';
import styles from './styles/styles.css';
import classNames from 'classnames';


//----------------------------------------------
// Benefit's Description Component
//----------------------------------------------

export default class IntroDescription extends Component {

  constructor(props) {
    super(props)
  }


  //----------------------
  // Render
  //----------------------

  render() {

    // Variables
    const images = {
      william: { backgroundImage: `url(${require('./assets/william.png')})` },
      ken: { backgroundImage: `url(${require('./assets/ken.png')})` },
      renzo: { backgroundImage: `url(${require('./assets/renzo.png')})` },
      mike: { backgroundImage: `url(${require('./assets/mike.png')})` },
      background: require('./assets/background.png'),
      nextSlide: require('./assets/next.png')
    }


    return (

      <Wrap nextSlide={images.nextSlide} background={images.background} nextPart={'Start'} nextRoute={'/start/description'} headers={'People'}>

        <div className={styles.introduction}>
          <h2 className={styles.introductionheaders}>Sustainable Architecture</h2>
          <p className={styles.introductionText}>Seeks to minimize the negative environmental impact By efficiency and moderation in the use of materials, energy, and development space and the ecosystem at large. Sustainable architecture uses a conscious approach to energy and ecological conservation in the design of the built environment.
          <br /><br />
          The idea of sustainability, or ecological design, is to ensure that our actions and decisions today do not inhibit the opportunities of future generations..</p>
        </div>

        <div className={styles.contentBlock}>
          <div className={styles.vertical} style={images.william} />
          <div className={styles.headers}>
            <h5 className={styles.surname}>McDonough</h5>
            <h6 className={styles.name}>William</h6>
            <span className={styles.underline} />
          </div>
          <p className={styles.text}>
            American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
          </p>
        </div>

        <div className={styles.contentBlock}>
          <div className={styles.square} style={images.ken} />
          <div className={styles.headers}>
            <h5 className={styles.surname}>Yeang</h5>
            <h6 className={styles.name}>Ken</h6>
            <span className={styles.underline} />
          </div>
          <p className={styles.text}>
            Ken Yeang, born  in 1948, is a Malaysian architect, ecologist and author known for his signature ecoarchitecture and ecomasterplans. Yeang is an early pioneer of ecology-based green design and master-planning,  carrying out design and research in this field since 1971. He was named by the Guardian as "one of the 50 people who could save the planet".
          </p>
        </div>

        <div className={styles.contentBlock}>
          <div className={styles.squareReversed} style={images.renzo} />
          <div className={classNames(styles.headers, styles.headersReversed)}>
            <h5 className={styles.surname}>Piano</h5>
            <h6 className={styles.name}>Renzo</h6>
            <span className={styles.underline} />
          </div>
          <p className={styles.text}>
            Renzo Piano, born 14 pn September 1937 is an Italian architect and engineer, who won the Pritzker Architecture Prize in 1998. In 2006, Piano was selected by TIME as one of the 100 most influential people in the world. He was selected as the 10th most influential person in the "Arts and Entertainment" category of the 2006 Time 100.
          </p>
        </div>

        <div className={styles.contentBlock}>
          <div className={styles.verticalReversed} style={images.mike} />
          <div className={classNames(styles.headers, styles.headersReversed)}>
            <h5 className={styles.surname}>Reynolds</h5>
            <h6 className={styles.name}>Mike</h6>
            <span className={styles.underline} />
          </div>
          <p className={styles.text}>
            American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
          </p>
        </div>

      </Wrap>
    )
  }
}
