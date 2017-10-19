import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.css';

// Components
import LearnMore from './components/learnmore';


//----------------------------------------------
// Slides Component
//----------------------------------------------

export default class Slides extends React.Component {
  constructor(props) {
    super(props);

    // Component's State
    this.state = { breaker: false,
                   loaded: false,
                   animationTimer: {},
                   textfilter: false,
                   display: this.props.display };
  }



  //----------------------------------------------
  // On Mount Component Freeze
  //----------------------------------------------

  componentWillMount() {
    // this.setState({ animationTimer: setTimeout(() => this.setState({ loaded: true }), 2000) })
    //
    // if (typeof this.props.location.state == 'object') {
    //   this.setState({ description: true })
    // }
  }

  componentWillUnmount() {
    // if (typeof this.state.animationTimer !== undefined) clearTimeout(this.state.animationTimer)
  }



  //----------------------
  // Render
  //----------------------

  render () {
    return (

      <div className={styles.container}>
        <div className={styles.wrap} onMouseEnter={() => this.setState({ textfilter: true })}>
          <div className={styles.headersWrap}>
              <h1 className={styles.mainHeader}>{this.props.slide.header}</h1>
              <h2 className={styles.subHeader}>{this.props.slide.subHeader}</h2>
          </div>
          <p className={styles.description}>{this.props.slide.description}</p>
          <LearnMore showDescription={this.props.showDescription} />
        </div>
        <div className={classNames(styles.filter)} style={{opacity: this.state.textfilter ? "1" : null}} onMouseOver={() => this.setState({ textfilter: false })} />
      </div>

    )
  }
}