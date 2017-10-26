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



  //----------------------
  // Render
  //----------------------

  render () {

    return (

      <div className={styles.learnMoreWrap}>
        <div className={styles.learnMore} onClick={() => this.props.history.push(this.props.history.location.pathname + '/description') }>
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
