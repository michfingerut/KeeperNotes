import styled, { createGlobalStyle } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  body {
    background: #eee;
    height: 100%;
    overflow-y: hidden;
  }

  button {
    color: #d69f09;
    border: none;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

// Container for main content
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Header styles
const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5ba13;
  margin: 16px -16px;
  padding: 16px 32px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  width: 100%;
`;

const HeaderH1 = styled.h1`
  color: #fff;
  font-family: 'McLaren', cursive;
  font-weight: 200;
`;

// Footer styles
const FooterStyle = styled.footer`
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 90%;
  height: 2.5rem;
`;

const FooterP = styled.p`
  color: #ccc;
`;

// Note styles
const NoteStyle = styled.div`
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 5px #ccc;
  padding: 10px;
  width: 200px;
  height: 200px;
  margin: 16px;
  position: relative;
`;

const NoteH1 = styled.h1`
  font-size: 1.1em;
  margin-bottom: 6px;
  height: 2em;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
`;

const NoteP = styled.p`
  font-size: 0.9em;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 90px;
`;

const NoteButton = styled.button`
  color: #d69f09;
  border: none;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 8px;
  margin: 0.2em;
`;

// Note container styles
const NoteContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 50px);
`;

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center items horizontally */
  overflow-y: auto;
  overflow-x: auto;
  max-height: 63vh;

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
`;

// Input area styles
const InputAreaForm = styled.form`
  width: 20em;
  height: 18vh;
  background-color: white;
  box-shadow: 0 2px 5px #ccc;
  border-radius: 7px;
  margin: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const TitleInput = styled.input`
  font-size: 1.1em;
  font-weight: bold;
  color: black;
  border: none;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 8em;
  font-weight: bold;
  font-size: 0.9em;
  border: none;
  resize: vertical;
  box-sizing: border-box;
  line-height: 1.5;
  word-wrap: break-word;
`;

// Log-in container styles
const LogInContainer = styled.div`
  background-color: #f5ba13;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogInH1 = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const LogButton = styled.button`
  padding: 12px 24px;
  width: 100%;
  margin: 10px;
  background-color: #f5ba13;
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  color: black;

  &:hover {
    background-color: white;
    color: #d69f09;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const LogOutButton = styled.button`
  padding: 12px 24px;
  margin: 10px;
  background-color: #f5ba13;
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  color: black;

  &:hover {
    background-color: white;
    color: #d69f09;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

// Sign-up container styles
const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const SignUpInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid black;
  border-radius: 8px;
`;

const AddButton = styled.button`
  width: 2.5em;
  align-self: flex-end;
  margin-top: auto;
  margin: 0.2em;
`;

export {
  GlobalStyle,
  Container,
  HeaderStyle,
  HeaderH1,
  FooterStyle,
  FooterP,
  NoteStyle,
  NoteH1,
  NoteP,
  NoteButton,
  NoteContainer,
  NotesContainer,
  InputAreaForm,
  TitleInput,
  ContentInput,
  LogInContainer,
  LogInH1,
  LogButton,
  LogOutButton,
  SignUpContainer,
  SignUpForm,
  SignUpInput,
  AddButton,
};
