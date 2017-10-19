import React from 'react';
import styles from './styles.css';



//----------------------------------------------
// Numbers Component
//----------------------------------------------

export default class Number extends React.Component {

  constructor(props) {
    super(props)

    // Component State
    this.state = { style: { opacity: 0, transform: "translateY(0)" }, display: this.props.display }

    // Helpers Binding
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.transitionEnd = this.transitionEnd.bind(this)
  }



  //----------------------------------------------
  // On UnMount fade out
  //----------------------------------------------

  componentWillReceiveProps(newProps) {
    if(!newProps.display) return this.unMountStyle()

    this.setState({ display: true })
    setTimeout(this.mountStyle, 10)
  }

  unMountStyle() {
    this.setState({ style: { opacity: 0, transform: "translateY(-5px)" } })
  }


  //----------------------------------------------
  // On Mount fade in
  //----------------------------------------------

  componentDidMount(){
    setTimeout(this.mountStyle, 10)


  }

  mountStyle() {
    this.setState({ style: { opacity: 1, transform: "translateY(0)" } })
  }

  transitionEnd() {
    if (!this.props.display) this.setState({ display: false })
  }



  //----------------------
  // Render
  //----------------------

  render() {
    return (

      this.state.display &&
      <div className={styles.wrap} style={this.state.style} onTransitionEnd={this.transitionEnd}>
        <span className={styles.number}>{this.props.slideNumber}</span>
      </div>

    )
  }
}
