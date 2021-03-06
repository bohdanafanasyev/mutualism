import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';



//----------------------------------------------
// About Component
//----------------------------------------------

export default class About extends React.Component {

  constructor(props) {
    super(props)

    // Component's state
    this.state = { loaded: false }
  }



  //----------------------------------------------
  // Disable background scale until loaded
  //----------------------------------------------

  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), 1000);
  }


  //----------------------
  // Render
  //----------------------

  render () {

    // Background Image
    const background = { backgroundImage: `url(${require(`./assets/about.jpg`)})` }

    return (

      <div className={classNames(styles.container, this.props.fadeEnter ? styles.fadeContainer : styles.unclipContainer)} onWheel={(e) => e.preventDefault()}>
        <div className={classNames(this.props.fadeEnter ? styles.fadeBackground : null)}>
          <div className={classNames(styles.background, this.state.loaded ? styles.scaleBackground : null)} style={background} />
        </div>
        <div className={styles.backgroundFilter} />
        <div className={styles.wrap} >
          <div className={styles.headersWrap}>
            <p className={styles.backgroundHeader}>Mutualism</p>
            <p className={styles.contextHeader}>ABOUT</p>
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
