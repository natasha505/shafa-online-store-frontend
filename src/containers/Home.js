import React, { Component } from "react";
import CardContainer from "../containers/CardContainer";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="banner-container">
          <div className="banner-header">
           <h1> Welcom to Shafá</h1>
          </div>
          <div className="banner-p1">
            <p>After selecting an item and proceding with checkout, you will be contected by the seller on how you would like to receive the desired item(s) and a desired method of payment.</p>
          </div>
          <div className="banner-p2">
            <p>Thank you for you interest in Shafá </p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <CardContainer
            availItems={this.props.availItems}
            clearSearch={this.props.clearSearch}
            onShowDetails={this.props.onShowDetails}
            selectedItem={this.props.selectedItem}
          />
        </div>
      </div>
    );
  }
}

export default Home;
