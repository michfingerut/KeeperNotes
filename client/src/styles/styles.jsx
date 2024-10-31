import styled, { createGlobalStyle, css } from 'styled-components';

//color palate
const backGroundLightGray = '#E4E0E1';
const backGroundLightBrown = '#D6C0B3';
const midDarkBrown = '#AB886D';
const darkBrown = '#493628';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
      user-select: none;

  }

  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }

  body {
    background: ${backGroundLightGray};
    height: 100%;
    overflow-y: auto;
  }

  button {
    color: ${darkBrown};
    border: none;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

const boxShadowAndBorderRadius = css`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const notClickableText = css`
  pointer-events: none;
  cursor: default;
`;

/************************** buttons **************************/
const AddNoteButton = styled.button`
  align-self: flex-end;
  margin: 0.2em;
`;

const NoteButton = styled.button`
  color: ${darkBrown};
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 8px;
`;

const baseButton = styled.button`
  padding: 12px 24px;
  margin: 10px;
  background-color: ${backGroundLightBrown};
  border: 2px solid black;
  ${boxShadowAndBorderRadius}
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  color: black;

  &:hover {
    background-color: ${backGroundLightGray};
    color: ${darkBrown};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }
`;

const LogButton = styled(baseButton)`
  width: 100%;
`;

const LogOutButton = styled(baseButton)``;

/************************** headers **************************/
const LogInH1 = styled.h1`
  display: flex;
  align-items: center;
`;

const NoteH1 = styled.h1`
  font-size: 1.1em;
  height: 2em;
  overflow-y: hidden;
  ${notClickableText}
`;

const HeaderH1 = styled.h1`
  color: white;
  font-weight: 400;
  ${notClickableText}
`;

/************************* paragraphs ************************/

const NoteP = styled.p`
  font-size: 0.9em;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 150px;
  ${notClickableText}
`;

const FooterP = styled.p`
  color: #ccc;
  ${notClickableText}
`;

/*************************** forms ***************************/

const baseForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignUpForm = styled(baseForm)`
  align-items: center;
`;

const InputAreaForm = styled(baseForm)`
  width: 20em;
  height: 18vh;
  background-color: white;
  ${boxShadowAndBorderRadius}
  margin: 1em;
  justify-content: space-between;
  padding: 10px;
`;

/*************************** input ***************************/

const TitleInput = styled.input`
  font-size: 1.1em;
  font-weight: bold;
  color: black;
  border: none;
`;

const ContentInput = styled.textarea`
  height: 8em;
  font-weight: bold;
  font-size: 1em;
  border: none;
  word-wrap: break-word;
`;

const SignUpInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 2px solid black;
  border-radius: 8px;
`;

/************************* containers ************************/

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogInContainer = styled(Container)`
  background-color: ${backGroundLightBrown};
  height: 100vh;
  width: 100vw;
`;

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
  max-height: calc(58vh - 0.5rem);
`;

const NoteContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 50px);
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupInnerContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const PopupButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: auto;
  padding-top: 10px;
`;

/************************** styles ***************************/
//TODO: code reuse

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${backGroundLightBrown};
  margin: 0 0 16px 0;
  padding: 16px 32px;
  ${boxShadowAndBorderRadius}
  width: 100%;
`;

const FooterStyle = styled.footer`
  text-align: center;
  bottom: 0;
  padding: 0;
  width: 100%;
  height: 2rem;

  position: fixed;
`;

const NoteStyle = styled.div`
  background: #fff;
  ${boxShadowAndBorderRadius}
  padding: 10px;
  width: 200px;
  height: 200px;
  margin: 16px;
  position: relative;
`;

const CenteredHeader = styled.h3`
  text-align: center;
  margin: 0;
  width: 100%;
  font-size: 0.9em;
  line-height: 160px;
  ${notClickableText}
`;

const CardStyle = styled(NoteStyle)`
  background-color: ${backGroundLightBrown};
  transition: background-color 0.3s;
  overflow-y: hidden;

  &:hover {
    background-color: ${backGroundLightGray};
  }
`;

export {
  //global
  GlobalStyle,

  //bases
  notClickableText,
  boxShadowAndBorderRadius,
  baseButton,

  //buttons
  LogOutButton,
  NoteButton,
  LogButton,
  AddNoteButton,

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
  PopupContainer,
  PopupInnerContainer,
  PopupButtonContainer,

  //forms
  InputAreaForm,
  SignUpForm,

  //general styles
  HeaderStyle,
  FooterStyle,
  NoteStyle,
  CenteredHeader,
  CardStyle,
};
