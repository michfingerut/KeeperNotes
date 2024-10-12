import React from 'react';
import backApi from '../services/backApi';
import { ToastContainer } from 'react-toastify';

import { showError } from '../utils/errorUtils.js';
//TODO: forgot password button
function LogExistingUser(props) {
  async function toLog(event) {
    event.preventDefault();

    const form = event.target;
    if (!form.checkValidity()) {
      return;
    }

    let userInfo;
    try {
      userInfo = await backApi.getUser(
        props.tmpUsr.email,
        props.tmpUsr.password,
      );
    } catch (err) {
      switch (err?.status) {
        case 403:
          showError('Wrong password, please try again');
          break;
        case 404:
          showError('Non existing email, please try again');
          break;
        case 400:
          showError('Invalid email, please try again');
          break;
        default:
          showError('something went wrong, please try again later');
          break;
      }
      return;
    }

    localStorage.setItem('isLogged', true);
    localStorage.setItem('uuid', userInfo.uuid);
    props.setIsLogged(true);
  }

  return (
    <div className="sign-up-container">
      <form onSubmit={toLog} className="sign-up-form">
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
        <button type="submit">Log In</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LogExistingUser;
