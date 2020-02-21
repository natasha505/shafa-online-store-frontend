import React, { Component } from 'react';
import { Menu, Dropdown, Input, Icon, Sticky, Segment } from 'semantic-ui-react'
import {Link} from  'react-router-dom';

class NavBar extends Component{

  // state = {}

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  // yellow: eca400   dark:  4c243b     darker:  230c0f

  render(){
    return(
      <div className="nav-bar" >
      <Sticky> 
      <div>
        <Menu pointing size='massive' attached='top' inverted tabular margin-bottom="10em" style={{ backgroundColor: '#230c0f', paddingTop: '1em' }}>
          <Menu.Item
            name='home'
            // active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />

          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>

        {/* <Segment> */}
          <Icon name='user' size='big' style={{color: 'white'}}/>
          <Icon name='shopping cart' size='big' style={{color: 'white'}}/>
        {/* </Segment> */}
        </Menu>

      </div>


        {/* <Menu size='massive' attached='top' tabular margin-bottom='10em' style={{ backgroundColor: "#4c243b", paddingTop: '1em'}}>
          <Menu.Item
            name='something'
            // active={activeItem === 'editorials'}
            onClick={this.handleItemClick}
          >
            Editorials
          </Menu.Item>

          <Menu.Item
            name='reviews'
            // active={activeItem === 'reviews'}
            onClick={this.handleItemClick}
          >
            Reviews
          </Menu.Item>

          <Menu.Item
            name='upcomingEvents'
            // active={activeItem === 'upcomingEvents'}
            onClick={this.handleItemClick}
          >
            Upcoming Events
          </Menu.Item>

          <div className="right-menu">
            <Menu>
              <Menu.Item floated='right'>
                <Button ><Link to="/">Home</Link></Button>
              </Menu.Item>

              <Menu.Item floated='right'>
                <Button onClick={this.handleLogin} >log in</Button>
              </Menu.Item>
          </Menu>
          </div>

        </Menu> */}
      </Sticky>
    </div>
    )
  }
}
export default NavBar;

{/* <Menu.Item floated='right'>
<Button onClick={this.handleLogin} >{JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id ? <Link to="/">Log Out</Link> : <Link to="/login">Log In</Link> }</Button>
</Menu.Item> */}