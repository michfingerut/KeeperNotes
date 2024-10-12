import React, { useState } from 'react';
import CreateNewUser from './CreateNewUser';
import LogExistingUser from './LogExistingUser';
import { RiArrowGoBackLine } from 'react-icons/ri';

function LogInPage(props) {
  const [isInitOption, setIsInitOption] = useState(true);
  const [toSignUp, setToSignUp] = useState(false);

  const [tmpUsr, setTmpUsr] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  });

  function init() {
    return (
      <div>
        <button onClick={() => setIsInitOption(false)}>Log In</button>
        <button
          onClick={() => {
            setIsInitOption(false);
            setToSignUp(true);
          }}
        >
          Sign Up
        </button>
      </div>
    );
  }

  function option() {
    return toSignUp ? (
      <CreateNewUser
        handleInput={handleInput}
        tmpUsr={tmpUsr}
        setIsLogged={props.setIsLogged}
      />
    ) : (
      <LogExistingUser
        handleInput={handleInput}
        tmpUsr={tmpUsr}
        setIsLogged={props.setIsLogged}
      />
    );
  }

  function handleInput(event) {
    const { value, name } = event.target;
    setTmpUsr((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function goBack() {
    setIsInitOption(true);
    setToSignUp(false);
  }

  return (
    <div className="log-in-container">
      <h1>
        {!isInitOption ? (
          <RiArrowGoBackLine
            onClick={() => goBack()}
            style={{
              marginRight: '10px',
              cursor: 'pointer',
              width: '25px',
            }}
          />
        ) : (
          <div></div>
        )}
        Hello
      </h1>

      <div>{isInitOption ? init() : option()}</div>
    </div>
  );
}

export default LogInPage;
