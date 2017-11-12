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
  }



  //----------------------
  // Render
  //----------------------

  render() {

    // Variables
    const nextSlide = require('./assets/next.png');


    return (

      <Wrap nextSlide={nextSlide} nextPart={'People'} nextRoute={'/people/description'} header={'Benefit'} fadeEnter={this.props.fadeEnter} sideEnter={this.props.sideEnter}>

        <div className={styles.introduction}>
          <h2 className={styles.introductionHeader}>Selfsuficient & Independent</h2>
          <p className={styles.introductionText}>Seeks to minimize the negative environmental impact By efficiency and moderation in the use of materials, energy, and development space and the ecosystem at large. Sustainable architecture uses a conscious approach to energy and ecological conservation in the design of the built environment.
          <br /><br />
          The idea of sustainability, or ecological design, is to ensure that our actions and decisions today do not inhibit the opportunities of future generations..</p>
        </div>

        <div className={classNames(styles.high, styles.contentBlock)}>
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

        <div className={classNames(styles.high, styles.contentBlock)}>
          <div className={styles.headline}>
            <span className={styles.numeration}>2.</span>
            <h4 className={styles.header}>Environment</h4>
          </div>
          <p className={styles.text}>
            The environmental benefits of green architecture are significant. Green buildings promote and protect ecosystems and biodiversity, improve the quality of air and water, reduce solid waste and conserve natural resources. According to the USGBC, when compared with a conventionally-constructed commercial building, green buildings use 26 percent less energy, cost 13 percent less to maintain, have 27 percent higher occupant satisfaction and produce 33 percent less greenhouse gas emissions.
          </p>
        </div>

        <div className={classNames(styles.high, styles.contentBlock)}>
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
    )
  }
}
