import React, { Component } from 'react';

import { Button, Item } from 'semantic-ui-react';


class CartContainer extends Component {

    renderCart = () => {
        console.log("user id:" , this.props.userId)
        // console.log("cart user id", this.props.cart)
        if (this.props.cart) {
            return this.props.cart.map(item => {
                return (
                    <Item>
                    <Item.Image size='tiny' src={item.item.img} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='a'>{item.item.name}</Item.Header>
                        <Item.Content verticalAlign='middle'>$ {item.item.price}</Item.Content>
                    </Item.Content>
                    </Item>
                 )
            })
        }
    }

    priceArray = () => {
        console.log("loggggggin", this.props.cart)
        if (this.props.cart){
            return this.props.cart.map(cartem => {
                return cartem.item.price
            }).reduce((a, b) => a + b, 0)
        }
    }

    mapCarts = (carts) => {
        return carts.map(kart => {
            console.log("MAPPING KART: ", kart)
            console.log("MAPPING KART: ", kart.item)
            console.log("MAPPING KART: ", kart.item.status)
            this.handleCheckout(kart.id)
            // this.patchItemStatus(kart.item_id)
        })
            
    }

    handleCheckout = (cartId) => {
        console.log("checkout click", cartId)
        console.log("userId :", this.props.userId)
        fetch(`http://localhost:3000/carts/${cartId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: cartId,
                complete: true,
                item: {status: "pending"}
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            this.props.clearUserCart()
        })
    }

        // }).then(res => res.json()).then(data => {
        //   console.log(data)
        //   if (!data.error) {
        //     this.props.setUserCart(data)
        //   } else {
        //     alert(data.error)
        //   }
  
    render() {
        console.log("priceArry", this.priceArray())
        // console.log("CartTotal :", this.cartTotal())
        return( 
            <div className="cart-container" >
                <h2>this is a cart container</h2>
                <Item.Group>
                   {this.renderCart()}
                </Item.Group>
                <div className="cart-total" style={{float:'right'}} >
                    <h2>TOTAL: $ {this.priceArray()} </h2>
                </div>
                <Button className="checkout-btn" onClick={() => this.mapCarts(this.props.cart)}>
                    <Button.Content>Checkout</Button.Content>
                </Button>       
            </div>
          )
    }
}

export default CartContainer ;