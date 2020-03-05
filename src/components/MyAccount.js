import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Card, Image, Button, Item, Segment, Container, Header} from 'semantic-ui-react';

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

  isAdmin() {
    return this.props.admin
  }

  handleLogOut = () => {
    this.props.logOut()
    this.props.history.push('/')
  }

  // handleViewAppointments = () => {
  //   console.log("view appointments CLICKED")
  // }

  render() {
    console.log("MyAccount: ", this.props.email)
    console.log("MyAccount Cart: ", this.props.cart)
    console.log("MYACCOUNT isADMIN: ", this.props.admin)
    

    return(
      <Container>
        <Segment>
          <Header>My Account</Header>
          <Segment.Group horizontal>
            <Segment className='account-side1-segment'>
            {/* cart history goes here */}
            </Segment>
            <Segment>
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
            {this.isAdmin()?<Link to="/admin-page" > ADMIN PAGE </Link>:null}
            </Segment>
          </Segment.Group>
        </Segment>
      </Container>





    
    )
  }

}

export default MyAccount;