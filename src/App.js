import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import NavBar from './components/NavBar';
import Home from './containers/Home';
import Login from './containers/Login';
import CartContainer from './containers/CartContainer';
import ItemDetails from './components/ItemDetails';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";




class App extends Component {

  state = {
    user: "",
    email: "",
    img: "",
    loggedIn: false,
    admin: false,
    allItems: [],
    selectedItem: false,
    cart: []
  }

  setUserState = (data)  => {
    this.setState({
      name: data.name,
      email: data.email,
      img: data.img,
      loggedIn: true,
      admin: data.admin
    })
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    fetch("http://localhost:3000/items")
      .then(res => res.json())
      .then(data => this.setState({ allItems: data})
      )
    };


  showDetails = item => {
    // console.log("showDetails: ", item)
    this.setState({ selectedItem: item });
  };

    routeCountroller = () => {
      if (this.state.loggedIn){
      return(
        <Router>
          <NavBar onLogin={this.login}/>
          <Route
            path='/'
            exact
            render={() => (
              <Home allItems={this.state.allItems} item={this.state.selectedItem} onShowDetails={this.showDetails} />  )} />   
          <Route 
          path='/item-details/:id'
          render={props => (
            <ItemDetails 
              {...props}
              item={this.state.selectedItem}
              allItems={this.state.allItems} 
              onShowDetails={this.showDetails} 
              /> ) } />
          <Route 
            path="/cart"
            render={props => < CartContainer {...props} /> } />
          <Route 
            path="/checkout"
            render={props => < CartContainer {...props} /> } />
          <Route 
            path="/my-account"
            render={props => < CartContainer {...props} /> } />
          <Redirect to='/' />
        </Router>
      ) } else {
          return (
            <Router>
              <NavBar onLogin={this.login}/>
              <Route
                path='/'
                exact
                render={() => (
                  <Home allItems={this.state.allItems}  onShowDetails={this.showDetails} /> )} />   
              <Route
                path='/login'
                render={props => < Login {...props} setUserState={this.setUserState} /> } />
            <Route 
              path='/item-details/:id'
              
              render={props => (
                <ItemDetails 
                  {...props}
                  item={this.state.selectedItem}
                  allItems={this.state.allItems} 
                  onShowDetails={this.showDetails} 
                  /> ) } />

            </Router>
          )
        }
    }

  render() {
    return (
      <div>
       { console.log("STATE: ", this.state.selectedItem)}
        {this.routeCountroller()}
      </div>
    );
  }
}

export default App;