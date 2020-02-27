import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import NavBar from './components/NavBar';
import Home from './containers/Home';
import Login from './containers/Login';
import CartContainer from './containers/CartContainer';
import ItemDetails from './components/ItemDetails';
import MyAccount from './components/MyAccount';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";




class App extends Component {

  state = {
    id: "",
    name: "",
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
      admin: data.admin,
      id: data.id
    })
  }

  logOut = () => {
    this.setState({
      name: "",
      email: "",
      img: "",
      loggedIn: false,
      admin: "",
      id: "data.id"
    })
  }

  componentDidMount() {
    this.fetchItems();
    this.fetchCarts();
  }

  fetchItems = () => {
    fetch("http://localhost:3000/items")
      .then(res => res.json())
      .then(data => this.setState({ allItems: data})
      )
    };

  fetchCarts = () => {
    fetch("http://localhost:3000/carts")
    .then(res => res.json())
    .then(data => this.setState({ cart: data }))
    // .then(data => console.log(data))
  }


  showDetails = item => {
    // console.log("showDetails: ", item)
    this.setState({ selectedItem: item });
  };


    routeCountroller = () => {
      if (this.state.loggedIn){
        return(
          <Router>
            <NavBar loggedIn={this.state.loggedIn}  userName={this.state.name} email={this.state.email} userImg={this.state.img}  />
            <Route
              path='/' 
              exact
              render={() => ( <Home allItems={this.state.allItems} selectedItem={this.state.selectedItem} onShowDetails={this.showDetails} />  )} />   
            <Route 
              path='/item-details/:id'
              render={props => ( <ItemDetails  {...props} userId={this.state.id} item={this.state.selectedItem} allItems={this.state.allItems}  onShowDetails={this.showDetails}  /> ) } />
            <Route 
              path="/cart"  
              render={props => ( < CartContainer cart={this.state.cart} email={this.state.email} {...props} />) } />
            {/* <Route 
              path="/checkout" render={props => < CartContainer {...props} /> } /> */}
            <Route 
              path="/my-account" 
              exact 
              render={props => {
                return (< MyAccount {...props} logOut={this.logOut} cart={this.state.cart} 
                userName={this.state.name} email={this.state.email} userImg={this.state.img} /> )
               } } />
            <Redirect to='/' />
          </Router>
          ) 
      } else {
          return (
            <Router>
             
              <NavBar loggedIn={this.state.loggedIn}/>
              {/* </Route><Route  path="/my-account" exact render={props => < MyAccount {...props} /> } /> */}
              <Route
                path='/'  
                exact
                render={() => ( <Home allItems={this.state.allItems}  onShowDetails={this.showDetails} /> )} />   
              <Route
                path='/login' render={props => < Login {...props} setUserState={this.setUserState} /> } />
              <Route 
                path='/item-details/:id'
                render={props => ( <ItemDetails   {...props}  item={this.state.selectedItem}  allItems={this.state.allItems}  onShowDetails={this.showDetails} addToCart={this.handleAddToCart} /> ) } />
              {/* <Redirect to='/' /> */}

            </Router>
          )
        }
    }

  render() {
    console.log("cart: ", this.state.cart)
    console.log("loggedIn: ", this.state.loggedIn)
    console.log("selectedItemState : ", this.state.selectedItem)
    return (
      <div>
        {this.routeCountroller()}
      </div>
    );
  }
}

export default App;