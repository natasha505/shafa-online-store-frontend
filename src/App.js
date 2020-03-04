import React, { Component } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import NavBar from "./components/NavBar";
import Home from "./containers/Home";
import Login from "./containers/Login";
import CartContainer from "./containers/CartContainer";
import ItemDetails from "./components/ItemDetails";
import MyAccount from "./components/MyAccount";
import AdminContainer from "./containers/AdminContainer";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
    user: { id: null, name: "" },
    pendingItems: []
  };

  clearUserCart = () => {
    this.setState({
      cart: []
    });
  };

  logOut = () => {
    this.setState({
      name: "",
      email: "",
      img: "",
      loggedIn: false,
      admin: "",
      id: "data.id"
    });
    localStorage.clear();
  };

  setUserCart = cartObj => {
    this.setState(prevState => ({
      cart: [...prevState.cart, cartObj]
    }));
  };

  setUserState = data => {
    this.setState(
      {
        name: data.name,
        email: data.email,
        img: data.img,
        loggedIn: true,
        admin: data.admin,
        id: data.id
      },
      () => this.fetchUserCart()
    );
  };

  componentDidMount() {
    // console.log(localStorage.getItem("user"))
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.setState(
        {
          loggedIn: true,
          name: user.name,
          email: user.email,
          img: user.img,
          id: user.id,
          admin: user.admin
        },
        () => this.fetchUserCart()
      );
    }
    this.fetchAvailItems();
    this.fetchPendingItems();
    // this.fetchUserCart();
  }

  fetchAvailItems = () => {
    fetch("http://localhost:3000/availableitems")
      .then(res => res.json())
      .then(data => this.setState({ availItems: data }));
  };

  fetchPendingItems = () => {
    fetch("http://localhost:3000/pendingitems")
      .then(res => res.json())
      .then(data => this.setState({ pendingItems: data }));
  };

  fetchUserCart = () => {
    fetch(`http://localhost:3000/usercarts/${this.state.id}`)
      .then(res => res.json())
      .then(data => this.setState({ cart: data }));
    // .then(data => console.log(data))
  };

  showDetails = item => {
    // console.log("showDetails: ", item)
    this.setState({ selectedItem: item });
  };

  routeCountroller = () => {
    return (
      <Router>
        <NavBar
          email={this.state.email}
          loggedIn={this.state.loggedIn}
          userImg={this.state.img}
          userName={this.state.name}
        />
        <Route
          path="/"
          exact
          render={() => (
            <Home
              availItems={this.state.availItems}
              onShowDetails={this.showDetails}
              selectedItem={this.state.selectedItem}
              userId={this.state.id}
            />
          )}
        />
        <Route
          path="/admin-page"
          exact
          render={props => (
            <AdminContainer
              {...props}
              admin={this.state.admin}
              fetchAvailItems={this.fetchAvailItems}
              fetchPendingItems={this.fetchPendingItems}
              pendingItems={this.state.pendingItems}
              userId={this.state.id}
            />
          )}
        />
        <Route
          path="/cart"
          render={props => (
            <CartContainer
              {...props}
              cart={this.state.cart}
              clearUserCart={this.clearUserCart}
              fetchAvailItems={this.fetchAvailItems}
              fetchPendingItems={this.fetchPendingItems}
              loggedIn={this.state.loggedIn}
              userId={this.state.id}
              setUserCart={this.setUserCart}
            />
          )}
        />
        <Route
          path="/item-details/:id"
          render={props => (
            <ItemDetails
              {...props}
              addToCart={this.handleAddToCart}
              availItems={this.state.availItems}
              item={this.state.selectedItem}
              loggedIn={this.state.loggedIn}
              onShowDetails={this.showDetails}
              setUserCart={this.setUserCart}
              userId={this.state.id}
            />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <Login {...props} setUserState={this.setUserState} />
          )}
        />
        <Route
          path="/my-account"
          exact
          render={props => {
            return (
              <MyAccount
                {...props}
                admin={this.state.admin}
                cart={this.state.cart}
                email={this.state.email}
                logOut={this.logOut}
                userImg={this.state.img}
                userName={this.state.name}
              />
            );
          }}
        />

      </Router>
    );
  };

  render() {
    // console.log("pendingItems: ", this.state.pendingItems)
    // console.log("cart: ", this.state.cart)
    // console.log("loggedIn: ", this.state.loggedIn)
    // console.log("selectedItemState : ", this.state.selectedItem)
    return <div>{this.routeCountroller()}</div>;
  }
}

export default App;
