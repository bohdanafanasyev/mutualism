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
    this.state = { previousRoute: '/intro',
                   display: this.props.display,
                   style : { opacity: 0 } }

    // Helpers Bindings
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.transitionEnd = this.transitionEnd.bind(this)
  }



  //----------------------------------------------
  // On mount helpers
  //----------------------------------------------

  componentWillMount() {
    // Filtering Store History for the last route
    function historyFilter(value) {
      if (value != "/about" && value != "/contact") return value; }

    let history = this.props.historyRecords.filter(historyFilter);
    history.length < 1 ? null : this.setState({ previousRoute: history[history.length - 1] })
  }


  //----------------------------------------------
  // On unMount fade out
  //----------------------------------------------

  componentWillReceiveProps(newProps) {
    if (!newProps.display) return this.unMountStyle()

    this.setState({ display: true })
    setTimeout(this.mountStyle, 10)
  }

  unMountStyle() {
    this.setState({ style: { opacity: 0 } })
  }


  //----------------------------------------------
  // On Mount fade in
  //----------------------------------------------

  componentDidMount(){
    setTimeout(this.mountStyle, 10)
  }

  mountStyle() {
    this.setState({ style: { opacity: 1 } }) }

  transitionEnd() {
    if (!this.props.display) this.setState({ display: false }) }



  //----------------------
  // Render
  //----------------------

  render() {
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
