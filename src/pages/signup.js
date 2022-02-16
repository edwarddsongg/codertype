import React from 'react'

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    <div className="main_contain">
      <div className="box-contain">
        <div className="box-control">
          <div className="control">
            Login
          </div>
            Register
        </div>
      </div>
    </div>
  }
}

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    <div className="inner-box">
      <div className="input_group">
        <label htmlFor="usernmae"> Password</label>
        <input type="text" name="username" className="login_input" placeholder="Username" />
      </div>

      <div className="input_group">
        <label htmlFor="password"> Password</label>
        <input type="password" name="password" className="login_input" placeholder="Password" />
      </div>
    </div>
  }
}

export default Signup;