import React, { Component } from 'react';
import AdminPage from '../components/AdmidPage';

import { Item } from 'semantic-ui-react';


class AdminContainer extends Component {

  displayPendingItem = () => {
    return this.props.pendingItems.map((item, index) => {
      return <Item >
        <AdminPage key={index} item={item} />
        </Item>
    })
  }

  render() {
    // console.log("::::AdminContainer::::", this.props.pendingItems)
    return(
      <div className="admin-container">
        <h1> Admin view Page </h1>
        <div className="admin-appt-card">
          <Item.Group>
            {this.displayPendingItem()}
          </Item.Group>
        </div>

      </div>
    )
  }

}
export default AdminContainer;