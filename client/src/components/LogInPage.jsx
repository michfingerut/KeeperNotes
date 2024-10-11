import React, { useState } from 'react';
import CreateNewUser from './CreateNewUser';
import LogExistingUser from './LogExistingUser';
import { FaArrowLeft } from 'react-icons/fa';

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

  return (
    <div className="log-in-container">
      <h1>
        {/*
        TODO: after adding routing, handle the return button
         <FaArrowLeft style={{ marginRight: '8px' }} /> */}
        Hello
      </h1>
      {isInitOption ? init() : option()}
    </div>
  );
}

export default LogInPage;
