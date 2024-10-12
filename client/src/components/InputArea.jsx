// External modules
import React, { useState } from 'react';

// Internal modules
import backApi from '../services/backApi';
import {
  TitleInput,
  AddButton,
  InputAreaForm,
  ContentInput,
} from '../styles/styles';

function InputArea(props) {
  const [tmpNote, setTmpNote] = useState({
    title: '',
    content: '',
  });

  async function addNote(event) {
    event.preventDefault();
    // TODO: Error handling
    const createNote = await backApi.postNote(tmpNote, props.userId);

    props.stateFunc((prevNotes) => {
      return [...prevNotes, { ...tmpNote, id: createNote.id }];
    });

    setTmpNote(() => {
      return {
        title: '',
        content: '',
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
      <AddButton type="submit">Add</AddButton>
    </InputAreaForm>
  );
}

export default InputArea;
