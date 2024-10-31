// External modules
import React from 'react';
import { ToastContainer } from 'react-toastify';

// Internal modules
import backApi from '../services/backApi';
import { showError } from '../utils/errorUtils.js';
import {
  Container,
  SignUpForm,
  SignUpInput,
  LogButton,
} from '../styles/styles';

// TODO: forgot password button
function LogExistingUser(props) {
  ///////////////////// props /////////////////////
  const handleInput = props.handleInput;
  const tmpUsr = props.tmpUsr;
  const setIsLogged = props.setIsLogged;
  /////////////////////////////////////////////////

  async function toLog(event) {
    event.preventDefault();

    const form = event.target;
    if (!form.checkValidity()) {
      return;
    }

    let userInfo;
    try {
      userInfo = await backApi.getUser(tmpUsr.email, tmpUsr.password);
    } catch (err) {
      switch (err?.status) {
        case 403:
          showError('Wrong password, please try again');
          break;
        case 404:
          showError('Non-existing email, please try again');
          break;
        case 400:
          showError('Invalid email, please try again');
          break;
        default:
          showError('Something went wrong, please try again later');
          break;
      }
      return;
    }
    localStorage.setItem('isLogged', true);
    localStorage.setItem('uuid', userInfo.uuid);
    localStorage.setItem('groupId', '');
    setIsLogged(true);
  }

  return (
    <Container>
      <SignUpForm onSubmit={toLog}>
        <SignUpInput
          type="email"
          name="email"
          onChange={handleInput}
          value={tmpUsr.email}
          placeholder="Email"
          required
        />
        <SignUpInput
          type="password"
          name="password"
          onChange={handleInput}
          value={tmpUsr.password}
          placeholder="Password"
          required
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
          title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
        />
        <LogButton type="submit">Log In</LogButton>
      </SignUpForm>
      <ToastContainer />
    </Container>
  );
}

export default LogExistingUser;
