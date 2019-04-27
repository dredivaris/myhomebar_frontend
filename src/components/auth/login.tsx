import { AUTH_TOKEN } from '@/constants';
import { CREATE_USER, LOGIN_USER } from '@/queries/graphene_graphql_mutations';
import * as Cookies from 'js-cookie';
import React, { Component } from 'react';
import withApollo from 'react-apollo/withApollo';
import { withRouter } from 'react-router';

class Login extends Component {
  state = {
    email: '',
    login: true, // switch between Login and SignUp
    name: '',
    password: '',
  };
  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <div className="pointer mr2 button" onClick={() => this._confirm()}>
            {login ? 'login' : 'create account'}
          </div>
          <div className="pointer button" onClick={() => this.setState({ login: !login })}>
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }

  _confirm = async () => {
    const { client } = this.props;
    const { login } = this.state;
    if (login) {
      try {
        const res = await client.mutate({
          mutation: LOGIN_USER,
          variables: { username: this.state.email, password: this.state.password },
        });
        if (res.errors) {
          console.log('there was some error during login');
          return;
        }
        const token = res.data.tokenAuth.token;
        Cookies.set('homebarToken', token);
        this.props.history.push('/');
      } catch (error) {
        console.log('there was a failure during login', error);
      }
    } else {
      console.log('in registration');
      let firstName = null;
      let lastName = null;
      try {
        firstName = this.state.name.split(/[ ]+/)[0];
      } catch {
        firstName = '';
      }
      try {
        lastName = this.state.name.split(/[ ]+/)[1];
      } catch {
        lastName = '';
      }
      try {
        console.log('values', this.state.email);
        const res = await client.mutate({
          mutation: CREATE_USER,
          variables: {
            email: this.state.email,
            firstName,
            lastName,
            password: this.state.password,
            username: this.state.email,
          },
        });
        console.log('res is', res);
        if (res.errors) {
          console.log('there was some error during registration');
          return;
        }
        const token = res.data.tokenAuth.token;
        // TODO: may be able to remove cookie storage, add register and get logged in user stuff
        // rather than all stuff in recipes
        Cookies.set('homebarToken', token);
        // localStorage.setItem('homebarToken', token);

        console.log('setting cookie token');
      } catch (error) {
        console.log('there was a failure during registration');
      }
    }
  };
  _saveUserData = (token: string) => {
    console.log('in save user data');

    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default withRouter(withApollo(Login));
