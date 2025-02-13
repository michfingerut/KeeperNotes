//External modules
import React, { useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";

//Internal modules
import CreateNewUser from "../components/CreateNewUser";
import LogExistingUser from "../components/LogExistingUser";
import { LogInContainer, LogInH1, LogButton } from "../styles/styles";

function LogInPage() {
  const [isInitOption, setIsInitOption] = useState(true);
  const [toSignUp, setToSignUp] = useState(false);

  const [tmpUsr, setTmpUsr] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
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
      />
    ) : (
      <LogExistingUser
        handleInput={handleInput}
        tmpUsr={tmpUsr}
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

    setTmpUsr(() => {
      return {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
      };
    });
  }

  return (
    <div>
      <LogInContainer>
        <LogInH1>
          {!isInitOption ? (
            <RiArrowGoBackLine
              onClick={() => goBack()}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                width: "20px",
              }}
            />
          ) : (
            <div style={{ marginLeft: "25px" }} />
          )}
          <div style={{ pointerEvents: "none", userSelect: "none" }}>Hello</div>
        </LogInH1>

        <div>{isInitOption ? init() : option()}</div>
      </LogInContainer>
    </div>
  );
}

export default LogInPage;
