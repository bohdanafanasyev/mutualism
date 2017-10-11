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

    // Update Redux Route History & Manage Componets (Back, Numbers)
    this.props.history.listen((location, action) => {
      this.props.dispatch(historyUpdate(location.pathname));
      this.manageBack();
      this.manageNumbers();
    });

    // Component State
    this.state = { numbers: true, back: true }

    // Helpers Bindings
    this.manageBack = this.manageBack.bind(this);
    this.manageNumbers = this.manageNumbers.bind(this);
  }



  //----------------------------------------------
  // On Mount Helpers
  //----------------------------------------------

  componentWillMount() {
    // Update Redux Route History with first record
    if (this.props.state.history.length == 0) this.props.dispatch(historyUpdate(location.pathname));

    // Manage Back and Numbers Component
    this.manageBack();
    this.manageNumbers();

    // Redirect to intro
    let registredRoutes = ['/intro', '/benefit', '/people', '/start', '/intro/description', '/benefit/description', '/people/description', '/start/description', '/contact', '/about'],
        pathName = this.props.location.pathname;
    if (pathName == '/' || !registredRoutes.includes(pathName)) this.props.history.push('/intro');
  }


  //----------------------------------------------
  // Managing Components
  //----------------------------------------------

  manageBack() { ['/about', '/contact'].includes(location.pathname) ? this.setState({ back: true }) : this.setState({ back: false }); }
  manageNumbers() { ['/intro', '/benefit', '/people', '/start'].includes(location.pathname) ? this.setState({ numbers: true }) : this.setState({ numbers: false }); }



  //----------------------
  // Render
  //----------------------

  render () {
    // Virables
    let path = this.props.location.pathname.slice(1),
        slideNumber = undefined;

    // Change Numbers prop if corresponding to Slides component
    if (typeof this.props.state.slides[path] == "object") slideNumber = this.props.state.slides[path].slideNumber


    return (

      <div onWheel={(e) => e.preventDefault()}>
        <Navigation outerProps={this.props.location, this.props.history} />

        <TransitionGroup>
          <CSSTransition classNames={styles} timeout={1000} key={this.props.location.key}>
            <Switch location={this.props.location}>
              <Route path='/about' component={Routes.About} />
              <Route path='/contact' component={Routes.Contact} />
              {["/intro", "/benefit", "/people", "/start"].map(path =>
                  <Route exact key={path} path={path} component={Routes.Slides} />
              )}
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <TransitionGroup>
          <CSSTransition classNames={styles} timeout={1000} key={this.props.location.key}>
            <Switch location={this.props.location}>
              <Route path='/intro/description' component={Routes.IntroDescription} />
              <Route path='/benefit/description' component={Routes.BenefitDescription} />
              <Route path='/people/description' component={Routes.PeopleDescription} />
              <Route path='/start/description' component={Routes.StartDescription} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>



        <Logotype />
        <Back location={this.props.location} display={this.state.back}/>
        <Numbers slideNumber={slideNumber} history={this.props.history} location={this.props.location} display={this.state.numbers} />
      </div>
    )
  }
}



//----------------------------------------------
// Redux Store
//----------------------------------------------

const mapStateToProps = (state) => ({ state });
export default withRouter(connect(mapStateToProps)(Wrap));
