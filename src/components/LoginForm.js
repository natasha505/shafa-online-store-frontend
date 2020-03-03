import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import logo from '../images/logo.png'

class LoginForm extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleLogin = () => {
    this.props.onLogin(this.state)
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
    return (
      <Container style={{padding: "20px"}}>
            <Grid textAlign='center' style={{ height: '100vh' }} >
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center' style={{padding: "20px", }}>
                     Log-in to your account
                </Header>
                <Form size='large' onSubmit={this.handleLogin}>
                    <Segment stacked>
                    <Form.Input fluid icon='user' onChange={this.handleChange} value={this.state.username} name='username' iconPosition='left' placeholder='username' />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password'
                        onChange={this.handleChange}
                        value={this.state.password}
                    />
                    <Button color='teal' fluid size='large'>
                        Login
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    Don't Have Account? <Link to='/sign-up'>Sign up</Link>
                </Message>
                </Grid.Column>
            </Grid>
            </Container>
    )
  }
}

export default LoginForm;