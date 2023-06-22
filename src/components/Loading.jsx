import React, { Component } from 'react';
import LoadingImage from '../images/loading.svg';

export default class Loading extends Component {
  render() {
    return (
      <div className="loadingBox">
        <img className="loading" src={ LoadingImage } alt="Loading Img" />
        <p>Carregando...</p>
      </div>
    );
  }
}
