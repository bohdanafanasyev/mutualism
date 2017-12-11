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

    // Component's State
    this.state = { loaded: false}
  }



  //----------------------------------------------
  // Disabled until partly loaded
  //----------------------------------------------

  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), 2175)
  }


  //----------------------------------------------
  // onCick Helper
  //----------------------------------------------

  completeTask() {
    this.props.manageContent();
    this.props.history.push(this.props.history.location.pathname + '/description')
  }



  //----------------------
  // Render
  //----------------------

  render () {

    return (

      <div className={styles.learnMoreWrap} style={{pointerEvents: this.state.loaded ? 'auto' : 'none'}}>
        <div className={styles.learnMore} onClick={() => this.completeTask()}>
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
