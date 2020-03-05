import React, { Component } from "react";

import { Button, Icon, Item, Label } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class ItemDetails extends Component {

  handleAddToCart = item => {
    console.log("handleAddITEM", item)
    console.log("handleAdd USER ID", this.props.userId)
    fetch("http://localhost:3000/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: this.props.userId,
        item_id: item.id
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("itemDetails DATA", data.id);
        if (!data.error) {
          this.props.setUserCart(data);
          this.props.history.push("/cart")
        } else {
          alert(data.error);
        }
      });
  };

  state = {
    item: null
  };

  
  componentDidMount() {
    // console.log("ITEM ID compDidMount", thisItem.id);
    // console.log("PARAMS ID", this.props.match.params.id);
    this.props.availItems.forEach(thisItem => {
      if (thisItem.id === parseInt(this.props.match.params.id)) {
        this.setState({ item: thisItem });
      }
    });
  }

  render() {
    // console.log("IDEM DETAILS___", this.props.availItems)
    // console.log("ItemDetails", this.item)
    // console.log("ItemDetails userId: ", this.props.userId)
    const { item } = this.state;
    return (
      <>
        {item !== null ? (
          <div className="details-container">
            <h1>ITEM DETAILS</h1>
            <div className="item-details">
              <Item.Group>
                <Item>
                  <Item.Image src={item.img} size="medium" rounded />
                  <Item.Content>
                    <Item.Header>
                      <h1>{item.name}</h1>
                    </Item.Header>
                    <br></br>
                    <Item.Header>{item.brand}</Item.Header>
                    <Item.Meta>
                      <span className="price">
                        <h1>$ {item.price}</h1>
                      </span>
                      <br></br>
                      <span className="size">Size: {item.size}</span>
                      <br></br>
                    </Item.Meta>
                    <Item.Extra>
                      <Label> {item.category.category_name} </Label>
                      <Label> {item.color} </Label>
                      <Label> {item.condition} </Label>
                    </Item.Extra>
                    <Item.Description>{item.details}</Item.Description>
                    <br></br>

                    {!!this.props.loggedIn ? (
                      <>
                        <Button
                          size="medium"
                          floated="right"
                          attached="bottom"
                          animated="fade"
                          onClick={() => this.handleAddToCart(item)}
                        >
                          <Button.Content hidden>Add To Cart</Button.Content>
                          <Button.Content visible>
                            <Icon name="shop" />
                          </Button.Content>
                        </Button>
                      </>
                    ) : null}

                  </Item.Content>
                </Item>
              </Item.Group>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
export default withRouter(ItemDetails);
