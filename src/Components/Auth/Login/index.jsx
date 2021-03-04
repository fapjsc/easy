import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

export default class LoginForm extends Component {
  state = {
    phoneNumber: '',
    password: '',
    error: '',
  };

  // 保存使用者輸入的手機號碼到state
  setPhoneNumber = event => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };

  // 保存使用者輸入的密碼到state
  setPassword = event => {
    this.setState({
      password: event.target.value,
    });
  };

  // 表單提交
  handleLoginSubmit =  async (event) => {
    event.preventDefault(); //防止表單提交
    const { phoneNumber, password } = this.state;
    
    let url = 'http://10.168.192.1/j/login.aspx'

    // 解決跨域
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://10.168.192.10:3000/');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');
  


    const res = await fetch(url, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        Login_countrycode: 86,
        Login_tel: phoneNumber,
        login_pwd: password
      })
    })


    console.log(res)
  };

  render() {
    return (
      <div className="form-container">
          <Form>
            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Control
                className="form-input"
                size="lg"
                type="tel"
                placeholder="手機號碼"
                onChange={this.setPhoneNumber}
              />
              {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="form-input"
                size="lg"
                type="password"
                placeholder="密碼"
                onChange={this.setPassword}
              />
            </Form.Group>

            <Button
              onClick={this.handleLoginSubmit}
              className="form-btn"
              variant="primary"
              block
              type="submit"
            >
              登入
            </Button>
            <div className="forget_pw-box">
              <span className="forget_pw"></span>
              <button href="#" className="forget_pw-link">
                忘記密碼
              </button>
            </div>
          </Form>
      </div>
    );
  }
}
