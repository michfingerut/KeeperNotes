//TODO: add patch functionality
//Internal modules
import {
  NoteStyle,
  NoteH1,
  NoteP,
  NoteContainer,
  NoteButton,
} from '../styles/styles';

function Note(props) {
  return (
    <NoteStyle>
      <NoteH1>{props.title}</NoteH1>
      <NoteContainer>
        <NoteP>{props.content}</NoteP>
      </NoteContainer>
      <NoteButton onClick={() => props.deleteFunc(props.id)}>delete</NoteButton>
    </NoteStyle>
  );
}

export default Note;
