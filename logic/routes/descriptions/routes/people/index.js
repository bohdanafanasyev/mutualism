import React, { Component } from 'react';
import Wrap from '../..';
import styles from './styles/styles.css';
import classNames from 'classnames';



//----------------------------------------------
// Benefit's Description Component
//----------------------------------------------

export default class IntroDescription extends Component {

  constructor(props) {
    super(props)

    // Component's State
    this.state = { William: true,
                   Ken: false,
                   Renzo: false,
                   Mike: false }


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
    const elements = ['Ken', 'Renzo', 'Mike'],
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
      william: { backgroundImage: `url(${require('./assets/william.png')})` },
      ken: { backgroundImage: `url(${require('./assets/ken.png')})` },
      renzo: { backgroundImage: `url(${require('./assets/renzo.png')})` },
      mike: { backgroundImage: `url(${require('./assets/mike.png')})` },
      nextSlide: require('../../../slides/assets/startMain.jpg')
    }



    return (

      <Wrap nextSlide={images.nextSlide} nextPart={'Start'} nextRoute={'/start/description'} header={'People'}>

        <div className={styles.introduction}>
          <h2 className={styles.introductionHeader}>Sustainable Architecture</h2>
          <p className={styles.introductionText}>Seeks to minimize the negative environmental impact By efficiency and moderation in the use of materials, energy, and development space and the ecosystem at large. Sustainable architecture uses a conscious approach to energy and ecological conservation in the design of the built environment.
          <br /><br />
          The idea of sustainability, or ecological design, is to ensure that our actions and decisions today do not inhibit the opportunities of future generations..</p>
        </div>

        <div className={classNames(styles.contentBlock, styles.firstChild, this.state.William ? styles.contentBlockAnimate : null)} ref='William'>
          <div className={styles.william} style={images.william} />
          <div className={styles.headers}>
            <h5 className={styles.surname}>McDonough</h5>
            <h6 className={styles.name}>William</h6>
            <span className={styles.underline} />
          </div>
          <p className={styles.text}>
            American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
          </p>
        </div>


        <div className={classNames(styles.contentBlock, this.state.Ken ? styles.contentBlockAnimate : null)} ref='Ken'>
          <div className={styles.ken} style={images.ken} />
          <div className={styles.headers}>
            <h5 className={styles.surname}>Yeang</h5>
            <h6 className={styles.name}>Ken</h6>
            <span className={styles.underlineReversed} />
          </div>
          <p className={styles.text}>
            Ken Yeang, born  in 1948, is a Malaysian architect, ecologist and author known for his signature ecoarchitecture and ecomasterplans. Yeang is an early pioneer of ecology-based green design and master-planning,  carrying out design and research in this field since 1971. He was named by the Guardian as "one of the 50 people who could save the planet".
          </p>
        </div>


        <div className={classNames(styles.contentBlock, this.state.Renzo ? styles.contentBlockAnimate : null)} ref='Renzo'>
          <div className={styles.renzo} style={images.renzo} />
          <div className={classNames(styles.headers, styles.headersReversed)}>
            <h5 className={styles.surname}>Piano</h5>
            <h6 className={styles.name}>Renzo</h6>
            <span className={styles.underline} />
          </div>
          <p className={styles.text}>
            Renzo Piano, born 14 pn September 1937 is an Italian architect and engineer, who won the Pritzker Architecture Prize in 1998. In 2006, Piano was selected by TIME as one of the 100 most influential people in the world. He was selected as the 10th most influential person in the "Arts and Entertainment" category of the 2006 Time 100.
          </p>
        </div>


        <div className={classNames(styles.contentBlock, this.state.Mike ? styles.contentBlockAnimate : null)} ref='Mike'>
          <div className={styles.mike} style={images.mike} />
          <div className={classNames(styles.headers, styles.headersReversed)}>
            <h5 className={styles.surname}>Reynolds</h5>
            <h6 className={styles.name}>Mike</h6>
            <span className={styles.underlineReversed} />
          </div>
          <p className={styles.text}>
            American architect based in New Mexico, known for the design and construction of "earthship" passive solar houses. He is a proponent of "radically sustainable living". He has been a critic of the profession of architecture for reusing unconventional building materials from waste.
          </p>
        </div>

      </Wrap>
    )
  }
}
