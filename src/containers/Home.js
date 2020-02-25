import React, { Component } from 'react'
import CardContainer from '../containers/CardContainer'

class Home extends Component {


  render(){
    return(
      <div style={{textAlign: "center" }}>
        <h1 >HOME PAGE</h1>
        <CardContainer allItems={this.props.allItems}  onShowDetails={this.props.onShowDetails} /> 
      </div>
    )
  }

}

export default Home;

// onShowDetails={this.props.onShowDetails}