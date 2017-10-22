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
                   display: this.props.display(),
                   style : { opacity: 0 } }

                   // Helpers Bindings
                   this.mountStyle = this.mountStyle.bind(this)
                   this.unMountStyle = this.unMountStyle.bind(this)
                   this.transitionEnd = this.transitionEnd.bind(this)
                 }



   //----------------------------------------------
   // On unMount fade out
   //----------------------------------------------

   componentWillReceiveProps(newProps) {
     if (!newProps.display()) return this.unMountStyle()

     this.setState({ display: true })
     setTimeout(this.mountStyle, 10)
   }

   unMountStyle() {
     this.setState({ style: { opacity: 0 } })
   }


   //----------------------------------------------
   // On Mount fade in
   //----------------------------------------------

   componentDidMount(){
     setTimeout(this.mountStyle, 10)
   }

   mountStyle() {
     this.setState({ style: { opacity: 1 } })
   }

   transitionEnd() {
     if (!this.props.display()) this.setState({ display: false })
   }



  //----------------------
  // Render
  //----------------------

  render () {
    return (

      this.state.display &&
      <div className={styles.container} style={this.state.style} onTransitionEnd={this.transitionEnd}>
        <div className={styles.wrap} onMouseEnter={() => this.setState({ textfilter: true })}>
          <div className={styles.headersWrap}>
              <h1 className={styles.mainHeader}>{this.props.slide.header}</h1>
              <h2 className={styles.subHeader}>{this.props.slide.subHeader}</h2>
          </div>
          <p className={styles.description}>{this.props.slide.description}</p>
          <LearnMore manageContent={this.props.manageContent} />
        </div>
        <div className={classNames(styles.filter)} style={{opacity: this.state.textfilter ? "1" : null}} onMouseOver={() => this.setState({ textfilter: false })} />
      </div>

    )
  }
}
