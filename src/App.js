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
    user: { id: null, name: "" },
    pendingItems: [],
    search: "",
    categories: [],
    option: null
  };

  clearUserCart = () => {
    this.setState({
      cart: []
    });
  };

  clearSearch = () => {
    this.setState({
      search: ""
    })
  }

  clearItemSelect = () => {
    this.setState({
      availItems: []
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

  updateSearch = e => {
    const input = e.target.value;
    const upFirstLetter = input.charAt(0).toUpperCase() + input.slice(1);
    // console.log("__CAPITALIZE__", upFirstLetter)
    this.setState({
      search: upFirstLetter
    })
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
    this.fetchCategories();

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

  fetchCategories = () => {
    fetch("http://localhost:3000/categories")
      .then(res => res.json())
      .then(data => this.setState({ categories: data }));
  };

  showDetails = item => {
    // console.log("showDetails: ", item)
    this.setState({ selectedItem: item });
  };


  categorySelect = (selection) => {
    this.setState({
      availItems: selection
    })
  }


  routeCountroller = () => {

    const   availItems = this.state.availItems.filter(i => {
      // console.log("avail iiiiii", i.name.includes(this.state.search))
      return (i.name.includes(this.state.search) || i.brand.includes(this.state.search) || i.color.includes(this.state.search) || i.category.category_name.includes(this.state.search))
    })
    // console.log("SEARCHED ITEMS: ", searchedItem)


    return (
      <Router>
        <NavBar
          availItems={this.state.availItems}
          categories={this.state.categories}
          categorySelect={this.categorySelect}
          clearSearch={this.clearSearch}
          email={this.state.email}
          handleCategorySelect={this.handleCategorySelect}
          loggedIn={this.state.loggedIn}
          onSearch={this.updateSearch}
          search={this.state.search}
          userImg={this.state.img}
          userName={this.state.name}
        />
        <Route
          path="/"
          exact
          render={() => (
            <Home
              availItems={availItems}
              // availItems={this.state.availItems}
              clearSearch={this.clearSearch}
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
              clearSearch={this.clearSearch}
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
    // console.log("app SEARCH:", this.state.search)
    // console.log("app availItems:", this.state.availItems)
    // console.log("pendingItems: ", this.state.pendingItems)
    // console.log("cart: ", this.state.cart)
    // console.log("loggedIn: ", this.state.loggedIn)
    // console.log("selectedItemState : ", this.state.selectedItem)


  

    return <div>{this.routeCountroller()}</div>;
  }
}

export default App;
