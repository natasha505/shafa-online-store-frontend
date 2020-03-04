import React, { Component } from 'react';
// import { Header, Button, Segment } from 'semantic-ui-react';
import './Login.css';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// import LoginForm from '../components/LoginForm';

class Login extends Component {

  goHome() {
    this.props.history.push("/")
  }

  render() {

    const responseFacebook = (response) => {
      console.log("FACEBOOK", response.picture.data.url)
      console.log(response);
      fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: response.name,
          email: response.email,
          password: "",
          location: "",
          img: response.picture.data.url
        })
      }).then(res => res.json()).then(data => {
        console.log("FACEBOOK USER", data)
        localStorage.setItem("user", JSON.stringify(data))
        this.props.setUserState(data)
        this.goHome();
      })
    }

    const responseGoogle = (response) => {
      console.log(response);
      fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: response.profileObj.name,
          email: response.profileObj.email,
          password: "",
          location: "",
          img: response.profileObj.imageUrl
        })
      }).then(res => res.json())
      .then(data => {
        console.log("GOOGLE USER", data)
        localStorage.setItem("user", JSON.stringify(data))
        this.props.setUserState(data)
        this.goHome();
      })
    }

    return (
      <div className="login-container" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >

        <div className="login"  >
        <div className="App" > 
          <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
          
          <FacebookLogin
            appId="661102974659448" //APP ID NOT CREATED YET
            fields="name,email,picture"
            callback={responseFacebook}
          />
          <br />
          <br />
          
          <GoogleLogin
            clientId="863619760864-njitoje0ivk37mbj740prkn21sj1ltdv.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
          {/* <LoginForm /> */}
        </div>

      </div>
    )
  }
}
  
export default Login;

