//External modules
import React, { useState, useEffect } from 'react';

//Internal modules
import Note from '../components/Note';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InputArea from '../components/InputArea';
import backApi from '../services/backApi';

function KeeperMainPage(props) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const uuid = props.uuid;

  useEffect(() => {
    backApi
      .getNotes(uuid)
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  async function deleteNote(key) {
    await backApi.removeNote(key, uuid);
    setNotes((prevNotes) => {
      prevNotes = prevNotes.filter((note) => {
        return note.id !== key;
      });

      return [...prevNotes];
    });
  }

  //TODO: create prettier loading and error components
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div> Error</div>;
  }

  return (
    <div className="container">
      <Header title="Keeper" setIsLogged={props.setIsLogged} />
      <InputArea stateFunc={setNotes} userId={uuid} />
      <div className="cards-container">
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              deleteFunc={deleteNote}
              userId={uuid}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default KeeperMainPage;
