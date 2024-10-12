import React from 'react';
import backApi from '../services/backApi';
import { ToastContainer } from 'react-toastify';

import { showError } from '../utils/errorUtils.js';

//TODO: add invalid password
function CreateNewUser(props) {
  async function createUser(event) {
    event.preventDefault();
    let userInfo;
    try {
      userInfo = await backApi.postUser(props.tmpUsr);
    } catch (err) {
      switch (err?.status) {
        case 403:
          showError('Email already exists');
          break;
        case 400:
          showError(
            'Invalid email, please make sure you are entering a valid email',
          );
          break;
        default:
          showError('something went wrong, please try again later');
          break;
      }
      return;
    }

    localStorage.setItem('uuid', userInfo.userId);
    localStorage.setItem('isLogged', true);
    props.setIsLogged(true);
  }

  return (
    <div className="sign-up-container">
      <form onSubmit={createUser} className="sign-up-form">
        <input
          type="text"
          name="firstName"
          onChange={props.handleInput}
          value={props.tmpUsr.firstName}
          placeholder="First name"
          required
        />
        <input
          type="text"
          name="lastName"
          onChange={props.handleInput}
          value={props.tmpUsr.lastName}
          placeholder="Last name"
          required
        />
        <input
          type="email"
          name="email"
          onChange={props.handleInput}
          value={props.tmpUsr.email}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={props.handleInput}
          value={props.tmpUsr.password}
          placeholder="Password"
          required
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
          title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
        />
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateNewUser;
