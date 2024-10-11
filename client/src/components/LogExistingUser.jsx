import React from 'react';
import backApi from '../services/backApi';

function LogExistingUser(props) {
  async function toLog(event) {
    event.preventDefault();

    const form = event.target;
    if (!form.checkValidity()) {
      return;
    }

    const userInfo = await backApi.getUser(
      props.tmpUsr.email,
      props.tmpUsr.password,
    );

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
    </div>
  );
}

export default LogExistingUser;
