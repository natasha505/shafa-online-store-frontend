import React, { Component } from 'react';

import { Button, Icon, Item, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'


class ItemDetails extends Component {

  //     // console.log("handleAddToCart ", this.props.userId)
  //     // console.log("show me item ", item)
  //     // console.log("show me cart: ", this.props.cart)
  
  //     // console.log(this.props.cart.includes(item))
  
  //     // if (this.props.cart.includes(item))
  //     let uniqueItem = true;
  // this.props.cart.forEach(cartItem => {
    //   if (cartItem.item_id === item.id) {
      //     uniqueItem = false;
      //   }
      // })
      
      // // const cartItems = this.props.cart.map(record => record.item)
      
      // // console.log("CART: ", cartItems)
      // // console.log("NEW ITEM FOR CART: ", item)
      
      // if (uniqueItem) {
  handleAddToCart = item => {
    fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: this.props.userId,
        item_id: item.id
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
      if (!data.error) {
        this.props.setUserCart(data)
      } else {
        alert(data.error)
      }
    })
  }
// }

state = {
  item: null
}

componentDidMount() {
  this.props.availItems.forEach(thisItem => {
    console.log(thisItem.id)
    console.log(this.props.match.params.id)
    if (thisItem.id === parseInt(this.props.match.params.id)) {
      this.setState({item: thisItem})
    }
  })
}

  render() {
    const {item} = this.state
    // console.log("ItemDetails", this.item)
    // console.log("ItemDetails userId: ", this.props.userId)
    return <>
      {item!==null?
      (
        <div className="details-container">
        <h1>ITEM DETAILS</h1>
        <div className="item-details" >
        <Item.Group>
        <Item>
        <Item.Image  src={item.img} size="medium" rounded/>
        <Item.Content>
        <Item.Header><h1>{item.name}</h1></Item.Header><br></br>
        <Item.Header>{item.brand}</Item.Header>
        <Item.Meta>
        <span className="price"><h1>$ {item.price}</h1></span><br></br>
        <span className="size">Size: {item.size}</span><br></br>
        </Item.Meta>
        <Item.Extra>
        <Label> {item.category.category_name} </Label>
        <Label> {item.color} </Label>
        <Label> {item.condition} </Label>
        </Item.Extra>
        <Item.Description>{item.details}</Item.Description><br></br>

        <Button  size='medium' floated='right' attached='bottom' animated='fade' onClick={() => this.handleAddToCart(item)}>
        <Button.Content hidden>Add To Cart</Button.Content>
          <Button.Content visible>
            <Icon name='shop' />
            </Button.Content>
        </Button>
              </Item.Content>
            </Item>
            </Item.Group>
            </div>
            </div>
            )
            :(null)}
            </>;
    };

  }
  export default withRouter (ItemDetails) ;