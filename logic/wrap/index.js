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

// Props Route Helper
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return ( React.createElement(component, finalProps) );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => { return renderMergedProps(component, routeProps, rest); }}/>
  );
}



//----------------------------------------------
// Application Wrap Component
//----------------------------------------------

class Wrap extends React.Component {

  constructor(props) {
    super(props);

    // Update Redux Route History & Manage Componets (Back, Numbers)
    this.props.history.listen((location, action) => {
      this.props.dispatch(historyUpdate(location.pathname));
      this.manageBack();
      this.manageNumbers();
      this.manageAnimations(location);
    });

    // Component State
    this.state = { numbers: true, back: true,
                   fadeEnter: true, bottomCorner: false, topCorner: false }

    // Helpers Bindings
    this.manageBack = this.manageBack.bind(this);
    this.manageNumbers = this.manageNumbers.bind(this);
    this.manageAnimations = this.manageAnimations.bind(this);
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
    this.manageAnimations();

    // Redirect to intro
    let registredRoutes = ['/intro', '/benefit', '/people', '/start', '/intro/description', '/benefit/description', '/people/description', '/start/description', '/contact', '/about'],
        pathName = this.props.location.pathname;
    if (pathName == '/' || !registredRoutes.includes(pathName)) this.props.history.push('/intro');
  }


  //----------------------------------------------
  // Manage Sub Components
  //----------------------------------------------

  manageBack() { ['/about', '/contact'].includes(location.pathname) ? this.setState({ back: true }) : this.setState({ back: false }) }
  manageNumbers() { ['/intro', '/benefit', '/people', '/start'].includes(location.pathname) ? this.setState({ numbers: true }) : this.setState({ numbers: false }) }



  //----------------------------------------------
  // Manage Children Animations
  //----------------------------------------------

  manageAnimations() {

    let history = this.props.state.history,
        lastRoute = history[history.length - 1] || 'empty',
        currentRoute = location.pathname,
        slidesRoutes = ['/intro', '/benefit', '/start', '/people'],
        socialRoutes = ['/about', '/contact'];

    // 0.0 Initial Load
    if (this.props.state.history.length == 0) {
      this.setState({ fadeEnter: true, bottomCorner: false, topCorner: false })
    }

    // 1.0 Slide over any Description, Social over All (Top Unclip)
    if ((lastRoute.indexOf('d') > 0) && slidesRoutes.includes(currentRoute)) {
      this.setState({ fadeEnter: false, bottomCorner: false, topCorner: true })
      window.scroll({ left: 0, top: 0 })
    }

    // 2.0 Slide over any Description, Social over All (Bottom Unclip)
    if (slidesRoutes.includes(lastRoute) && slidesRoutes.includes(currentRoute) ||
        lastRoute != 'empty' && socialRoutes.includes(currentRoute)) {
      this.setState({ fadeEnter: false, bottomCorner: true, topCorner: false })
    }
  }


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

      <div>
        <Navigation history={this.props.history} />

        <TransitionGroup>
          <CSSTransition classNames={{enter: styles.enter, exit: styles.exit}} timeout={1000} key={this.props.location.key}>
            <Switch location={this.props.location}>
              <PropsRoute path='/about' component={Routes.About} fadeEnter={this.state.fadeEnter} />
              <PropsRoute path='/contact' component={Routes.Contact} fadeEnter={this.state.fadeEnter} />
              {["/intro", "/benefit", "/people", "/start"].map(path =>
                  <PropsRoute exact key={path} path={path} component={Routes.Slides} fadeEnter={this.state.fadeEnter} bottomCorner={this.state.bottomCorner} topCorner={this.state.topCorner} />
              )}
              <Route path='/intro/description' component={Routes.IntroDescription} />
              <Route path='/benefit/description' component={Routes.BenefitDescription} />
              <Route path='/people/description' component={Routes.PeopleDescription} />
              <Route path='/start/description' component={Routes.StartDescription}  />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Logotype />
        <Back location={this.props.location} display={this.state.back} />
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
