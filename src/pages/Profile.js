import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProfileImage from '../images/profile.png';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    isLoading: true,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const user = await getUser();
    const { name, email, image, description } = user;
    this.setState({
      isLoading: false,
      name,
      email,
      image,
      description,
    });
  }

  showProfile = (name, email, description) => (
    <div className="profileBox">
      <div>
        <p className="profileTitle">Nome</p>
        <p>{name}</p>
      </div>
      <div>
        <p className="profileTitle">E-mail</p>
        <p>{email}</p>
      </div>
      <div>
        <p className="profileTitle">Descrição</p>
        <p>{description}</p>
      </div>
      <Link to="/profile/edit" className="editProfile">Editar perfil</Link>
    </div>
  );

  render() {
    const { match } = this.props;
    const { isLoading, name, email, description, image } = this.state;
    return (
      <div className="profilePage" data-testid="page-profile">
        <Header path={ match.path } />
        <div className="profileBoxPage">
          <div className="mainSearchArea">
            <div className="searchArea">
              {isLoading ? <div> </div>
                : (
                  <img
                    className="profileImagePage"
                    data-testid="profile-image"
                    src={ image !== '' ? image : ProfileImage }
                    alt="Profile"
                  />
                )}
            </div>
          </div>
          {isLoading ? <div className="resultLoading"><Loading /></div>
            : this.showProfile(name, email, description)}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.string.isRequired,
};
