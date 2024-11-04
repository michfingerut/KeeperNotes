//External modules
import React, { useEffect, useState } from 'react';

//Internal modules
import { NoteStyle, NoteH1, NoteP, NoteContainer } from '../styles/styles';
import KeeperMenu from './Menu';
import EditDialog from './EditNote';

function Dropdown(props) {
  ///////////////////// props /////////////////////
  const { deleteFunc, note, setFunc } = props;
  /////////////////////////////////////////////////

  const [openDialog, setOpenDialog] = useState(false);

  async function handleEdit() {
    setOpenDialog(true);
  }

  async function handleDelete() {
    await deleteFunc(note.id);
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
      <EditDialog
        note={note}
        setFunc={setFunc}
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

  //TODO: on refresh the order is changing
  useEffect(() => {
    notesStateFunc((prevNotes) => {
      prevNotes = prevNotes.filter((note) => {
        if (note.id === currNote.id) {
          note.title = currNote.title;
          note.content = currNote.content;
        }

        return true;
      });

      return prevNotes;
    });
  }, [currNote]);

  return (
    <NoteStyle>
      {/*TODO: when title too long looks cut add tooltip also TODO: scrolling prettier */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <NoteH1>{note.title}</NoteH1>
        <Dropdown deleteFunc={deleteFunc} note={currNote} setFunc={setNote} />
      </div>
      <NoteContainer>
        <NoteP>{note.content}</NoteP>
      </NoteContainer>
    </NoteStyle>
  );
}

export default Note;
