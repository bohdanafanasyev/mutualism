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
    this.state = { previousRoute: '/intro', style : { opacity: 0 }, display: true }

    // Helpers Bindings
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.transitionEnd = this.transitionEnd.bind(this)
  }


  //----------------------------------------------
  // On mount helpers
  //----------------------------------------------

  componentWillMount() {
    // Check if it's "social" page
    let pathname = this.props.location.pathname
    this.setState({ display: (pathname == '/about' || pathname == '/contact') ? true : false })

    // Filtering Store History for the last route
    function historyFilter(value) {
      if (value != "/about" && value != "/contact") return value; }

    let history = this.props.historyRecords.filter(historyFilter);
    history.length < 1 ? this.setState({ previousRoute: '/intro' }) : this.setState({ previousRoute: history[history.length - 1] })
  }


  //----------------------------------------------
  // On unMount fade out
  //----------------------------------------------

  componentWillReceiveProps(newProps) { //check for the visibility props
    if (!newProps.visibility)
      return this.unMountStyle() //call outro animation when visibility prop is false
    this.setState({ //remount the node when the visibility prop is true
      display: true
    })
    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  unMountStyle() { //css for unmount animation
    this.setState({
      style: { opacity: 0 }
    })
  }


  //----------------------------------------------
  // On Mount fade in
  //----------------------------------------------

  componentDidMount(){
    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  mountStyle() { // css for mount animation
    this.setState({
      style: { opacity: 1 }
    })
  }

  transitionEnd(){
    if (!this.props.visibility) { //remove the node on transition end when the visibility prop is false
      this.setState({
        display: false
      })
    }
  }


  //----------------------
  // Render
  //----------------------

  render() {

    let pathname = this.props.location.pathname,
        display = (pathname == '/about' || pathname == '/contact') ? true : false;

    return (

      this.state.display &&
      <div className={styles.container} onClick={() => this.props.history.push(this.state.previousRoute)} style={this.state.style} onTransitionEnd={this.transitionEnd}>
        <p className={styles.back}>Back</p>
        <p className={styles.toMain}>TO MAIN</p>
      </div>

    )
  }
}



//----------------------------------------------
// Redux Store & React Router
//----------------------------------------------

const mapStateToProps = (state) => ({ historyRecords: state.history });
export default withRouter(connect(mapStateToProps)(Back));
