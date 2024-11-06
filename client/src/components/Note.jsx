//External modules
import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

//Internal modules
import {
  NoteStyle,
  NoteH1,
  NoteP,
  NoteContainer,
  midDarkBrown,
} from '../styles/styles';
import KeeperMenu from './Menu';
import EditNote from './EditNote';

function Dropdown(props) {
  ///////////////////// props /////////////////////
  const { deleteFunc, note, setNote } = props;
  /////////////////////////////////////////////////

  const [openDialog, setOpenDialog] = useState(false);

  async function handleEdit() {
    setOpenDialog(true);
  }

  async function handleDelete() {
    await deleteFunc(note.id);
  }
  //TODO: when is favorite updated, doesnt change the order
  return (
    <div>
      <KeeperMenu
        menuItems={[
          {
            key: 1,
            itemName: 'Edit note',
            handleClick: handleEdit,
          },
          {
            key: 2,
            itemName: 'Delete note',
            handleClick: handleDelete,
          },
        ]}
      />
      <EditNote
        note={note}
        setFunc={setNote}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        mode="edit"
      />
    </div>
  );
}

function Note(props) {
  ///////////////////// props /////////////////////
  const { note, deleteFunc, notesStateFunc } = props;
  /////////////////////////////////////////////////

  const [currNote, setNote] = useState(note);

  useEffect(() => {
    notesStateFunc((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === currNote.id) {
          return currNote;
        }
        return note;
      }),
    );
  }, [currNote]);

  return (
    <NoteStyle style={{ width: '80%' }}>
      {/*TODO: when title too long looks cut add tooltip also TODO: scrolling prettier */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <NoteH1 $isDone={currNote.isDone}>
          {currNote.isFavorite ? (
            <StarIcon style={{ color: midDarkBrown, marginRight: '10px' }} />
          ) : null}
          {currNote.title}
        </NoteH1>
        <Dropdown deleteFunc={deleteFunc} note={currNote} setNote={setNote} />
      </div>
      <NoteContainer>
        <NoteP $isDone={currNote.isDone}>{currNote.content}</NoteP>
      </NoteContainer>
    </NoteStyle>
  );
}

export default Note;
