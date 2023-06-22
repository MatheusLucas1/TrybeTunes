import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Favorite from '../images/favorite.svg';
import FavoriteCheck from '../images/favoriteChecked.svg';

export default class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, toggleFavorite, isChecked } = this.props;
    return (
      <div className="musicCard">
        <span className="trackName">{trackName}</span>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            className="favoriteButton"
            name=""
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ toggleFavorite }
            checked={ isChecked }
          />
          <img
            src={ isChecked ? FavoriteCheck : Favorite }
            alt="Favorite"
            className="favoriteIconButton"
          />
          <span className="hidden">Favorita</span>
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
};
