// External modules
import React from 'react';
import { ToastContainer } from 'react-toastify';

// Internal modules
import backApi from '../services/backApi';
import { showError } from '../utils/errorUtils.js';
import {
  SignUpContainer,
  SignUpForm,
  SignUpInput,
  LogButton,
} from '../styles/styles';

// TODO: add invalid password

function CreateNewUser(props) {
  async function createUser(event) {
    let userInfo;
    event.preventDefault();

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
          showError('Something went wrong, please try again later');
          break;
      }
      return;
    }

    try {
      await backApi.postGroup(props.tmpUsr.firstName, userInfo.userId);
    } catch (err) {
      await backApi.deleteUser(userInfo.userId);
      showError('Something went wrong, please try again later');
      return;
    }

    localStorage.setItem('uuid', userInfo.userId);
    localStorage.setItem('isLogged', true);
    localStorage.setItem('groupId', '');

    props.setIsLogged(true);
  }

  return (
    <SignUpContainer>
      <SignUpForm onSubmit={createUser}>
        <SignUpInput
          type="text"
          name="firstName"
          onChange={props.handleInput}
          value={props.tmpUsr.firstName}
          placeholder="First name"
          required
        />
        <SignUpInput
          type="text"
          name="lastName"
          onChange={props.handleInput}
          value={props.tmpUsr.lastName}
          placeholder="Last name"
          required
        />
        <SignUpInput
          type="email"
          name="email"
          onChange={props.handleInput}
          value={props.tmpUsr.email}
          placeholder="Email"
          required
        />
        <SignUpInput
          type="password"
          name="password"
          onChange={props.handleInput}
          value={props.tmpUsr.password}
          placeholder="Password"
          required
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
          title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
        />
        <LogButton type="submit">Sign Up</LogButton>
      </SignUpForm>
      <ToastContainer />
    </SignUpContainer>
  );
}

export default CreateNewUser;
