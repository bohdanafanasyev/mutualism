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
  // Subscribing to onClick navigation
  //----------------------------------------------

  componentDidMount() {
    this.refs.learnMoreWrap.addEventListener('click', () => {
      this.props.history.push(this.props.history.location.pathname + '/description');
    })
  }


  //----------------------------------------------
  // Un-Subscribing to onClick navigation
  //----------------------------------------------

  componentWillUnmount() {
    this.refs.learnMoreWrap.removeEventListener('click', () => {
      this.props.history.push(this.props.history.location.pathname + '/description');
    });
  }


  //----------------------
  // Render
  //----------------------

  render () {

    return (

      <div className={styles.learnMoreWrap} ref="learnMoreWrap" >
        <div className={styles.learnMore}>
            <p href='#' className={styles.learn}>Learn</p><br />
            <p className={styles.more}>MORE</p>
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
