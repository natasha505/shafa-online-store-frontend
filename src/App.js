import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import NavBar from './components/NavBar';
import Home from './containers/Home';
import Login from './containers/Login';
import CartContainer from './containers/CartContainer';
import ItemDetails from './components/ItemDetails';
import MyAccount from './components/MyAccount';
import AdminContainer from './containers/AdminContainer'

import { BrowserRouter as Router, Route } from "react-router-dom";




class App extends Component {

  state = {
    id: "",
    name: "",
    email: "",
    img: "",
    loggedIn: false,
    admin: false,
    availItems: [],
    selectedItem: false,
    cart: [],
    user: {id: null, name: ''},
    pendingItems: []

  }

  setUserCart = (cartObj) => {
    this.setState(prevState => ({
      cart: [...prevState.cart, cartObj]
    }))
  }

  clearUserCart = () => {
    this.setState({
      cart: []
    })
  }

  setUserState = (data)  => {
    this.setState({
      name: data.name,
      email: data.email,
      img: data.img,
      loggedIn: true,
      admin: data.admin,
      id: data.id,
    },() => this.fetchUserCart())
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
    localStorage.clear()
  }

  componentDidMount() {
    // console.log(localStorage.getItem("user"))
    if (localStorage.getItem("user")){ 
      let user = (JSON.parse(localStorage.getItem("user")))
      this.setState({
        loggedIn: true,
        name: user.name,
        email: user.email,
        img: user.img,
        id: user.id,
        admin: user.admin
      },() => this.fetchUserCart())
    }
    this.fetchAvailItems();
    this.fetchPendingItems();
    // this.fetchUserCart();
  }

  fetchAvailItems = () => {
    // fetch("http://localhost:3000/items")
    fetch("http://localhost:3000/availableitems")
      .then(res => res.json())
      .then(data => this.setState({ availItems: data})
      )
    };

  fetchUserCart = () => {
    fetch(`http://localhost:3000/usercarts/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({ cart: data }))
    // .then(data => console.log(data))
  }

  fetchPendingItems = () => {
    fetch("http://localhost:3000/pendingitems")
    .then(res => res.json())
    .then(data => this.setState({ pendingItems: data }))
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
              render={() => ( <Home availItems={this.state.availItems} selectedItem={this.state.selectedItem} onShowDetails={this.showDetails} />  )} />   
            <Route 
              path='/item-details/:id'
              render={props => ( <ItemDetails  {...props} setUserCart={this.setUserCart} cart={this.state.cart} userId={this.state.id} item={this.state.selectedItem} availItems={this.state.availItems}  onShowDetails={this.showDetails}  /> ) } />
            <Route 
              path="/cart"  
              render={props => ( < CartContainer {...props} cart={this.state.cart} userId={this.state.id} setUserCart={this.setUserCart} clearUserCart={this.clearUserCart} fetchAvailItems={this.fetchAvailItems} />  )} />
            {/* <Route 
              path="/checkout" render={props => < CartContainer {...props} /> } /> */}
            <Route 
              path="/my-account" 
              exact 
              render={props => {
                return (< MyAccount {...props} logOut={this.logOut} cart={this.state.cart} 
                userName={this.state.name} email={this.state.email} userImg={this.state.img} admin={this.state.admin} /> )
               } } /> 
            <Route 
              path='/admin-page'
              exact
              render={props => ( <AdminContainer {...props} userId={this.state.id} pendingItems={this.state.pendingItems}  admin={this.state.admin} /> )}
            />
            {/* <Redirect to='/' /> */} 
          </Router>
          ) 
      } else {
          return (
            <Router>
              <NavBar loggedIn={this.state.loggedIn}/>
              <Route
                path='/' exact
                render={() => ( <Home availItems={this.state.availItems}  onShowDetails={this.showDetails} /> )} />   
              <Route
                path='/login' render={props => < Login {...props} setUserState={this.setUserState} /> } />
              <Route 
                path='/item-details/:id'
                render={props => ( <ItemDetails   {...props}  item={this.state.selectedItem}  availItems={this.state.availItems}  onShowDetails={this.showDetails} addToCart={this.handleAddToCart} /> ) } />
            </Router>
          )
        }
    }

  render() {
    // console.log("pendingItems: ", this.state.pendingItems)
    // console.log("cart: ", this.state.cart)
    // console.log("loggedIn: ", this.state.loggedIn)
    // console.log("selectedItemState : ", this.state.selectedItem)
    return (
      <div>
        {this.routeCountroller()}
      </div>
    );
  }
}

export default App;