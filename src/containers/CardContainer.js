import React, { Component } from 'react'
import ItemCard from '../components/ItemCard'

import { Grid } from 'semantic-ui-react'


class CardContainer extends Component {

  componentWillUnmount(){
    // console.log("CLEARED")
    this.props.clearSearch();
  }

//map over cards & display them
  renderCards = () => {
    // console.log("CardContainer: ", this.props.allItems)
    return this.props.availItems.map((item, id) => {
      // {console.log("CardContainer Item: ", item)}
      return (
          <Grid.Column key={id}>
            <ItemCard 
              clearCategorySelect={this.props.clearCategorySelect}
              handleAddToCart={this.handleAddToCart} 
              item={item} 
              key={id} 
              onShowDetails={this.props.onShowDetails} 
              selectedItem={this.props.selectedItem} 
            />
          </Grid.Column>
      )
    })
  }
// basic padded='very' raised >
  render() {
    return( 
      <div className="card-container">
        <Grid>
          <Grid.Row columns={4}>
            {/* <Grid.Column> */}
            {this.renderCards()}
            {/* </Grid.Column> */}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
 export default CardContainer;