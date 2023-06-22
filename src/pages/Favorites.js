import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Favorites extends Component {
  state = {
    isLoading: true,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs,
    });
  }

  toggleFavorite = async (songId) => {
    this.setState({ isLoading: true }, async () => {
      const { favoriteSongs } = this.state;
      const allSongs = favoriteSongs.find(({ trackId }) => trackId === songId);
      await removeSong(allSongs);
      const favSongs = await getFavoriteSongs();
      this.setState({
        isLoading: false,
        favoriteSongs: favSongs,
      });
    });
  };

  showFavoriteSongs = (songs) => songs
    .map(({ previewUrl, trackName, trackId }) => (
      <MusicCard
        previewUrl={ previewUrl }
        trackName={ trackName }
        trackId={ trackId }
        toggleFavorite={ () => this.toggleFavorite(trackId) }
        key={ trackId }
        isChecked="true"
      />
    ));

  render() {
    const { match } = this.props;
    const { isLoading, favoriteSongs } = this.state;
    return (
      <div className="favoritePage" data-testid="page-favorites">
        <Header path={ match.path } />
        <div>
          <div className="searchArea">
            <h1 className="favoriteTitle">Músicas Favoritas</h1>
          </div>
          {isLoading ? <div className="resultLoading"><Loading /></div> : (
            <div className="allFavoriteSongs">
              {favoriteSongs.length > 0 ? this.showFavoriteSongs(favoriteSongs)
                : (
                  <div className="resultLoading">
                    Você não tem nenhuma música nos seus favoritos.
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  match: PropTypes.string.isRequired,
};
