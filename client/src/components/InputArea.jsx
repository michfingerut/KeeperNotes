// External modules
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Tooltip from '@mui/material/Tooltip';

// Internal modules
import backApi from '../services/backApi';
import {
  TitleInput,
  AddNoteButton,
  InputAreaForm,
  ContentInput,
} from '../styles/styles';

function InputArea(props) {
  ///////////////////// props /////////////////////
  const stateFunc = props.stateFunc;
  const note = props.note;
  const mode = props.mode;
  const setOpenDialog = props.setOpenDialog;
  ////////////////////////////////////////////////

  const uuid = localStorage.getItem('uuid');
  const [tmpNote, setTmpNote] = useState(note);

  const placeHolderTitle = mode === 'add' ? 'add note title' : note.title;

  const placeHolderContent = mode === 'add' ? 'add note content' : note.content;

  async function addNote(event) {
    event.preventDefault();
    // TODO: Error handling
    const createNote = await backApi.postNote(tmpNote, uuid);

    stateFunc((prevNotes) => {
      return [...prevNotes, { ...tmpNote, id: createNote.id }];
    });

    setTmpNote(note);
    setOpenDialog(false);
  }

  async function editNote(event) {
    event.preventDefault();
    // TODO: Error handling

    const updatedNote = await backApi.updateNote(note.id, uuid, {
      title: tmpNote.title,
      content: tmpNote.content,
    });

    stateFunc(updatedNote);
    setTmpNote(updatedNote);

    setOpenDialog(false);
  }

  function handleInput(event) {
    const { value, name } = event.target;

    setTmpNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <InputAreaForm onSubmit={mode === 'add' ? addNote : editNote}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip title="close" placement="top">
          <span>
            <IoClose
              onClick={() => setOpenDialog(false)}
              style={{ cursor: 'pointer' }}
            />
          </span>
        </Tooltip>
      </div>
      <TitleInput
        style={{
          border: '2px solid black',
          borderRadius: '8px',
          margin: '3px',
        }}
        name="title"
        onChange={handleInput}
        value={tmpNote.title}
        placeholder={placeHolderTitle}
      />

      <ContentInput
        style={{
          border: '2px solid black',
          borderRadius: '8px',
          margin: '3px',
        }}
        name="content"
        onChange={handleInput}
        value={tmpNote.content}
        placeholder={placeHolderContent}
      />
      <AddNoteButton type="submit">Save</AddNoteButton>
    </InputAreaForm>
  );
}

export default InputArea;
