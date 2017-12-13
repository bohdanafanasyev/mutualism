import React from 'react';
import classNames from 'classnames';
import styles from './styles.css';



//----------------------------------------------
// Images Component
//----------------------------------------------

export default class Images extends React.Component {

  constructor(props) {
    super(props)

    // Component's state
    this.state = { loaded: false }
  }



  //----------------------------------------------
  // Disable background scale until loaded
  //----------------------------------------------

  componentDidMount() {
    setTimeout(() => this.setState({ loaded: true }), 1000);
  }



  //----------------------
  // Render
  //----------------------

  render () {

    return (

      <div className={styles.images}>
        <div className={styles.mainWrap} >
          <div className={classNames(styles.main, this.state.loaded ? styles.scaleMain : null, this.props.fadeEnter ? styles.fadeMain : styles.slideMain)} style={this.props.images.main} id='main'/>
        </div>
        <div className={styles.filterNormal} />
        <div className={classNames(styles.imageShadow, this.props.fadeContent ? styles.imageShadowHidden : null)} />
        <div className={classNames(styles.upperWrap, this.props.fadeContent ? styles.clipWrap : null)}>
          <div className={classNames(styles.upper, this.state.loaded ? styles.scaleUpper : null)} style={this.props.images.upper} id='upper'/>

        </div>
        <div className={styles.sideGradient} />
      </div>

    )
  }
}
