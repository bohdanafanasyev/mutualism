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
    this.state = { navigationLinks: false, linksVisibility: false,
                   slideRoute: () => slidesRoutes.includes(this.props.location) }
  }


  //----------------------------------------------
  // Timeout Helper
  //----------------------------------------------

  clearTimer(timer) { if (typeof timer !== undefined) clearTimeout(timer) }

  componentDidMount() {
    // console.log(this.state.slideRoute())
    // console.log(this.props)
  }


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
          setTimeout(() => this.setState({ navigationLinks: false }), 700);
        }, 2000)
      },

      // Timer
      Timer: {}
    }


    //----------------------
    // Helpers
    //----------------------

    const linksReveal = () => setTimeout(() => this.setState({ navigationLinks: true, linksVisibility: true }), 400)


    return (

      <div className={styles.navigation} onMouseEnter={() => this.clearTimer(visible.Timer)} onMouseLeave={() => visible.Off()} style={{display: this.props.slideNumber > 0 ? 'block' : 'none'}}>

        <div className={this.state.navigationLinks ? styles.navigationLinks : styles.navigationLinksHidden}>
          <div className={styles.navigationLinkWrap}>
            <Link className={classNames(styles.navigationLink, this.state.linksVisibility ? styles.slideIn : styles.slideOut)} to='/intro'>Introduction<span className={styles.number}>01</span></Link>
          </div>
          <div className={styles.navigationLinkWrap}>
            <Link className={classNames(styles.navigationLink, this.state.linksVisibility ? styles.slideIn : styles.slideOut)} to='/benefit'>Benefit<span className={styles.number}>02</span></Link>
          </div>
          <div className={styles.navigationLinkWrap}>
            <Link className={classNames(styles.navigationLink, this.state.linksVisibility ? styles.slideIn : styles.slideOut)} to='/people'>People<span className={styles.number}>03</span></Link>
          </div>
          <div className={styles.navigationLinkWrap}>
            <Link className={classNames(styles.navigationLink, this.state.linksVisibility ? styles.slideIn : styles.slideOut)} to='/start'>Start<span className={styles.number}>04</span></Link>
          </div>
        </div>

        <div className={styles.navigationPageNumber} onMouseEnter={() => linksReveal()}>
          <div className={styles.navigationPageNumberWrap}>
            <span className={styles.currentPage}>{this.props.slideNumber}</span>
            <span className={this.state.navigationLinks ? styles.allPagesActive : styles.allPages}>04</span>
          </div>
        </div>
      </div>

    )
  }
}
