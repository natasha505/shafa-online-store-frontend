import React, { Component } from 'react'
import { Card, Container } from 'semantic-ui-react'


// import { Grid } from 'semantic-ui-react'


class CartContainer extends Component {


    //// map over card and display them 

    // renderCards = () => {
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
    // }

    render() {
        return (
            <div>
              <h1>This is A Cart Container! ! !</h1>
                {/* <Container>
                    <Card.Group itemsPerRow={3}>
                            {this.renderCards()}
                    </Card.Group>
                </Container> */}

            </div>
        )
    }

}

export default CartContainer ;