import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import ProfileImage from '../images/profile.png';

export default class ProfileEdit extends Component {
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

  toggleButton = () => {
    const { image, name, email, description } = this.state;
    return (image === ''
    || name === ''
    || email === ''
    || description === '');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { image, name, email, description } = this.state;
    const { history } = this.props;
    const user = {
      image,
      name,
      email,
      description,
    };

    updateUser(user);
    history.push('/profile');
  };

  showForm = (name, email, description, isDisabled) => (
    <div>
      <div>
        <h1 className="profileTitle">Nome</h1>
        <p>Fique a vontade para usar seu nome social</p>
        <div className="mb-3">
          <input
            type="text"
            className="form-control textField"
            name="name"
            data-testid="edit-input-name"
            onChange={ this.handleChange }
            value={ name }
            placeholder="name@example.com"
          />
        </div>
      </div>
      <div>
        <h1 className="profileTitle">E-Mail</h1>
        <p>Escolha um e-mail que consulte diariamente</p>
        <div className="mb-3">
          <input
            type="email"
            className="form-control textField"
            name="email"
            data-testid="edit-input-email"
            onChange={ this.handleChange }
            value={ email }
            placeholder="nome@email.com.br"
          />
        </div>
      </div>
      <div>
        <h1 className="profileTitle">Descrição</h1>
        <div className="mb-3">
          <textarea
            className="form-control textAreaControl"
            rows="3"
            name="description"
            data-testid="edit-input-description"
            onChange={ this.handleChange }
            value={ description }
          />
        </div>
      </div>
      <button
        type="button"
        className="saveProfile"
        disabled={ isDisabled }
        onClick={ this.handleSubmit }
        data-testid="edit-button-save"
      >
        Salvar
      </button>
    </div>
  );

  render() {
    const { isLoading, image, name, email, description } = this.state;
    const isDisabled = this.toggleButton();
    return (
      <div className="editProfilePage" data-testid="page-profile-edit">
        <Header />
        <div className="profileBoxPage">
          <div className="mainSearchArea">
            <div className="searchArea">
              {isLoading ? <div> </div>
                : (
                  <div>
                    <img
                      className="profileImagePage"
                      data-testid="profile-image"
                      src={ image !== '' ? image : ProfileImage }
                      alt="Profile"
                    />
                    <input
                      className="inputImage"
                      type="text"
                      name="image"
                      value={ image }
                      placeholder="Insira um link"
                      onChange={ this.handleChange }
                      data-testid="edit-input-image"
                    />
                  </div>
                )}
            </div>
          </div>
          {isLoading ? <div className="resultLoading"><Loading /></div>
            : this.showForm(name, email, description, isDisabled)}
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
