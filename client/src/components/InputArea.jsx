import React, { useState } from 'react';

function InputArea(props) {
  const [tmpNote, setTmpNote] = useState({
    title: '',
    content: '',
    key: props.keyCounter,
  });

  function addNote(event) {
    props.stateFunc((prevNotes) => {
      return [...prevNotes, tmpNote];
    });
    props.setKey(props.keyCounter + 1);

    setTmpNote(() => {
      return {
        title: '',
        content: '',
        key: props.keyCounter + 1,
      };
    });
    event.preventDefault();
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
    <div className="input-area">
      <form onSubmit={addNote}>
        <input
          className="title"
          type="text"
          name="title"
          onChange={handleInput}
          value={tmpNote.title}
          placeholder="add note title"
        />
        <textarea
          className="content"
          type="text"
          name="content"
          onChange={handleInput}
          value={tmpNote.content}
          placeholder="add note content"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default InputArea;
