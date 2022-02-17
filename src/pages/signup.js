import React from 'react'
import './code_css/signup.css'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: true,
      registerState: false
    };
  }


  displayLogin() {
    this.setState({ registerState: false, loginState: true })
  }

  displayRegister() {
    this.setState({ registerState: true, loginState: false })
  }

  render() {
    return (
      <div className="main_contain">
        <div className="sign_img"></div>
        <div className="box_contain">
          <div className="box_control">
            <div className={this.state.loginState ? 'actives' : 'control'} onClick={this.displayLogin.bind(this)}>
              Login
            </div>
            <div className={this.state.registerState ? 'actives' : 'control'} onClick={this.displayRegister.bind(this)}>
              Register
            </div>

            <div className="box-contain">
              {this.state.loginState && <LoginComp />}
              {this.state.registerState && <RegisterComp />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class LoginComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  login_submit(e) {

  }

  render() {

    return (
      <div className="inner_box">

        <div className="box_head">
          Login
        </div>
        <div className="input_group">
          <label htmlFor="username"> Username</label>
          <input type="text" name="username" className="login_input" placeholder="Username" />
        </div>

        <div className="input_group">
          <label htmlFor="password"> Password</label>
          <input type="password" name="password" className="login_input" placeholder="Password" />
        </div>
        <button type="button" className="login_btn" onClick={this.login_submit.bind(this)}> Login </button>
      </div>

    )
  }
}

class RegisterComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  login_register(e) {

  }

  render() {
    return (
      <div className="inner_box">
        <div className="box_head">
          Register
        </div>
        <div className="input_group">
          <label htmlFor="usernmae"> Password</label>
          <input type="text" name="username" className="login_input" placeholder="Username" />
        </div>

        <div className="input_group">
          <label htmlFor="password"> Password</label>
          <input type="password" name="password" className="login_input" placeholder="Password" />
        </div>
        <button type="button" className="login_btn" onClick={this.login_register.bind(this)}> Login </button>
      </div>

    )
  }
}

export default Signup;