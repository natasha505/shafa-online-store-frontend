import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import NavBar from './components/NavBar'

class App extends Component {

  state = {
   

  }


  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/">

          </Route>
        </Switch>

      </Router>
    );
  }
}

export default App;
