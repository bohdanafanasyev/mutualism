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
  }



  //----------------------
  // Render
  //----------------------

  render() {

    // Variables
    const images = {
      centralPark: require('./assets/central-park.png'),
      clinicSquare: require('./assets/clinic-square.png'),
      clinicRect: require('./assets/clinic-rect.png'),
      treeHouse: { backgroundImage: `url(${require('./assets/treehouse.png')})` }
    }


    return (

      <div className={styles.container}>
        <Wrap nextPart={'Benefit'} nextRoute={'/benefit/description'} header={'Intro'}>

          <div className={styles.introduction}>
            <h2 className={styles.introductionHeader}>Sustainable Architecture</h2>
            <p className={styles.introductionText}>Seeks to minimize the negative environmental impact By efficiency and moderation in the use of materials, energy, and development space and the ecosystem at large. Sustainable architecture uses a conscious approach to energy and ecological conservation in the design of the built environment.
            <br /><br />
            The idea of sustainability, or ecological design, is to ensure that our actions and decisions today do not inhibit the opportunities of future generations..</p>
          </div>

          <div className={classNames(styles.vertical, styles.contentBlock)}>
            <div className={styles.description}>
              <p className={styles.text}>A 124-feet-vertical tree house by Mithun studio functions as a treetop exhibition center for visitors to the surrounding West Virginia park.  The building is self-sufficient, and it is a showcase of sustainable generating its own heating, electricity and water. It was designed as the permanent home for the Jamboree.</p>
              <div className={styles.headers}>
                <h5 className={styles.companyHeader}>Mithun</h5>
                <h6 className={styles.projectHeader}>Sustainable Treehouse</h6>
                <span className={styles.underline} />
              </div>
            </div>
            <div className={styles.imageWrap}>
              <div className={styles.image} style={images.treeHouse} />
            </div>
          </div>

          <div className={classNames(styles.double, styles.contentBlock)}>
            <div className={styles.imageWrap}>
              <img src={images.clinicRect} />
              <img src={images.clinicSquare} />
            </div>
            <div className={styles.description}>
              <div>
                <h5 className={styles.companyHeader}>Lake | Flato</h5>
                <h6 className={styles.projectHeader}>ASU Clinic</h6>
                <span className={styles.underline} />
              </div>
              <p className={styles.text}>At Arizona State University, a sterile and unwelcoming health clinic was transformed into a verticallight-filled LEED-Platinum building. With chain sys- tem for water gathering, semi-private healing  gardens and massive
    overhangs to reduce hit gain.</p>
            </div>
          </div>

          <div className={classNames(styles.vertical, styles.contentBlock)} >
            <div className={styles.description}>
              <p className={styles.text}>One Central Park is an award winning mixed-use building located in Sydney, Australia in the suburb of Chippendale. Developed as a joint venture between Frasers Property and Sekisui House, it was constructed as the first stage of the Central Park urban renewal projectHeader.</p>
              <div>
                <h5 className={styles.companyHeader}>Jean Nouvel</h5>
                <h6 className={styles.projectHeader}>One Central Park</h6>
                <span className={styles.underline} />
              </div>
            </div>
            <div className={styles.imageWrap}  id='imageWrapper'>
              <img src={images.centralPark} id='image'/>
            </div>
          </div>

        </Wrap>
      </div>
    )
  }
}
