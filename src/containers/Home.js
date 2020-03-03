import React, { Component } from 'react'
import CardContainer from '../containers/CardContainer'

class Home extends Component {


  render(){
    return(
      <div style={{textAlign: "center" }}>
        <h1></h1>
        <h1 className="home-page" >HOME PAGE</h1>
        <CardContainer availItems={this.props.availItems} selectedItem={this.props.selectedItem} onShowDetails={this.props.onShowDetails} /> 
      </div>
    )
  }

}

export default Home;

// onShowDetails={this.props.onShowDetails}