import React from 'react';
import classNames from 'classnames';
import styles from './styles/styles.css';


//----------------------------------------------
// Contact Component
//----------------------------------------------

// Background Image
const background = { backgroundImage: `url(${require(`./assets/contact.png`)})` };

const Contact = () => (
  <div className={styles.container} style={background}>
    <div className={styles.wrap}>
      <div className={styles.emailForm}>
        <div className={styles.headersWrap}>
          <div className={styles.backgroundHeaderWrap}>
            <p className={styles.backgroundHeader}>Email</p>
          </div>
          <div className={styles.contextHeaderWrap}>
            <p className={styles.contextHeader}>CONTACT</p>
          </div>
        </div>
        <div className={styles.inputWrap}><input type='text' className={classNames(styles.input, styles.inputMargin)} placeholder="Please provide your email" /></div>
        <div className={styles.inputWrap}><input type='email' className={styles.input} placeholder="How can we reference to you" /></div>
        <div className={styles.inputWrap}><textarea type='text' className={classNames(styles.input, styles.inputTall)} placeholder="Your message"></textarea></div>
        <div className={styles.sendButton}>
          <span className={styles.pointerLine}></span>
          <div className={styles.buttonWrap}>
            <a className={styles.button}>SEND</a>
          </div>
        </div>
      </div>

      <div className={styles.networks}>
        <div className={styles.headersWrap}>
          <div className={styles.backgroundHeaderWrap}>
            <p className={styles.backgroundHeader}>Social</p>
          </div>
          <div className={styles.contextHeaderWrap}>
            <p className={styles.contextHeader}>NETWORKS</p>
          </div>
        </div>
        <div className={styles.socialLinks}>
          <a className={styles.socialLink}><span className={classNames(styles.socialIcon, styles.twitter)}></span><div className={styles.linkWrap}><p className={styles.linkText}>Twitter</p></div></a>
          <a className={styles.socialLink}><span className={classNames(styles.socialIcon, styles.facebook)}></span><div className={styles.linkWrap}><p className={styles.linkText}>Facebook</p></div></a>
          <a className={styles.socialLink}><span className={classNames(styles.socialIcon, styles.pinterest)}></span><div className={styles.linkWrap}><p className={styles.linkText}>Pinterest</p></div></a>
          <a className={styles.socialLink}><span className={classNames(styles.socialIcon, styles.google)}></span><div className={styles.linkWrap}><p className={styles.linkText}>Google</p></div></a>
        </div>
      </div>
    </div>
  </div>
)


export default Contact;
