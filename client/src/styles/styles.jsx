import styled, { createGlobalStyle, css } from "styled-components";

//color palate
const backGroundLightGray = "#E4E0E1";
const backGroundLightBrown = "#D6C0B3";
const midDarkBrown = "#AB886D";
const darkBrown = "#493628";

//
const darkGreen = "#626F47";
const lightGrey = "#F2EED7";
const white = "#FEFAE0";
const lightGreen = "#798645";

//

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

  //scroller
  ::-webkit-scrollbar {
    width: 8px;

  }
  ::-webkit-scrollbar-track {
    background: none; 
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888; 
    border-radius: 10px;  
    border: 2px solid none;  

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

const atHover = css`
  background-color: ${backGroundLightGray};
  color: ${darkBrown};
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
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
  margin: 0.5em;
  background-color: ${backGroundLightBrown};
  border: 2px solid black;
  ${boxShadowAndBorderRadius}
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
  color: black;

  &:hover {
    ${atHover}
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

  text-decoration: ${({ $isDone }) => ($isDone ? "line-through" : "none")};
`;

const HeaderH1 = styled.h1`
  color: white;
  font-weight: 400;
  ${notClickableText}
`;

const CenteredHeader = styled.h3`
  text-align: center;
  margin: 0;
  width: 100%;
  font-size: 0.9em;
  line-height: 160px;
  overflow-x: hidden;
  cursor: pointer;
`;

/************************* paragraphs ************************/

const NoteP = styled.p`
  font-size: 0.9em;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-height: 150px;
  ${notClickableText}

  text-decoration: ${({ $isDone }) => ($isDone ? "line-through" : "none")};
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
  margin: 10px;
  max-height: calc(90vh - 1em);
`;

const NoteContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 50px);
  flex-grow: 1;
`;

/*************************** div *****************************/

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
  padding: 5px;
  width: 100%;
  height: 2rem;

  position: fixed;
`;

const baseStyle = styled.div`
  background: #fff;
  ${boxShadowAndBorderRadius}
  padding: 15px;
  width: 200px;
  height: 200px;
  margin: 16px;
  position: relative;
`;

const NoteStyle = styled(baseStyle)`
  display: flex;
  flex-direction: column;
`;

const CardStyle = styled(baseStyle)`
  background-color: ${backGroundLightBrown};
  transition: background-color 0.3s;
  overflow-y: hidden;

  &:hover {
    background-color: ${backGroundLightGray};
  }
`;

const MenuStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
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

  //forms
  SignUpForm,

  //div
  HeaderStyle,
  FooterStyle,
  NoteStyle,
  CenteredHeader,
  CardStyle,
  MenuStyle,

  //colors
  backGroundLightGray,
  backGroundLightBrown,
  midDarkBrown,
  darkBrown,
};
