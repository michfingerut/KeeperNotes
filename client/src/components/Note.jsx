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
      {/* when title too long looks cut, TODO: add tooltip also TODO: scrolling prettier */}
      <NoteH1 style={{ overflowX: 'hidden' }}>{props.title}</NoteH1>
      <NoteContainer>
        <NoteP>{props.content}</NoteP>
      </NoteContainer>
      <NoteButton onClick={() => props.deleteFunc(props.id)}>delete</NoteButton>
    </NoteStyle>
  );
}

export default Note;
