import React from 'react';
import backApi from '../services/backApi';

//TODO: add invalid password
function CreateNewUser(props) {
  async function createUser(event) {
    event.preventDefault();

    //TODO: err handling
    const userInfo = await backApi.postUser(props.tmpUsr);
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
          type="password"
          name="password"
          onChange={props.handleInput}
          value={props.tmpUsr.password}
          placeholder="Password"
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default CreateNewUser;
