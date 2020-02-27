import React, { Component } from 'react';
import Cart from '../components/Cart';

import { Item } from 'semantic-ui-react';


// import { Grid } from 'semantic-ui-react'


class CartContainer extends Component {


    //// map over card and display them 

    renderCart = () => {
        console.log("user id:" , this.props.userId)
        // console.log("cart user id", this.props.cart)
        return this.props.cart.map(item => {
            {console.log("CartContainer Item: ", item.user.id)}
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
// <Grid.Column>
//   <Cart item={item} selectedItem={this.props.selectedItem} handleAddToCart={this.handleAddToCart} onShowDetails={this.props.onShowDetails} />
// </Grid.Column>

    render() {
        return( 
            <div className="cart-container" >
                <h2>this is a cart container</h2>
                <Item.Group>
                   {this.renderCart()}
                </Item.Group>
            </div>
          )
    }

}

export default CartContainer ;


    //     // console.log(this.props.recipes)
    //     if (this.props.recipes !== undefined){
    //         return this.props.recipes.map(recipe => {
    //             return (
    //             <div style={{ paddingRight:"10px", paddingTop:"10px" }}>
    //                 <RecipeCard onShowDetails={this.props.onShowDetails}  recipe={recipe} />
    //             </div>
    //             )
    //         })
    //     }