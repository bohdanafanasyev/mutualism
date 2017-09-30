class App extends React.Component{
  constructor(props) {
    super(props)
    this.transitionEnd = this.transitionEnd.bind(this)
    this.mountStyle = this.mountStyle.bind(this)
    this.unMountStyle = this.unMountStyle.bind(this)
    this.state ={ //base css
      show: true,
      style : { opacity: 0 }
    }
  }

  componentWillReceiveProps(newProps) { //check for the mounted props
    if(!newProps.mounted)
      return this.unMountStyle() //call outro animation when mounted prop is false
    this.setState({ //remount the node when the mounted prop is true
      show: true
    })
    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  unMountStyle() { //css for unmount animation
    this.setState({
      style: { opacity: 0 }
    })
  }


  //-------------------------------------
  // On Mount Actions
  //-------------------------------------

  componentDidMount(){
    setTimeout(this.mountStyle, 10) //call the into animiation
  }

  mountStyle() { // css for mount animation
    this.setState({
      style: { opacity: 1 }
    })
  }



  transitionEnd(){
    if(!this.props.mounted){ //remove the node on transition end when the mounted prop is false
      this.setState({
        show: false
      })
    }
  }

  //-------------------------------------
  // Render
  //-------------------------------------

  render() {
    return this.state.show && <h1 style={this.state.style} onTransitionEnd={this.transitionEnd}>Hello</h1>
  }
}




///////////
///////////
///////////
///////////
///////////




class Parent extends React.Component{
  constructor(props){
    super(props)
    this.buttonClick = this.buttonClick.bind(this)
    this.state = {
      showChild: true,
    }
  }
  buttonClick(){
    this.setState({
      showChild: !this.state.showChild
    })
  }
  render(){
    return <div>
        <App onTransitionEnd={this.transitionEnd} mounted={this.state.showChild}/>
        <button onClick={this.buttonClick}>Trigger</button>
      </div>
  }
}

ReactDOM.render(<Parent />, document.getElementById('app'))
