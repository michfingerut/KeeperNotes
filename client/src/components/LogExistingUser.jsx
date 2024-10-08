import React from 'react';
import backApi from '../services/backApi';

function LogExistingUser(props) {
  async function toLog(event) {
    event.preventDefault();
    const userInfo = await backApi.getUser(
      props.tmpUsr.email,
      props.tmpUsr.password,
    );
    props.setIsLoggedIn(true);
    props.setUserInfo({
      ...userInfo,
    });
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
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogExistingUser;
