import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import Logo from '../images/logo.svg';
import '../style.css';

export default class Login extends Component {
  state = {
    user: '',
    isDisable: true,
    isLoading: false,
  };

  checkCharacters = ({ target }) => {
    const minCharacters = 3;
    if (target.value.length >= minCharacters) {
      return this.setState({ isDisable: false, user: target.value });
    }
    return this.setState({ isDisable: true, user: target.value });
  };

  loginHandle = async (e) => {
    e.preventDefault();
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true }, async () => {
      await createUser({ name: user });
      this.setState({
        isLoading: false,
      });
      history.push('/search');
    });
  };

  render() {
    const { isDisable, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="login-main-box" data-testid="page-login">
        <div className="login-box">
          <img className="logo" src={ Logo } alt="Trybetunes Logo" />
          <input
            type="text"
            name="loginName"
            id="loginName"
            onChange={ this.checkCharacters }
            data-testid="login-name-input"
            placeholder="Qual é o seu nome?"
          />
          <Button
            datatestid="login-submit-button"
            loginHandle={ this.loginHandle }
            isDisable={ isDisable }
          >
            Entrar
          </Button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
