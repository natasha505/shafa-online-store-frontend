import React, { Component } from "react";
import CardContainer from "../containers/CardContainer";
import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react';


class Home extends Component {
  render() {
    // console.log("HOME: ", this.props.availItems)
    return (
      <div>
        <div className="banner-container">
          <div className="banner-header">
           <h1> <font size="8">Welcom to Shafá </font></h1>
          </div>
          <div className="banner-p1">
            <p><b><font size="5"> Шафа</font></b> <font size="3"><i> noun </i> A tall recess or wardrobe with a door, used for storage of clothing.<br></br> 
            After selecting an item and proceding with checkout, you will be contected by the seller on how you would like to receive the desired item(s) and a desired method of payment.</font></p>
          </div>
          <div className="banner-p2">
            <p><font size="3"> Thank you for you interest in Shafá! </font></p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <CardContainer
            availItems={this.props.availItems}
            clearCategorySelect={this.props.clearCategorySelect}
            clearSearch={this.props.clearSearch}
            onShowDetails={this.props.onShowDetails}
            selectedItem={this.props.selectedItem}
          />
        </div>
        <div className="footer">
        <Segment inverted vertical style={{ padding: '2em 2em', backgroundColor: '#4C243B' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Connect With Me' />
              <List link inverted>
                <List.Item as='a' href="https://www.linkedin.com/in/nataliya-kruk-a898a272/" >LinkedIn</List.Item>
                <List.Item as='a' href="https://github.com/natasha505" >GitHub</List.Item>
                <List.Item as='a' href="https://medium.com/@tashtash555">Medium</List.Item>
                <List.Item as='a' href="mailto:tashtash555@gmail">E-Mail</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as='h4' content='About' />
              <p> Hello, my name is Natali! I have been learning programming at <a href="https://flatironschool.com/">Flatiron School</a> for a few months. As a final project I built this shopping webapplication. If you have any suggestions or advice on how I can import your experience using Shafá, feel free to connect with me via the links in the <b>Connect With Me</b> section to the left. </p> 
              <p>Thank you for you interest in my site! </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
        </div>
      </div>
    );
  }
}

export default Home;
