//External modules
import React, { useState } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';

//Internal modules
import CreateNewUser from '../components/CreateNewUser';
import LogExistingUser from '../components/LogExistingUser';
import {
  GlobalStyle,
  LogInContainer,
  LogInH1,
  LogButton,
} from '../styles/styles';

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
        <LogButton onClick={() => setIsInitOption(false)}>Log In</LogButton>
        <LogButton
          onClick={() => {
            setIsInitOption(false);
            setToSignUp(true);
          }}
        >
          Sign Up
        </LogButton>
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
    <div>
      <GlobalStyle />
      <LogInContainer>
        <LogInH1>
          {!isInitOption ? (
            <RiArrowGoBackLine
              onClick={() => goBack()}
              style={{
                marginRight: '10px',
                cursor: 'pointer',
                width: '20px',
              }}
            />
          ) : (
            <div style={{ marginLeft: '25px' }}> </div>
          )}
          Hello
        </LogInH1>

        <div>{isInitOption ? init() : option()}</div>
      </LogInContainer>
    </div>
  );
}

export default LogInPage;
