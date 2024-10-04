import React, { useState } from 'react';

function LogInPage(props) {
  //props.logInFunc
  //props.setUserInfo

  /***
   * if i pressed log in it will show:
   * user name input
   * pass word input
   * log in button -> at press it will send get user by if
   * it will check if the pass word is the same
   * if not -> error in valid password
   * if yes -> save userInfo, set loged in -> true
   *
   * if i pressed sign up it will show:
   * user name input
   * password input (in the future validation)
   * first name
   * last name
   * email
   * sign up button. when press:
   * email exists- invalid email
   * password not good
   * if all good save userInfo and set log in true
   */
  const [isInitOption, setIsInitOption] = useState(true);
  const [toSignUp, setToSignUp] = useState(false);

  function init() {
    return (
      <div>
        <button onClick={() => console.log('Log In Clicked')}>Log In</button>
        <button onClick={() => console.log('Sign Up Clicked')}>Sign Up</button>
      </div>
    );
  }

  function option() {
    if (toSignUp) {
      return signUp();
    } else {
      return logIn();
    }
  }

  function signUp() {}

  function logIn() {}

  return (
    <div className="log-in-container">
      <h1>Hello</h1>
      {isInitOption ? init() : option()}
    </div>
  );
}

export default LogInPage;
