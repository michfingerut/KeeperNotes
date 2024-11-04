//External modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Internal modules
import InputArea from '../components/InputArea';
import Note from '../components/Note';
import { LogOutButton, NotesContainer } from '../styles/styles';
import backApi from '../services/backApi';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      .catch((err) => {});
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

  function returnToGroupBoard() {
    localStorage.setItem('groupId', '');

    navigate('/home');
  }
  return (
    <div
      style={{
        position: 'relative',
        padding: '8px',
      }}
    >
      <Header title="Keeper" setIsLogged={setIsLogged} />
      {/* TODO: add style component to button *also in GroupsBoards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <LogOutButton onClick={returnToGroupBoard} style={{ width: '10em' }}>
            go back
          </LogOutButton>
        </div>
        <div>
          <InputArea
            stateFunc={setNotes}
            note={{ title: '', content: '', groupId: groupId }}
            mode="add"
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
