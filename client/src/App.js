import Card from './components/Card';
import Header from './components/Header';
import Footer from './components/Footer';
import InputArea from './components/InputArea';
import notes from './utils/notes';
import './styles/App.css';
import React, { useState } from 'react';

function App() {
  const [Anotes, setNotes] = useState(notes);
  const [keyCounter, setKeyCounter] = useState(notes.length + 1);

  function deleteNote(key) {
    setNotes((prevNotes) => {
      prevNotes = prevNotes.filter((note) => {
        return note.key !== key;
      });

      return [...prevNotes];
    });
  }
  return (
    <div className="container">
      <Header title="Keeper" />
      <InputArea
        stateFunc={setNotes}
        setKey={setKeyCounter}
        keyCounter={keyCounter}
      />
      <div className="cards-container">
        {Anotes.map((note) => {
          return (
            <Card
              key={note.key}
              index={note.key}
              title={note.title}
              content={note.content}
              deleteFunc={deleteNote}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
