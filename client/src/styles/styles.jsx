import styled, { createGlobalStyle } from 'styled-components';

//color palate
const backGroundLightGray = '#E4E0E1';
const backGroundLightBrown = '#D6C0B3';
const midDarkBrown = '#AB886D';
const darkBrown = '#493628';

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
    background: ${backGroundLightGray};
    height: 100%;
    overflow-y: hidden;
  }

  button {
    color: ${darkBrown};
    border: none;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${backGroundLightBrown};
  margin: 16px -16px;
  padding: 16px 32px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  width: 100%;
`;

const HeaderH1 = styled.h1`
  color: white;
  font-weight: 400;
`;

const FooterStyle = styled.footer`
  text-align: center;
  bottom: 0;
  width: 90%;
  height: 2rem;

  position: fixed;
`;

const FooterP = styled.p`
  color: #ccc;
`;

const NoteStyle = styled.div`
  background: #fff;
  border-radius: 8px;
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
  color: ${darkBrown};
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

const NoteContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 50px);
`;

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
  overflow-x: auto;
  max-height: calc(58vh - 1.5rem);
`;

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

const LogInContainer = styled.div`
  background-color: ${backGroundLightBrown};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogInH1 = styled.h1`
  display: flex;
  align-items: center;
`;

const LogButton = styled.button`
  padding: 12px 24px;
  width: 100%;
  margin: 10px;
  background-color: ${backGroundLightBrown};
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  color: black;

  &:hover {
    background-color: ${backGroundLightGray};
    color: ${darkBrown};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const LogOutButton = styled.button`
  padding: 12px 24px;
  margin: 10px;
  background-color: ${backGroundLightBrown};
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  color: black;

  &:hover {
    background-color: ${backGroundLightGray};
    color: ${darkBrown};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const CenteredHeader = styled.h3`
  text-align: center;
  margin: 0;
  width: 100%;
  font-size: 0.9em;
  line-height: 200px;
`;

const CardStyle = styled(NoteStyle)`
  background-color: ${backGroundLightBrown};
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${backGroundLightGray};
  }
`;

export {
  //global
  GlobalStyle,

  //buttons
  LogOutButton,
  NoteButton,
  LogButton,
  AddButton,

  //headers
  LogInH1,
  HeaderH1,
  NoteH1,

  //paragraphs
  FooterP,
  NoteP,

  //inputs
  SignUpInput,
  TitleInput,
  ContentInput,

  //containers
  Container,
  NoteContainer,
  NotesContainer,
  LogInContainer,
  SignUpContainer,

  //forms
  InputAreaForm,
  SignUpForm,
  HeaderStyle,
  FooterStyle,
  NoteStyle,
  CenteredHeader,
  CardStyle,
};
