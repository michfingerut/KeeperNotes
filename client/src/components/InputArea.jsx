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
  const groupId = props.groupId;
  const [tmpNote, setTmpNote] = useState({
    title: '',
    content: '',
    groupId: groupId,
  });

  async function addNote(event) {
    event.preventDefault();
    // TODO: Error handling
    //TODO: note should have groupId
    const createNote = await backApi.postNote(tmpNote, props.userId);

    props.stateFunc((prevNotes) => {
      return [...prevNotes, { ...tmpNote, id: createNote.id }];
    });

    setTmpNote(() => {
      return {
        title: '',
        content: '',
        groupId: groupId,
      };
    });
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
    <InputAreaForm onSubmit={addNote}>
      <TitleInput
        name="title"
        onChange={handleInput}
        value={tmpNote.title}
        placeholder="add note title"
      />
      <ContentInput
        name="content"
        onChange={handleInput}
        value={tmpNote.content}
        placeholder="add note content"
      />
      <AddNoteButton type="submit">Add</AddNoteButton>
    </InputAreaForm>
  );
}

export default InputArea;
