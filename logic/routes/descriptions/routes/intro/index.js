import React, { Component } from 'react';
import Wrap from '../..';
import styles from './styles/styles.css';
import classNames from 'classnames';



//----------------------------------------------
// Intro's Description Component
//----------------------------------------------

export default class IntroDescription extends Component {

  constructor(props) {
    super(props)

    // Component's State
    this.state = { Mithun: true,
                   ASUClinic: false,
                   OneCentralPark: false }


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
    const elements = ['ASUClinic', 'OneCentralPark'],
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
      centralPark: { backgroundImage: `url(${require('./assets/central-park.png')})` },
      clinicSquare: { backgroundImage: `url(${require('./assets/clinic-square.png')})` },
      clinicRect: { backgroundImage: `url(${require('./assets/clinic-rect.png')})` },
      treeHouse: { backgroundImage: `url(${require('./assets/treehouse.png')})` }
    }


    return (

      <div className={styles.container}>
        <Wrap nextPart={'Benefit'} nextRoute={'/benefit/description'} header={'Intro'} ref='test'>

          <div className={styles.introduction}>
            <h2 className={styles.introductionHeader}>Sustainable Architecture</h2>
            <p className={styles.introductionText}>Seeks to minimize the negative environmental impact By efficiency and moderation in the use of materials, energy, and development space and the ecosystem at large. Sustainable architecture uses a conscious approach to energy and ecological conservation in the design of the built environment.
            <br /><br />
            The idea of sustainability, or ecological design, is to ensure that our actions and decisions today do not inhibit the opportunities of future generations..</p>
          </div>

          <div className={classNames(styles.vertical, styles.contentBlock, styles.firstChild)} ref='Mithun'>
            <div className={classNames(styles.description, this.state.Mithun ? styles.descriptionAnimate : null)}>
              <p className={styles.text}>A 124-feet-vertical tree house by Mithun studio functions as a treetop exhibition center for visitors to the surrounding West Virginia park.  The building is self-sufficient, and it is a showcase of sustainable generating its own heating, electricity and water. It was designed as the permanent home for the Jamboree.</p>
              <div className={styles.headers}>
                <h5 className={styles.companyHeader}>Mithun</h5>
                <h6 className={styles.projectHeader}>Sustainable Treehouse</h6>
                <span className={styles.underline} />
              </div>
            </div>
            <div className={classNames(styles.imageWrap, this.state.Mithun ? styles.imageWrapAnimate : null)}>
              <div className={styles.image} style={images.treeHouse} />
            </div>
          </div>

          <div className={classNames(styles.double, styles.contentBlock)} ref='ASUClinic'>
            <div className={classNames(styles.imageWrap, this.state.ASUClinic ? styles.imageWrapAnimate : null)}>
              <div className={styles.image} style={images.clinicRect} />
              <div className={styles.image} style={images.clinicSquare} />
            </div>
            <div className={classNames(styles.description, this.state.ASUClinic ? styles.descriptionAnimate : null)}>
              <div>
                <h5 className={styles.companyHeader}>Lake | Flato</h5>
                <h6 className={styles.projectHeader}>ASU Clinic</h6>
                <span className={styles.underlineLeft} />
              </div>
              <p className={styles.text}>At Arizona State University, a sterile and unwelcoming health clinic was transformed into a verticallight-filled LEED-Platinum building. With chain sys- tem for water gathering, semi-private healing  gardens and massive
    overhangs to reduce hit gain.</p>
            </div>
          </div>

          <div className={classNames(styles.vertical, styles.contentBlock)} ref='OneCentralPark'>
            <div className={classNames(styles.description, this.state.OneCentralPark ? styles.descriptionAnimate : null)}>
              <p className={styles.text}>One Central Park is an award winning mixed-use building located in Sydney, Australia in the suburb of Chippendale. Developed as a joint venture between Frasers Property and Sekisui House, it was constructed as the first stage of the Central Park urban renewal projectHeader.</p>
              <div>
                <h5 className={styles.companyHeader}>Jean Nouvel</h5>
                <h6 className={styles.projectHeader}>One Central Park</h6>
                <span className={styles.underline} />
              </div>
            </div>
            <div className={classNames(styles.imageWrap, this.state.OneCentralPark ? styles.imageWrapAnimate : null)}>
              <div className={styles.image} style={images.centralPark} />
            </div>
          </div>

        </Wrap>
      </div>
    )
  }
}
