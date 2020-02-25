import React, { Component } from 'react';
import { Menu, Input, Icon, Sticky, Image } from 'semantic-ui-react'
import {Link} from  'react-router-dom';
import logo from '../images/logo.png'

// yellow: eca400   dark:  4c243b     darker:  230c0f
class NavBar extends Component{


  render(){
    return(
      <div className="nav-bar" >
      <Sticky> 
      <div>
        <Menu pointing attached='top' inverted tabular margin-bottom="10em" style={{ backgroundColor: '#4C243B'}}>

          <Menu.Item> 
            <Link to="/" exact> 
              <Image src={logo} size='small' wrapped width="140px" centered/> 
            </Link>
          </Menu.Item>

          <Menu.Menu position='right'>

            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>

        <Menu.Item >
          <Link to="/login">
          {/* // onClick={this.handleUserIconClick} */}
            <Icon name='user' size='big' style={{color: 'white'}}/>
         </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to ="/cart">
            <Icon name='shopping cart' size='big' style={{color: 'white'}}></Icon>
          </Link>
        </Menu.Item>

        </Menu>

      </div>

      </Sticky>
    </div>
    )
  }
}
export default NavBar;