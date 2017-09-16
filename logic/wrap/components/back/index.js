import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './styles.css';


//----------------------------------------------
// Back Component
//----------------------------------------------

class Back extends React.Component {

  constructor(props) {
    super(props);

    // Component State
    // let pathname = this.props.location.pathname
    this.state = { previousRoute: '/intro' }
    // this.state = { previousRoute: '/intro', display: (pathname == '/about' || pathname == '/contact') ? true : false }
  }


  //----------------------------------------------
  // On mount helpers
  //----------------------------------------------

  componentWillMount() {
    // Check if it's "social" page
    // let pathname = this.props.location.pathname
    // this.setState({ display: (pathname == '/about' || pathname == '/contact') ? true : false })

    // Filtering Store History for the last route
    function historyFilter(value) {
      if (value != "/about" && value != "/contact") return value; }

    let history = this.props.historyRecords.filter(historyFilter);
    history.length < 1 ? this.setState({ previousRoute: '/intro' }) : this.setState({ previousRoute: history[history.length - 1] })
  }


  //----------------------
  // Render
  //----------------------

  render() {

    let pathname = this.props.location.pathname,
        display = (pathname == '/about' || pathname == '/contact') ? true : false


    return (

      <div className={styles.container} onClick={() => this.props.history.push(this.state.previousRoute)} style={{display: display ? 'block' : 'none'}}>
        <div className={styles.backWrap}><p className={styles.back}>Back</p></div>
        <div className={styles.toMainWrap}><p className={styles.toMain}>TO MAIN</p></div>
      </div>

    )
  }
}



//----------------------------------------------
// Redux Store & React Router
//----------------------------------------------

const mapStateToProps = (state) => ({ historyRecords: state.history });
export default withRouter(connect(mapStateToProps)(Back));
