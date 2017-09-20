import React from 'react';
import styles from './styles.css';



//----------------------------------------------
// About Component
//----------------------------------------------

export default class About extends React.Component {

  constructor(props) {
    super(props)
  }


  //----------------------
  // Render
  //----------------------

  render () {

    // Background Image
    const background = { backgroundImage: `url(${require(`./assets/about.jpg`)})` }

    return (

      <div className={styles.container} >
        <div className={styles.background} style={background} />
        <div className={styles.wrap} >
        <div className={styles.headersWrap}>
            <div className={styles.backgroundHeaderWrap}>
              <p className={styles.backgroundHeader}>Mutualism</p>
            </div>
            <div className={styles.contextHeaderWrap}>
              <p className={styles.contextHeader}>ABOUT</p>
            </div>
          </div>
          <p className={styles.text}>Architecture is a system of complex relationships.
             Embodied within architecture are ideas concerning built, nature
             and how these two types of form interact to produce
             what we define as architecture.</p>
          <p className={styles.text}>Built form without natural form is building.
             Natural form without building is landscape.
             Mutualism is a process by which two seemingly opposite organisms
             interact in such a way as to benefit one another.
             It is through this approach that architecture can aspire
             to be more that just a building and evolve as a living organism</p>
         </div>

       </div>

    )
  }
}
