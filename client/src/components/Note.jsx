import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import Tooltip from '@mui/material/Tooltip';
import {
  NoteStyle,
  NoteH1,
  NoteP,
  NoteContainer,
  midDarkBrown,
} from '../styles/styles';
import KeeperMenu from './Menu';
import EditNote from './EditNote';
import { sortFunc } from '../utils';

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

  const formattedScheduledTime = currNote.scheduledTime
    ? new Date(currNote.scheduledTime).toLocaleString()
    : null;

  const isExpired =
    currNote.scheduledTime &&
    new Date(currNote.scheduledTime) < new Date() &&
    !note.isDone;

  useEffect(() => {
    notesStateFunc((prevNotes) => {
      prevNotes = prevNotes.map((note) => {
        if (note.id === currNote.id) {
          return currNote;
        }
        return note;
      });

      if (
        note.isFavorite !== currNote.isFavorite ||
        note.isDone !== currNote.isDone
      ) {
        return [...sortFunc(prevNotes)];
      }
      return [...prevNotes];
    });
  }, [currNote]);

  return (
    <NoteStyle style={{ width: '80%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <NoteH1 $isDone={currNote.isDone}>
          {currNote.isFavorite ? (
            <StarIcon style={{ color: midDarkBrown, marginRight: '10px' }} />
          ) : null}
          <Tooltip title={currNote.title}>
            <span>{currNote.title}</span>
          </Tooltip>
        </NoteH1>
        <Dropdown deleteFunc={deleteFunc} note={currNote} setNote={setNote} />
      </div>
      <NoteContainer>
        <NoteP $isDone={currNote.isDone}>{currNote.content}</NoteP>
      </NoteContainer>

      {formattedScheduledTime && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8em',
            color: 'gray',
            marginTop: '10px',
          }}
        >
          <div>Scheduled for: {formattedScheduledTime}</div>
          {isExpired && (
            <div style={{ color: 'red', fontWeight: 'bold' }}>Expired</div>
          )}
        </div>
      )}
    </NoteStyle>
  );
}

export default Note;
