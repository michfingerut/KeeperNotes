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

function GroupPage(props) {
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
    <div style={{ position: 'relative' }}>
      <Header title="Keeper" setIsLogged={props.setIsLogged} />
      {/* TODO: add style component to button *also in GroupsBoards */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <LogOutButton onClick={returnToGroupBoard}>go back</LogOutButton>
      </div>
      <InputArea stateFunc={setNotes} userId={userId} groupId={groupId} />
      <NotesContainer>
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              deleteFunc={deleteNote}
              userId={userId}
            />
          );
        })}
      </NotesContainer>
    </div>
  );
}

export default GroupPage;
