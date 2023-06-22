import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    search: '',
    artist: undefined,
    isDisable: true,
    isLoading: false,
    didSearch: false,
    albuns: [],
  };

  checkCharacters = ({ target }) => {
    const minCharacters = 2;
    if (target.value.length >= minCharacters) {
      return this.setState({ isDisable: false, search: target.value });
    }
    return this.setState({ isDisable: true, search: target.value });
  };

  handleSearch = async () => {
    const { search } = this.state;
    this.setState({
      didSearch: false,
      isLoading: true,
      artist: undefined,
      albuns: [],
      search: '' }, async () => {
      const albuns = await searchAlbumsAPI(search);
      this.setState({
        artist: search,
        isLoading: false,
        albuns,
        didSearch: true,
      });
    });
  };

  showSongs = (songs) => songs
    .map(({ artworkUrl100, collectionName, artistName, collectionId }) => (
      <div key={ collectionId }>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          <img className="albumImage" src={ artworkUrl100 } alt="Album" />
        </Link>
        <p className="albumName">{`${collectionName}`}</p>
        <p className="artistName">{`${artistName}`}</p>
      </div>
    ));

  render() {
    const { isDisable, search, isLoading, artist, albuns, didSearch } = this.state;
    const { match } = this.props;

    return (
      <div className="searchPage" data-testid="page-search">
        <Header path={ match.path } />
        <div>
          <div className="searchArea">
            <input
              data-testid="search-artist-input"
              type="text"
              name=""
              value={ search }
              id="searchInput"
              onChange={ this.checkCharacters }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              className="searchButton"
              disabled={ isDisable }
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </div>
          {!didSearch
            ? <div> </div>
            : (
              <div>
                {albuns.length === 0 && didSearch
                  ? (
                    <p className="resultSearch">
                      Nenhum álbum foi encontrado
                    </p>
                  ) : (
                    <p className="resultSearch">
                      {`Resultado de álbuns de: ${artist}`}
                    </p>
                  )}
              </div>
            )}
          <div className="resultLoading">
            {(isLoading) ? <Loading /> : <div> </div> }
          </div>
          <div className="allSongs">
            {this.showSongs(albuns)}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  match: PropTypes.string.isRequired,
};
