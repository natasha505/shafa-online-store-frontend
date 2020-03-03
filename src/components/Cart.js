import React, { Component } from 'react';

class Cart extends Component{

  showCart = () => {
    fetch("http://localhost:3000/carts", {
    })
  }


  render(){
    console.log(this.props)
    return(
      <div className="cart-container">
        <h1>this is a CART</h1>
        {this.showCart()}
      </div>
    )
  }
}
export default Cart;