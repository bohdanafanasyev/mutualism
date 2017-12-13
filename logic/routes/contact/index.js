import React from 'react';
import classNames from 'classnames';
import styles from './styles/styles.css';



//----------------------------------------------
// Contact Component
//----------------------------------------------

export default class Contact extends React.Component {

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
    const background = { backgroundImage: `url(${require(`./assets/contact.jpg`)})` };

    return (

      <div className={classNames(styles.container, this.props.fadeEnter ? styles.fadeContainer : styles.unclipContainer)} onWheel={(e) => e.preventDefault()}>
        <div className={classNames(this.props.fadeEnter ? styles.fadeBackground : null)}>
        <div className={classNames(styles.background, this.state.loaded ? styles.scaleBackground : null)} style={background} />
        </div>
        <div className={styles.wrap}>
          <div className={styles.emailForm}>
            <div className={styles.headersWrap}>
              <p className={styles.backgroundHeader}>Email</p>
              <p className={styles.contextHeader}>CONTACT</p>
            </div>
            <input type='text' className={classNames(styles.input, styles.inputMargin)} placeholder="Please provide your email" />
            <input type='email' className={styles.input} placeholder="How can we reference to you" />
            <textarea type='text' className={classNames(styles.input, styles.inputTall)} placeholder="Your message"></textarea>
            <div className={styles.sendWrap}>
              <a className={styles.button}>SEND</a>
              <span className={styles.pointerLine}></span>
            </div>
          </div>

          <div className={styles.networks}>
            <div className={styles.headersWrap}>
              <p className={styles.backgroundHeader}>Social</p>
              <p className={styles.contextHeader}>NETWORKS</p>
            </div>
            <div className={styles.socialLinks}>
              <a className={styles.socialLink}><span className={classNames(styles.socialIcon, styles.twitter)}></span><p className={styles.linkText}>Twitter</p></a>
              <a className={styles.socialLink}><span className={classNames(styles.socialIcon, styles.facebook)}></span><p className={styles.linkText}>Facebook</p></a>
              <a className={styles.socialLink}><span className={classNames(styles.socialIcon, styles.pinterest)}></span><p className={styles.linkText}>Pinterest</p></a>
              <a className={styles.socialLink}><span className={classNames(styles.socialIcon, styles.google)}></span><p className={styles.linkText}>Google</p></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
