import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style.css';

export default class Button extends Component {
  render() {
    const { children, isDisable, loginHandle, datatestid } = this.props;
    return (
      <button
        disabled={ isDisable }
        type="button"
        className="button-style"
        data-testid={ datatestid }
        onClick={ loginHandle }
      >
        { children }
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isDisable: PropTypes.bool.isRequired,
  loginHandle: PropTypes.func.isRequired,
  datatestid: PropTypes.string.isRequired,
};
