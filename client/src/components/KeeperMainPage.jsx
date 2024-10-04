import Card from './Card';
import Header from './Header';
import Footer from './Footer';
import InputArea from './InputArea';
import React, { useState, useEffect } from 'react';
import backApi from '../services/backApi';

function KeeperMainPage(props) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInfo = props.userInfo;

  useEffect(() => {
    backApi
      .getNotes(userInfo.uuid)
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
    await backApi.removeNote(key, userInfo.uuid);
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
      <Header title="Keeper" />
      <InputArea stateFunc={setNotes} userId={userInfo.uuid} />
      <div className="cards-container">
        {notes.map((note) => {
          return (
            <Card
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              deleteFunc={deleteNote}
              userId={userInfo.uuid}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default KeeperMainPage;
