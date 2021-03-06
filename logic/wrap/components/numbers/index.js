import React from 'react'
import classNames from 'classnames'
import styles from './styles/styles.css'
import Number from './number'



//----------------------------------------------
// Numbers Component
//----------------------------------------------

export default class Numbers extends React.Component {

  constructor(props) {
    super(props)

    // Manage Number Component
    this.props.history.listen((location, action) => {
      this.manageNumber(location.pathname)
    })

    // Component State
    this.state = { navigationLinks: false, linksAnimation: false, timerHide: {}, timerReveal: {},
                   display: this.props.display, style: { opacity: 0 },
                   intro: false, benefit: false, people: false, start: false,
                   redirectThrottle: false }

    // Helpers Binding
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.transitionEnd = this.transitionEnd.bind(this)
    this.linksReveal = this.linksReveal.bind(this)
    this.linksHide = this.linksHide.bind(this)
    this.manageNumber = this.manageNumber.bind(this)
    this.changeSlide = this.changeSlide.bind(this)
  }



  //----------------------------------------------
  // Redirect Helper
  //----------------------------------------------

  changeSlide(path) {
    let currentRoute = this.props.location.pathname;

    if (!this.state.redirectThrottle && currentRoute != path) {
      this.props.history.push(path);
      setTimeout(() => this.setState({ redirectThrottle: false }), 1625);
    }

    // Ignore the interaction while slide changes
    if (this.state.redirectThrottle) return;
    this.setState({ redirectThrottle: true })
  }



  //----------------------------------------------
  // Manage State on mount
  //----------------------------------------------

  componentWillMount() {
    this.manageNumber(this.props.location.pathname);
  }

  manageNumber(pathname) {
    if (pathname == '/intro' || pathname == "/") this.setState({ intro: true, benefit: false, people: false, start: false })
    if (pathname == '/benefit') this.setState({ intro: false, benefit: true, people: false, start: false })
    if (pathname == '/people') this.setState({ intro: false, benefit: false, people: true, start: false })
    if (pathname == '/start') this.setState({ intro: false, benefit: false, people: false, start: true })
  }


  //----------------------------------------------
  // Clear helpers on unmout
  //----------------------------------------------

  componentWillUnmount() {
    this.clearTimer(this.state.timerReveal)
    this.clearTimer(this.state.timerHide)
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
          setTimeout(() => this.setState({ navigationLinks: false }), 805)
        }, 600)
      })
  }


  //----------------------------------------------
  // On UnMount fade out
  //----------------------------------------------

  componentWillReceiveProps(newProps) {
    if(!newProps.display) return this.unMountStyle()

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
    if (!this.props.display) this.setState({ display: false })
  }


  //----------------------------------------------
  // Timeout Helper
  //----------------------------------------------

  clearTimer(timer) {
    if (typeof timer !== undefined) clearTimeout(timer)
  }



  //----------------------
  // Render
  //----------------------

  render () {
    return (

      this.state.display &&
      <div className={styles.navigation} onMouseEnter={() => this.clearTimer(this.state.timerHide)} onMouseLeave={() => this.linksHide()} style={this.state.style} onTransitionEnd={this.transitionEnd}>

        <div className={this.state.navigationLinks ? styles.navigationLinks : styles.navigationLinksHidden}>
          <div onClick={()=> this.changeSlide('/intro')} className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)}>Introduction<span className={styles.number}>01</span></div>
          <div onClick={()=> this.changeSlide('/benefit')} className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)}>Benefit<span className={styles.number}>02</span></div>
          <div onClick={()=> this.changeSlide('/people')} className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)}>People<span className={styles.number}>03</span></div>
          <div onClick={()=> this.changeSlide('/start')} className={classNames(styles.navigationLink, this.state.linksAnimation ? styles.slideIn : styles.slideOut)}>Start<span className={styles.number}>04</span></div>
        </div>

        <div className={styles.navigationPageNumber} onMouseEnter={() => this.linksReveal()} onMouseLeave={() => this.clearTimer(this.state.timerReveal)}>
          <Number slideNumber={"1"} display={this.state.intro} />
          <Number slideNumber={"2"} display={this.state.benefit} />
          <Number slideNumber={"3"} display={this.state.people} />
          <Number slideNumber={"4"} display={this.state.start} />
          <span className={this.state.linksAnimation ? styles.allPagesActive : styles.allPages}>04</span>
        </div>
      </div>

    )
  }
}
