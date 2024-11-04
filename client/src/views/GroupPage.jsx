//External modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Internal modules
import Note from '../components/Note';
import { NotesContainer } from '../styles/styles';
import backApi from '../services/backApi';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditBar from '../components/EditBar';

function GroupPage(props) {
  ///////////////////// props /////////////////////
  const setIsLogged = props.setIsLogged;
  /////////////////////////////////////////////////

  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem('uuid');
  const navigate = useNavigate();

  const { groupId } = useParams();
  localStorage.setItem('groupId', groupId);

  useEffect(() => {
    backApi
      .getNotesOfGroup(groupId)
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => {
        //TODO
      });
  }, [groupId]);

  async function deleteNote(key) {
    await backApi.removeNote(key, userId);
    setNotes((prevNotes) => {
      prevNotes = prevNotes.filter((note) => {
        return note.id !== key;
      });

      return [...prevNotes];
    });
  }

  return (
    <div
      style={{
        position: 'relative',
        padding: '8px',
      }}
    >
      <Header title="Keeper" setIsLogged={setIsLogged} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <EditBar
            setNotes={setNotes}
            note={{ title: '', content: '', groupId: groupId }}
          />
        </div>
      </div>
      {/* TODO: should go down when adding notes */}
      <NotesContainer>
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              deleteFunc={deleteNote}
              notesStateFunc={setNotes}
              userId={userId}
            />
          );
        })}
      </NotesContainer>
      <Footer />
    </div>
  );
}

export default GroupPage;
