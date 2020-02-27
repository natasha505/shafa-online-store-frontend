import React, { Component } from 'react';

import { Button, Icon, Item, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'


class ItemDetails extends Component {

  handleAddToCart = item => {
    console.log("handleAddToCart ", this.props.userId)
    console.log("handleAddToCart ", item)
    fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user_id: this.props.userId,
        item_id: item.id
      })
    }).then(res => res.json()).then(data => {
      console.log("POST TO CART", data)
      this.props.setUserCart(data)
    })
  }

  render() {
    console.log("ItemDetails", this.props.item)
    console.log("ItemDetails userId: ", this.props.userId)
    return(
      <div className="details-container">
        <h1>ITEM DETAILS</h1>
        <div className="item-details" >
          <Item.Group>
            <Item>
              <Item.Image  src={this.props.item.img} size="medium" rounded/>
            <Item.Content>
              <Item.Header><h1>{this.props.item.name}</h1></Item.Header><br></br>
              <Item.Header>{this.props.item.brand}</Item.Header>
              <Item.Meta>
                <span className="price"><h1>$ {this.props.item.price}</h1></span><br></br>
                <span className="size">Size: {this.props.item.size}</span><br></br>
              </Item.Meta>
              <Item.Extra>
                <Label> {this.props.item.category.category_name} </Label>
                <Label> {this.props.item.color} </Label>
                <Label> {this.props.item.condition} </Label>
              </Item.Extra>
              <Item.Description>{this.props.item.details}</Item.Description><br></br>
              <Button  size='medium' floated='right' attached='bottom' animated='fade' onClick={() => this.handleAddToCart(this.props.item)}>
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
    );
  };

}
export default withRouter (ItemDetails) ;


{/* <div className="item-details">

<div className="item-details-left">
  <Item.Group>
    <Item>
      <Item.Image size='medium' src={this.props.item.img} />
    </Item>
  </Item.Group>
</div>

<div className="item-details-right">
  <Item.Group>
    <Item>
      <Item.Header as='h3'>{this.props.item.name}</Item.Header> <br></br>
    </Item>
  </Item.Group>
</div>

</div> */}