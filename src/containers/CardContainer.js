import React, { Component } from 'react'
import ItemCard from '../components/ItemCard'

import { Grid } from 'semantic-ui-react'

//Card, Container, Item, Segment, Column

class CardContainer extends Component {

//map over cards & display them
  renderCards = () => {
    // console.log("CardContainer: ", this.props.allItems)
    return this.props.allItems.map(item => {
      // {console.log("CardContainer Item: ", item)}
      return (
          <Grid.Column>
            <ItemCard item={item} selectedItem={this.props.selectedItem} handleAddToCart={this.handleAddToCart} onShowDetails={this.props.onShowDetails} />
          </Grid.Column>
      )
    })
  }
// basic padded='very' raised >
  render() {
    return( 
      <div>
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

//  {console.log("cardContainer: ", item.name)}
//           <img style={{width: "200px"}} src={item.img} />
//           <h2>{item.name}</h2>
//           <p>Size: {item.size}</p>

//         <div className="item-container-div" style={{ paddingRight:"10px", paddingTop:"10px" }}> 
//        <ItemCard item={item} />
//        </div> 