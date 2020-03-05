import React, { Component } from "react";
import AdminPage from "../components/AdmidPage";

import { Item } from "semantic-ui-react";

class AdminContainer extends Component {

  state = {ready: false}
  
  componentDidMount() {
    console.log(this.props.userId);
    fetch(`http://localhost:3000/users/${this.props.userId}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (!json.admin || this.props.userId === "") {
          this.props.history.push("/");
        } else {
          this.setState({ready: true})
        }
      });
  }

  isReady = () => this.state.ready

  displayPendingItem = () => {
    return this.props.pendingItems.map((item, index) => {
      return (
        <Item>
          <AdminPage 
            key={index} 
            item={item} 
            fetchAvailItems={this.props.fetchAvailItems} 
            fetchPendingItems={this.props.fetchPendingItems} />
        </Item>
      );
    });
  };

  render() {
    // console.log("::::AdminContainer::::", this.props.pendingItems)
    return (
      <>
        {this.isReady() ? (
          <div className="admin-container">
            <h1> Admin view Page </h1>
            <div className="admin-appt-card">
              <Item.Group>{this.displayPendingItem()}</Item.Group>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
export default AdminContainer;
