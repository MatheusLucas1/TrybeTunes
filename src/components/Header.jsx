import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import Logo from '../images/logo.svg';
import Favorite from '../images/favoriteStar.svg';
import Profile from '../images/profile.svg';
import ProfileImage from '../images/profile.png';
import Search from '../images/search.svg';
import '../style.css';

export default class Header extends Component {
  state = {
    name: '',
    isLoading: true,
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const user = await getUser();
    const { name } = user;
    this.setState({
      name,
      isLoading: false,
    });
  };

  render() {
    const { path } = this.props;
    const { name, isLoading } = this.state;
    return (
      <div className="header-main-box" data-testid="header-component">
        <img className="logoHeader" src={ Logo } alt="Trybetunes Logo" />
        <div className="menuOptions">
          <div className="pageSelection">
            <img
              className={
                path === '/search' ? 'selectedPage' : 'icon'
              }
              src={ Search }
              alt="Search Img"
            />
            <Link
              className={ path === '/search' ? 'selectedText' : 'redirect' }
              to="/search"
              data-testid="link-to-search"
            >
              Pesquisa
            </Link>
          </div>
          <div className="pageSelection">
            <img
              className={ path === '/favorites' ? 'selectedPage' : 'icon' }
              src={ Favorite }
              alt="Favorite Img"
            />
            <Link
              className={ path === '/favorites' ? 'selectedText' : 'redirect' }
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritos
            </Link>
          </div>
          <div className="pageSelection">
            <img
              className={ path === '/profile' ? 'selectedPage' : 'icon' }
              src={ Profile }
              alt="Profile Img"
            />
            <Link
              className={ path === '/profile' ? 'selectedText' : 'redirect' }
              to="/profile"
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </div>
        </div>
        <div className="profileInfos">
          {isLoading ? <Loading />
            : (
              <>
                <img
                  className="profileImage"
                  src={ ProfileImage }
                  alt="Profile Img"
                />
                <p className="profileName" data-testid="header-user-name">{name}</p>
              </>
            )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
};
