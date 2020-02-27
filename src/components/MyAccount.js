import React, { Component } from 'react';
import CartContainer from '../containers/CartContainer';
import MiniCartItem from './MiniCartItem';

// import { Card, Image } from 'semantic-ui-css';
import { Card, Image, Button, Item } from 'semantic-ui-react';

class MyAccount extends Component {

  miniCartCard = () => {
    if(this.props.email === this.props.carts.user.email) {
      if(this.props.carts.complete === true){
        return(
          this.props.carts.map(cart => {
            return cart.item.name
          })
        ) 
      }
    }
  }

  handleLogOut = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  render() {
    console.log("MyAccount: ", this.props.email)
    console.log("MyAccount Cart: ", this.props.cart)

    return(
      <div className="my-account-container" >
        <div className="title">
          <h1>My Account</h1>
        </div>

        <div className="my-account-container-left">
          <h2>Purchase History</h2>
          <h2>{this.props.email}</h2>
          <Item.Group>
              {this.miniCartCard}
          </Item.Group>
          
        </div>

        <div className="my-account-container-right">
          <h4> RIGHT CONTAINER</h4>
          <Card>
            <Image src={this.props.userImg} wrapped ui={false} size='tiny' />
            <Card.Content>
              <Card.Header>Name: {this.props.userName}</Card.Header>
              <Card.Meta>
                <span className='email'>Email: {this.props.email}</span>
              </Card.Meta>
            </Card.Content>
          </Card>
          <Button onClick={this.handleLogOut} style={{ backgroundColor: '#4C243B' }} inverted  floated='right'  > Log Out </Button>
        </div>
        
      </div>
    )
  }

}

export default MyAccount;