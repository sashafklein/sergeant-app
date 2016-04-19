import React from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Drill from './app/views/Drill';
import Step from './app/views/Step';
import Review from './app/views/Review';

class Sergeant extends React.Component {

  render() {
    return(
      <Router>
        <Scene hideNavBar={true} key="root">

          <Scene key="drill" component={ Drill } title="Drill" initial={ true } />
          <Scene key="step" component={ Step } title="Step" />
          <Scene key="review" component={ Review } title="Review" />
        </Scene>
      </Router>
    )
  }
}

React.AppRegistry.registerComponent('sergeant', () => Sergeant);
