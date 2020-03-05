import React, { Component } from 'react';

import logo from '../images/logo.png';

import { Dropdown, Icon, Image, Input, Menu, Sticky } from 'semantic-ui-react';
import { Link } from  'react-router-dom';

// yellow: eca400   dark:  4c243b     darker:  230c0f
class NavBar extends Component{


  userIcon = () => {
    if (this.props.loggedIn){
      return(
        <Link to="/my-account">
           <Icon name='user' size='big' style={{color: 'white'}}/>
        </Link>
      ) 
    }else{
      return(
        <Link to="/login">
           <Icon name='user' size='big' style={{color: 'white'}}/>
        </Link>
      )
    }
  }

  handleSearch = e => {
    // console.log("handleSearchChange ::: ", e)
    this.props.onSearch(e);

  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT")
  }


  handleSelect = (category) => {
    // console.log("change____", category.items)
    this.props.categorySelect(category.items)
    
  }

  categoryOptions = () => {
    return this.props.categories.map((c, id)=> {
      return <Dropdown.Item text={c.category_name} key={id} onClick={() => this.handleSelect(c)} />
      // console.log("__________________",c.category_name)
    })
  }

  render(){
    // console.log("NAV_BAR:", this.props.availItems)
    // console.log("NavBar: ", this.props )
    // console.log("userName :", this.props.userName)
    return(
      <div className="nav-bar" >
      <Sticky> 
      <div>
        <Menu pointing attached='top' inverted tabular margin-bottom="10em" style={{ backgroundColor: '#4C243B'}}>
          <Menu.Item> 
            <Link to="/" >  
              <Image src={logo} size='small' wrapped width="140px" centered/> 
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Dropdown text='Categories' simple item  >
              <Dropdown.Menu  >
                {this.categoryOptions()}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item>
              <form onSubmit={this.handleSubmit}>
                <Input icon='search' placeholder='Search...' onChange={this.handleSearch} value={this.props.search} />
              </form>
            </Menu.Item>
          </Menu.Menu>

        <Menu.Item >
         {this.userIcon()}
          {/* // onClick={this.handleUserIconClick} */}
            {/* <Icon name='user' size='big' style={{color: 'white'}}/> */}
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