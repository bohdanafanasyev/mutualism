import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles/styles.css';
import Number from './components/number';



//----------------------------------------------
// Numbers Component
//----------------------------------------------

export default class Numbers extends React.Component {

  constructor(props) {
    super(props)

    // Component State
    this.state = { navigationLinks: false, linksAnimation: false, timerHide: {}, timerReveal: {}, display: true, style: { opacity: 0 } }

    // Helpers Binding
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.transitionEnd = this.transitionEnd.bind(this)
    this.linksReveal = this.linksReveal.bind(this);
    this.linksHide = this.linksHide.bind(this);

    this.manageNumbers = this.manageNumbers.bind(this)
  }


  //----------------------------------------------
  // Clear helpers on unmout
  //----------------------------------------------

  componentWillUnmount() {
    this.clearTimer(this.state.timerReveal);
    this.clearTimer(this.state.timerHide);
  }


  //----------------------------------------------
  // Links Helpers
  //----------------------------------------------

  linksReveal() {
      this.setState({
        timerReveal: setTimeout(() => this.setState({ navigationLinks: true, linksAnimation: true }), 625)
      })
  }

  linksHide() {
      this.setState({
        timerHide: setTimeout(() => {
          this.setState({ linksAnimation: false })
          setTimeout(() => this.setState({ navigationLinks: false }), 625);
        }, 2000)
      })
  }

  //----------------------------------------------
  // On UnMount fade out
  //----------------------------------------------

  componentWillReceiveProps(newProps) { //check for the visibility props
    if(!newProps.visibility)
      return this.unMountStyle() //call outro animation when visibility prop is false
    this.setState({ //remount the node when the visibility prop is true
      display: true
    })
    setTimeout(this.mountStyle, 10) //call the into animiation
    console.log(newProps)
  }

  unMountStyle() { //css for unmount animation
    this.setState({
      style: { opacity: 0 }
    })
  }



  //----------------------------------------------
  // On Mount fade in
  //----------------------------------------------

  componentDidMount(){
    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  mountStyle() { // css for mount animation
    this.setState({
      style: { opacity: 1 }
    })
  }

  transitionEnd(){
    if (!this.props.visibility) { //remove the node on transition end when the visibility prop is false
      this.setState({
        display: false
      })
    }
  }

  manageNumbers(a, b) {
    return a == b
  }

  //----------------------------------------------
  // Timeout Helper
  //----------------------------------------------

  clearTimer(timer) { if (typeof timer !== undefined) clearTimeout(timer) }


  // <TransitionGroup>
  //   <CSSTransition  classNames={styles} timeout={1000} key={this.props.location.key}>
  //     <Switch key={this.props.location.key}>
  //       <Route path='/intro'><Number slideNumber={this.props.slideNumber}/></Route>
  //       <Route path='/benefit'><Number slideNumber={this.props.slideNumber}/></Route>
  //       <Route path='/people'><Number slideNumber={this.props.slideNumber}/></Route>
  //       <Route path='/start'><Number slideNumber={this.props.slideNumber}/></Route>
  //     </Switch>
  //   </CSSTransition>
  // </TransitionGroup>



  //----------------------
  // Render
  //----------------------

  render () {

    return (

      this.state.display &&
      <div className={styles.navigation} onMouseEnter={() => this.clearTimer(this.state.timerHide)} onMouseLeave={() => this.linksHide()} style={this.state.style} onTransitionEnd={this.transitionEnd}>

        <div className={this.state.navigationLinks ? styles.navigationLinks : styles.navigationLinksHidden}>
          <Link className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)} to='/intro'>Introduction<span className={styles.number}>01</span></Link>
          <Link className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)} to='/benefit'>Benefit<span className={styles.number}>02</span></Link>
          <Link className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)} to='/people'>People<span className={styles.number}>03</span></Link>
          <Link className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)} to='/start'>Start<span className={styles.number}>04</span></Link>
        </div>

        <div className={styles.navigationPageNumber} onMouseEnter={() => this.linksReveal()} onMouseLeave={() => this.clearTimer(this.state.timerReveal)}>

          <Number slideNumber={this.props.slideNumber} />
          <Number slideNumber={this.props.slideNumber} />
          <Number slideNumber={this.props.slideNumber} />
          <Number slideNumber={this.props.slideNumber} />
          <span className={this.state.navigationLinks ? styles.allPagesActive : styles.allPages}>04</span>
        </div>
      </div>

    )
  }
}
