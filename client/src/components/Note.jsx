//External modules
import React, { useEffect, useState } from 'react';

//Internal modules
import { NoteStyle, NoteH1, NoteP, NoteContainer } from '../styles/styles';
import Dialog from '@mui/material/Dialog';
import InputArea from './InputArea';
import KeeperMenu from './Menu';

function Dropdown(props) {
  ///////////////////// props /////////////////////
  const deleteFunc = props.deleteFunc;
  const note = props.note;
  const setNote = props.setNote;
  /////////////////////////////////////////////////

  //TODO: styling!!! + input styling in popup
  const [openDialog, setOpenDialog] = useState(false);

  async function handleEdit() {
    setOpenDialog(true);
  }

  async function handleDelete() {
    await deleteFunc(note.id);
  }

  function EditDialog() {
    return (
      <React.Fragment>
        {/* TODO should be closed if clicked outside the area */}
        <Dialog open={openDialog}>
          <InputArea
            stateFunc={setNote}
            note={note}
            mode="edit"
            close={setOpenDialog}
          />
        </Dialog>
      </React.Fragment>
    );
  }

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
      <EditDialog />
    </div>
  );
}

function Note(props) {
  const note = props.note;
  const deleteFunc = props.deleteFunc;
  const notesStateFunc = props.notesStateFunc;

  const [currNote, setNote] = useState(note);

  useEffect(() => {
    notesStateFunc((prevNotes) => {
      const tmp = prevNotes.filter((note) => {
        return note.id !== currNote.id;
      });

      return [...tmp, currNote];
    });
  }, [currNote]);

  return (
    <NoteStyle>
      {/*TODO: when title too long looks cut add tooltip also TODO: scrolling prettier */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <NoteH1>{note.title}</NoteH1>
        <Dropdown deleteFunc={deleteFunc} note={currNote} setNote={setNote} />
      </div>
      <NoteContainer>
        <NoteP>{note.content}</NoteP>
      </NoteContainer>
    </NoteStyle>
  );
}

export default Note;
