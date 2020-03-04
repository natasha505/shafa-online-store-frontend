import React, { Component } from 'react';
import { Button, Item } from 'semantic-ui-react'



class AdminPage extends Component {

  state = {
    item: null
  }

  handleAccept = item => {
    console.log("click ACCEPT", item.item.id)
    console.log("clicked accept: ", item.item.status)
    fetch(`http://localhost:3000/items/${item.item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: item.item.id,
        item: {status: "unavailable"}
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
      this.props.fetchPendingItems()
    })
  }

  handleReject = item => {
    console.log("click ReJECT", item)
    console.log("clicked REJECT: ", item.item.status)
    // this.deleteCart(item.cart_id)

    fetch(`http://localhost:3000/items/${item.item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: item.item.id,
        item: {status: "available"}
      })
    }).then(res => res.json()).then( data => {
      console.log(data)
      this.deleteCart(data.carts[0].id)
      this.props.fetchPendingItems()
      this.props.fetchAvailItems()
    })
  }

  deleteCart = (cartId) => {
    console.log("delete cart", cartId)
    fetch(`http://localhost:3000/carts/${cartId}`, {
      method: "DELETE"
    }).then(res => res.json())
  }

  render() {
    // console.log("::::AdminPAGE::::", this.props.item.item)
    return(
      <div className="admin-big-box">
        <Item>
          <div className="item-left">
            <Item.Image size='tiny' src={this.props.item.item.img} floated='left'/>
          </div>
          <div className="item-right">
            <Item.Content verticalAlign='middle' floated='right'>
              <Item.Header>{this.props.item.user.email}</Item.Header>
              <Item.Description>{this.props.item.item.name}</Item.Description>
              <Item.Extra>
                <Button positive onClick={() => this.handleAccept(this.props.item)}>Accept</Button>
                <Button negative onClick={() => this.handleReject(this.props.item)}>Reject</Button>
              </Item.Extra>
            </Item.Content>
          </div>
        </Item>
      </div>
    )
  }

}
export default AdminPage;