import React from 'react';
import { connect } from 'react-redux';
import { historyUpdate } from '../container/store/history';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles/styles.css';

// Components
import Navigation from './components/navigation';
import Numbers from './components/numbers';
import Logotype from './components/logotype';
import Back from './components/back';


// Routes
import Routes from '../routes';



//----------------------------------------------
// Wrap Component
//----------------------------------------------

class Wrap extends React.Component {

  constructor(props) {
    super(props);

    // Update Redux Route History
    this.props.history.listen((location, action) => {
      this.props.dispatch(historyUpdate(location.pathname));
    });
  }


  //----------------------------------------------
  // On Mount Helpers
  //----------------------------------------------

  componentWillMount() {

    // Update Redux Route History with first record
    if (this.props.state.history.length == 0) this.props.dispatch(historyUpdate(location.pathname));

    // // Redirect to intro
    let registredRoutes = ['/intro', '/benefits', '/people', '/start', '/intro/description', '/benefits/description', '/people/description', '/start/description', '/contact', '/about'],
        pathName = this.props.location.pathname;
    if (pathName == '/' || !registredRoutes.includes(pathName)) this.props.history.push('/intro');
    // console.log(this.props)
  }


  //----------------------
  // Render
  //----------------------

  render () {
    // Virables
    let path = this.props.location.pathname.slice(1),
        slideNumber = 0;

    // Change Numbers prop if corresponding to Slides component
    if (typeof this.props.state.slides[path] == "object") slideNumber = this.props.state.slides[path].slideNumber


    return (

      <div onWheel={(e) => e.preventDefault()}>
        <Navigation outerProps={this.props.location, this.props.history} />

        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames={styles} timeout={1000}>
            <Switch location={this.props.location} >
              <Route path='/about' component={Routes.About} />
              <Route path='/contact' component={Routes.Contact} />
              <Route path='/intro' component={Routes.Slides} />
              <Route path='/benefit' component={Routes.Slides} />
              <Route path='/people' component={Routes.Slides} />
              <Route path='/start' component={Routes.Slides} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>


        <Logotype />
        <Numbers location={this.props.location} slideNumber={slideNumber} />
        <Back location={this.props.location} />
      </div>
    )
  }
}



//----------------------------------------------
// Redux Store
//----------------------------------------------

const mapStateToProps = (state) => ({ state });
export default withRouter(connect(mapStateToProps)(Wrap));
