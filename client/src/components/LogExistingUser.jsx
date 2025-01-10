// External modules
import React, { useState } from "react";

// Internal modules
import backApi from "../services/backApi";
import { showError } from "../utils/index";
import {
  Container,
  SignUpForm,
  SignUpInput,
  LogButton,
} from "../styles/styles";
import { useAuth } from "../utils/Context";

function ForgetPassword(props) {
  //TODO:
  ///////////////////// props /////////////////////
  const { handleInput, tmpUsr, setForgotPass } = props;
  /////////////////////////////////////////////////

  async function restorePass(event) {
    setForgotPass(false);
  }

  return (
    <Container>
      <SignUpForm onSubmit={restorePass}>
        <SignUpInput
          type="email"
          name="email"
          onChange={handleInput}
          value={tmpUsr.email}
          placeholder="Email"
          required
        />

        <LogButton type="submit">Restore</LogButton>
      </SignUpForm>
    </Container>
  );
}

function LogIn(props) {
  const { setIsLogged, setUUID } = useAuth();
  ///////////////////// props /////////////////////
  const { handleInput, tmpUsr, setForgotPass } = props;
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
          showError("Wrong password, please try again");
          break;
        case 404:
          showError("Non-existing email, please try again");
          break;
        case 400:
          showError("Invalid email, please try again");
          break;
        default:
          showError("Something went wrong, please try again later");
          break;
      }
      return;
    }
    setUUID(userInfo.uuid);
    localStorage.setItem("groupId", "");
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
      {/* <LogButton onClick={() => setForgotPass(true)}>
        forgot password?
      </LogButton> */}
    </Container>
  );
}

function LogExistingUser(props) {
  ///////////////////// props /////////////////////
  const { handleInput, tmpUsr } = props;
  /////////////////////////////////////////////////
  const [forgotPass, setForgotPass] = useState(false);

  return (
    <Container>
      {!forgotPass ? (
        <LogIn
          handleInput={handleInput}
          tmpUsr={tmpUsr}
          setForgotPass={setForgotPass}
        />
      ) : (
        <ForgetPassword />
      )}
    </Container>
  );
}

export default LogExistingUser;
