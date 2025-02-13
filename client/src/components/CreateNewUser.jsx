// External modules
import React from "react";

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

function CreateNewUser(props) {
  const { setIsLogged, setUUID } = useAuth();

  ///////////////////// props /////////////////////
  const { handleInput, tmpUsr } = props;
  /////////////////////////////////////////////////

  async function createUser(event) {
    let userInfo;
    event.preventDefault();

    try {
      userInfo = await backApi.postUser(tmpUsr);
    } catch (err) {
      switch (err?.status) {
        case 403:
          showError("Email already exists");
          break;
        case 400:
          showError(
            "Invalid email, please make sure you are entering a valid email",
          );
          break;
        default:
          showError("Something went wrong, please try again later");
          break;
      }
      return;
    }

    try {
      await backApi.postGroup(tmpUsr.firstName, userInfo.userId);
    } catch (err) {
      await backApi.deleteUser(userInfo.userId);
      showError("Something went wrong, please try again later");
      return;
    }

    setUUID(userInfo.userId);
    localStorage.setItem("groupId", "");

    setIsLogged(true);
  }

  return (
    <Container>
      <SignUpForm onSubmit={createUser}>
        <SignUpInput
          type="text"
          name="firstName"
          onChange={handleInput}
          value={tmpUsr.firstName}
          placeholder="First name"
          required
        />
        <SignUpInput
          type="text"
          name="lastName"
          onChange={handleInput}
          value={tmpUsr.lastName}
          placeholder="Last name"
          required
        />
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
        <LogButton type="submit">Sign Up</LogButton>
      </SignUpForm>
    </Container>
  );
}

export default CreateNewUser;
