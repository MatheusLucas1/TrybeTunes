import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    artist: '',
    album: '',
    songs: [],
    favSongs: [],
    isLoading: true,
    showAlbum: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const songs = await getMusics(match.params.id);
    const { artistName, collectionName } = songs[0];
    const findOnlySongs = songs.filter(({ trackId }) => trackId);
    const favSongs = await this.readFavSongs();
    this.setState({
      songs: findOnlySongs,
      isLoading: false,
      artist: artistName,
      album: collectionName,
      favSongs,
      albumUrl: songs[0].artworkUrl100,
      showAlbum: true,
    });
  }

  displaySongs = (songs) => {
    const { favSongs } = this.state;
    return songs.map(({ previewUrl, trackName, trackId }) => (
      <MusicCard
        previewUrl={ previewUrl }
        trackName={ trackName }
        trackId={ trackId }
        toggleFavorite={ (e) => this.toggleFavorite(e, trackId) }
        key={ trackId }
        isChecked={ favSongs.includes(trackId) }
      />
    ));
  };

  toggleFavorite = async (e, songId) => {
    this.setState({ isLoading: true }, async () => {
      const { songs } = this.state;
      const favoriteSong = songs.find(({ trackId }) => trackId === songId);
      if (e.target.checked) await addSong(favoriteSong);
      else await removeSong(favoriteSong);
      const favSongs = await this.readFavSongs();

      this.setState({
        isLoading: false,
        favSongs,
      });
    });
  };

  readFavSongs = async () => {
    const readSavedSongs = await getFavoriteSongs();
    return readSavedSongs.map(({ trackId }) => trackId);
  };

  render() {
    const { artist, album, isLoading, songs, albumUrl, showAlbum } = this.state;
    return (
      <div className="albumPage" data-testid="page-album">
        <Header />
        <div className="songsAside">
          <div className="searchArea">
            {!showAlbum ? <div> </div>
              : (
                <img className="albumDisplay" src={ albumUrl } alt="Album Cover" />
              )}
            <div className="albumInfo">
              <p className="albumStyle" data-testid="album-name">{album}</p>
              <p className="artistStyle" data-testid="artist-name">{artist}</p>
            </div>
          </div>
          {isLoading ? <div className="resultLoading"><Loading /></div>
            : (
              <div className="playSongsBox">
                {this.displaySongs(songs)}
              </div>
            )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
};
