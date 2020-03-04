import React, { Component } from 'react'

import { Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class ItemCard extends Component {

 handleItemClick = () => {
   console.log("handleClick", this.props.item)
  // console.log(this.props.history)
   this.props.onShowDetails(this.props.item)
   this.props.history.push(`/item-details/${this.props.item.id}`)

 }

  render() {
    // console.log("render", this.props.item)
    return(
      <div >

        <div className="card" onClick={() => this.handleItemClick()} style={{ paddingRight:"10px", paddingTop:"10px" }} >
          <Card raised 
            image={this.props.item.img} 
            header={this.props.item.name} 
            meta={"$ " + this.props.item.price}
          />
        </div>

      </div>
    )
  }
}
export default withRouter ( ItemCard );