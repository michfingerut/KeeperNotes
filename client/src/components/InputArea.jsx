// External modules
import React, { useState } from 'react';

// Internal modules
import backApi from '../services/backApi';
import {
  TitleInput,
  AddNoteButton,
  InputAreaForm,
  ContentInput,
} from '../styles/styles';

function InputArea(props) {
  const uuid = localStorage.getItem('uuid');
  const [tmpNote, setTmpNote] = useState(props.note);

  const placeHolderTitle =
    props.mode === 'add' ? 'add note title' : props.note.title;

  const placeHolderContent =
    props.mode === 'add' ? 'add note content' : props.note.content;

  async function addNote(event) {
    console.log('add note');
    event.preventDefault();
    // TODO: Error handling
    const createNote = await backApi.postNote(tmpNote, uuid);

    props.stateFunc((prevNotes) => {
      return [...prevNotes, { ...tmpNote, id: createNote.id }];
    });

    setTmpNote(props.note);
  }

  async function editNote(event) {
    event.preventDefault();
    // TODO: Error handling

    const updatedNote = await backApi.updateNote(props.note.id, uuid, {
      title: tmpNote.title,
      content: tmpNote.content,
    });

    props.stateFunc(updatedNote);
    setTmpNote(updatedNote);

    props.close(false);
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
    <InputAreaForm onSubmit={props.mode === 'add' ? addNote : editNote}>
      <TitleInput
        name="title"
        onChange={handleInput}
        value={tmpNote.title}
        placeholder={placeHolderTitle}
      />
      <ContentInput
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
