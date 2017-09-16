import React  from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import styles from './styles.css';


//----------------------------------------------
// Learn More Component
//----------------------------------------------

class LearnMore extends React.Component {

  constructor(props) {
    super(props)
  }


  //----------------------------------------------
  // Subscribing to mousewheel events
  //----------------------------------------------

  componentDidMount() {
    this.refs.learnMoreWrap.addEventListener('click', () => {
      this.props.history.push(this.props.parentProps.location.pathname.slice(1) + '/description');
    })
  }


  //----------------------------------------------
  // Un-Subscribing to mousewheel events
  //----------------------------------------------

  componentWillUnmount() {
    this.refs.learnMoreWrap.removeEventListener('click', () => {
      this.props.history.push(this.props.parentProps.location.pathname.slice(1) + '/description');
    });
  }


  //----------------------
  // Render
  //----------------------

  render () {

    return (

      <div className={styles.learnMoreWrap} ref="learnMoreWrap" >
        <div className={styles.learnMore}>
          <div className={styles.learnWrap}>
            <p href='#' className={styles.learn}>Learn</p><br />
          </div>
          <div className={styles.moreWrap}>
            <p className={styles.more}>MORE</p>
          </div>
        </div>
        <span className={styles.pointerLine}></span>
      </div>

    )
  }
}



//----------------------------------------------
// React Router
//----------------------------------------------

export default withRouter(LearnMore);
