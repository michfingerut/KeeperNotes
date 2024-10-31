//External modules
import React, { useEffect, useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { MenuItem, Menu } from '@mui/material';

//Internal modules
import { NoteStyle, NoteH1, NoteP, NoteContainer } from '../styles/styles';
import Dialog from '@mui/material/Dialog';
import InputArea from './InputArea';

function Dropdown(props) {
  ///////////////////// props /////////////////////
  const deleteFunc = props.deleteFunc;
  const note = props.note;
  const setNote = props.setNote;
  /////////////////////////////////////////////////

  //TODO: styling!!!
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleEdit() {
    setOpenDialog(true);
    handleClose();
  }

  async function handleDelete() {
    await deleteFunc(note.id);
    handleClose();
  }

  function EditDialog() {
    return (
      <React.Fragment>
        <Dialog open={openDialog} onClose={handleClose}>
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
      <CiMenuKebab onClick={handleClick} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit note</MenuItem>
        <MenuItem onClick={handleDelete}>Delete note</MenuItem>
      </Menu>
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
