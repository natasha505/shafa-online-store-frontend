import React, { Component } from 'react';

import { Item, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'


class ItemDetails extends Component {

  render() {
    console.log(this.props.item)
    return(
      <div>Item Details
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={this.props.item.img} />
          </Item>
          <Item>
            <Item.Header as='h3'>{this.props.item.name}</Item.Header> <br></br>
          </Item>

        </Item.Group>

      </div>
    );

  }

}
export default withRouter (ItemDetails) ;