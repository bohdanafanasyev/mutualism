import React, { Component } from 'react';
import Wrap from '../..';
import styles from './styles/styles.css';
import classNames from 'classnames';



//----------------------------------------------
// Benefit's Description Component
//----------------------------------------------

export default class BenefitDescription extends Component {

  constructor(props) {
    super(props)

    // Component's State
    this.state = { Resources: true,
                   Environment: false,
                   Health: false }


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
    const elements = ['Environment', 'Health'],
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
    const nextSlide = require('../../../slides/assets/peopleMain.jpg')


    return (

      <div className={styles.container} onWheel={this.onWheel} ref='container'>
      <Wrap nextSlide={nextSlide} nextPart={'People'} nextRoute={'/people/description'} header={'Benefit'}>

        <div className={styles.introduction}>
          <h2 className={styles.introductionHeader}>Selfsuficient & Independent</h2>
          <p className={styles.introductionText}>Sustainable building requires that architects, engineers and contractors all co-create with the environment focusing on renewable energy, sustainable materials, water conservation, site development and indoor environmental quality. Green design and construction not only helps cut down on emissions released into the ozone.
          <br /><br />
          The benefits of sustainable building can be generally categorized in the following ways; environmental benefits, economic benefits and social benefits...</p>
        </div>



        <div className={classNames(styles.contentBlock, styles.firstChild, this.state.Resources ? styles.contentBlockAnimate : null)} ref='Resources'>
          <div className={styles.headline}>
            <span className={styles.numeration}>1.</span>
            <h4 className={styles.header}>Resources</h4>
          </div>
          <p className={styles.text}>
            Plenty of economic benefits stem from sustainable building, including reduced operating costs, increased asset value and profits, higher employee satisfaction and productivity, and a greater likelihood of eventually selling the building, according to EcoWorld.com.
            <br /><br />
            With substantially reduced utility bills, operating costs will be lower, and owners more quickly recover money invested in construction. They also will continue to reap savings.
          </p>
        </div>

        <div className={classNames(styles.contentBlock, this.state.Environment ? styles.contentBlockAnimate : null)} ref='Environment'>
          <div className={styles.headline}>
            <span className={styles.numeration}>2.</span>
            <h4 className={styles.header}>Environment</h4>
          </div>
          <p className={styles.text}>
            The environmental benefits of green architecture are significant. Green buildings promote and protect ecosystems and biodiversity, improve the quality of air and water, reduce solid waste and conserve natural resources. According to the USGBC, when compared with a conventionally-constructed commercial building, green buildings use 26 percent less energy, cost 13 percent less to maintain, have 27 percent higher occupant satisfaction and produce 33 percent less greenhouse gas emissions.
          </p>
        </div>

        <div className={classNames(styles.contentBlock, this.state.Health ? styles.contentBlockAnimate : null)} ref='Health'>
          <div className={styles.headline}>
            <span className={styles.numeration}>3.</span>
            <h4 className={styles.header}>Health & Unity</h4>
          </div>
          <p className={styles.text}>
            According to the USGBC, the health and community benefits of eco-friendly buildings include improved indoor air quality, temperature regulation and acoustics; optimal occupant comfort and health; a reduced burden on local infrastructure; and a higher overall quality of life.
            <br /><br />
            A 2000 study published by William J. Fisk, a staff scientist at the Lawrence Berkeley National Laboratory, in the "Annual Review of Environment and Resources" said there is significant evidence that design elements of buildings and indoor environments affect the occurrence of communicable respiratory illness, allergy and asthma symptoms
          </p>
        </div>

      </Wrap>
      </div>
    )
  }
}
