import React from 'react';
import styles from '../styles/styles.css';


//----------------------------------------------
// Numbers Component
//----------------------------------------------

export default class Number extends React.Component {

  constructor(props) {
    super(props)

    // Component State
    this.state = { style: { transform: "translateY(0)" }, display: true }

    // Helpers Binding
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.transitionEnd = this.transitionEnd.bind(this)
  }

  //----------------------------------------------
  // On UnMount fade out
  //----------------------------------------------

  componentWillReceiveProps(newProps) { //check for the visibility props
    if(!newProps.visibility)
      return this.unMountStyle() //call outro animation when visibility prop is false
    this.setState({ //remount the node when the visibility prop is true
      display: true
    })
    setTimeout(this.mountStyle, 10) //call the into animiation
    console.log(this.props)
  }

  unMountStyle() { //css for unmount animation
    this.setState({
      style: { transform:  "translateY(-10px)" }
    })
  }

  componentDidUpdate(newProps) {
    // console.log(newProps)
  }

  //----------------------------------------------
  // On Mount fade in
  //----------------------------------------------

  componentDidMount(){
    setTimeout(this.mountStyle, 10) //call the into animiation
    console.log(this.props)
  }

  mountStyle() { // css for mount animation
    this.setState({
      style: {  transform:  "translateY(0)" }
    })
  }

  transitionEnd(){
    if (!this.props.visibility) { //remove the node on transition end when the visibility prop is false
      this.setState({
        display: false
      })
    }
  }

  render() {

    return (

      this.state.display &&
      <div>
        <span ref="currentPage" className={styles.currentPage}>{this.props.slideNumber}</span>
      </div>

    )
  }
}
