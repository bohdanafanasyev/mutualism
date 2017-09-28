import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles/styles.css';



//----------------------------------------------
// Numbers Component
//----------------------------------------------

export default class Numbers extends React.Component {

  constructor(props) {
    super(props)

    const slidesRoutes = ["/intro", "/benefits", "/people", "/start"]

    // Component State
    this.state = { navigationLinks: false, linksVisibility: false, currentFade: false, currentSlide: true,
                   slideRoute: () => slidesRoutes.includes(this.props.history.location) }
  }


  //----------------------------------------------
  // Manage Curret Page Animation Cycles
  //----------------------------------------------

  componentDidMount() {
    setTimeout(() => this.setState({ currentSlide: false }), 650)

    this.props.history.listen(location => {
      this.setState({ currentFade: true });
      setTimeout(() => this.setState({ currentFade: false }), 650)
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


    //----------------------
    // Links Animation
    //----------------------

    const visible = {
      // Turn OFF
      Off: () => {
        visible.Timer = setTimeout(() => {
          this.setState({ linksVisibility: false })
          setTimeout(() => this.setState({ navigationLinks: false }), 625);
        }, 2000)
      },

      // Timer
      Timer: {}
    }


    //----------------------
    // Helpers
    //----------------------

    const linksReveal = () => setTimeout(() => this.setState({ navigationLinks: true, linksVisibility: true }), 625)


    return (

      <div className={styles.navigation} onMouseEnter={() => this.clearTimer(visible.Timer)} onMouseLeave={() => visible.Off()} style={{display: this.props.slideNumber > 0 ? 'block' : 'none'}}>

        <div className={this.state.navigationLinks ? styles.navigationLinks : styles.navigationLinksHidden}>
            <Link className={classNames(styles.navigationLink, this.state.linksVisibility ? styles.slideIn : styles.slideOut)} to='/intro'>Introduction<span className={styles.number}>01</span></Link>
            <Link className={classNames(styles.navigationLink, this.state.linksVisibility ? styles.slideIn : styles.slideOut)} to='/benefit'>Benefit<span className={styles.number}>02</span></Link>
            <Link className={classNames(styles.navigationLink, this.state.linksVisibility ? styles.slideIn : styles.slideOut)} to='/people'>People<span className={styles.number}>03</span></Link>
            <Link className={classNames(styles.navigationLink, this.state.linksVisibility ? styles.slideIn : styles.slideOut)} to='/start'>Start<span className={styles.number}>04</span></Link>
        </div>

        <div className={styles.navigationPageNumber} onMouseEnter={() => linksReveal()}>
            <span ref="currentPage" className={classNames(styles.currentPage, this.state.currentFade ? styles.currentFade : null, this.state.currentSlide ? styles.currentSlide : null)}>{this.props.slideNumber}</span>
            <span className={this.state.navigationLinks ? styles.allPagesActive : styles.allPages}>04</span>
        </div>
      </div>

    )
  }
}
