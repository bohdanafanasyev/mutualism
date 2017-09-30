import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
    this.state = { navigationLinks: false, linksAnimation: false, timerHide: {}, timerReveal: {} }


    // Helpers Binding
    this.linksReveal = this.linksReveal.bind(this);
    this.linksHide = this.linksHide.bind(this);
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
  // Timeout Helper
  //----------------------------------------------

  clearTimer(timer) { if (typeof timer !== undefined) clearTimeout(timer) }



  //----------------------
  // Render
  //----------------------

  render () {

    return (

      <div className={styles.navigation} onMouseEnter={() => this.clearTimer(this.state.timerHide)} onMouseLeave={() => this.linksHide()} style={{display: this.props.slideNumber > 0 ? 'block' : 'none'}}>

        <div className={this.state.navigationLinks ? styles.navigationLinks : styles.navigationLinksHidden}>
          <Link className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)} to='/intro'>Introduction<span className={styles.number}>01</span></Link>
          <Link className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)} to='/benefit'>Benefit<span className={styles.number}>02</span></Link>
          <Link className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)} to='/people'>People<span className={styles.number}>03</span></Link>
          <Link className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)} to='/start'>Start<span className={styles.number}>04</span></Link>
        </div>

        <div className={styles.navigationPageNumber} onMouseEnter={() => this.linksReveal()} onMouseLeave={() => this.clearTimer(this.state.timerReveal)}>
          <TransitionGroup>
            <CSSTransition  classNames={styles} timeout={1000} key={this.props.location.key}>
              <Switch key={this.props.location.key}>
                <Route path='/intro'><Number slideNumber={this.props.slideNumber}/></Route>
                <Route path='/benefit'><Number slideNumber={this.props.slideNumber}/></Route>
                <Route path='/people'><Number slideNumber={this.props.slideNumber}/></Route>
                <Route path='/start'><Number slideNumber={this.props.slideNumber}/></Route>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <span className={this.state.navigationLinks ? styles.allPagesActive : styles.allPages}>04</span>
        </div>
      </div>

    )
  }
}
