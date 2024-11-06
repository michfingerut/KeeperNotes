//External modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { TfiBackRight } from 'react-icons/tfi';

//Internal modules
import Note from '../components/Note';
import { NotesContainer } from '../styles/styles';
import backApi from '../services/backApi';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditNote from '../components/EditNote';

function GroupPage(props) {
  ///////////////////// props /////////////////////
  const setIsLogged = props.setIsLogged;
  /////////////////////////////////////////////////

  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState([]);
  const userId = localStorage.getItem('uuid');
  const navigate = useNavigate();

  const { groupId } = useParams();
  localStorage.setItem('groupId', groupId);

  const title = `Keeper / ${localStorage.getItem('groupName')}`;
  const menuItems = [
    {
      key: 1,
      itemName: 'Add Note',
      icon: () => {
        return <LibraryAddIcon />;
      },
      handleClick: handleAddNote,
    },
    {
      key: 2,
      itemName: 'Go Back',
      icon: () => {
        return <TfiBackRight />;
      },
      handleClick: returnToGroupBoard,
    },
  ];
  //TODO: sort also by isDone
  useEffect(() => {
    backApi
      .getNotesOfGroup(groupId)
      .then((data) => {
        const sortedNotes = data.sort((a, b) => {
          if (a.isFavorite === b.isFavorite) {
            return a.id - b.id;
          }
          return a.isFavorite ? -1 : 1;
        });
        setNotes(sortedNotes);
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

  function handleAddNote() {
    setOpenDialog(true);
  }

  function returnToGroupBoard() {
    localStorage.setItem('groupId', '');

    navigate('/home');
  }

  //TODO: filter by done, favorite and etc'

  return (
    <div
      style={{
        position: 'relative',
        padding: '8px',
      }}
    >
      <Header title={title} setIsLogged={setIsLogged} menuItems={menuItems} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      ></div>
      {/* TODO: should go down when adding notes */}
      {/* TODOL draggable note */}
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
      <EditNote
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        mode="add"
        note={{
          title: '',
          content: '',
          groupId: groupId,
          isDone: false,
          isFavorite: false,
          priority: 'regular',
          scheduledTime: undefined,
        }}
        setFunc={setNotes}
      />
    </div>
  );
}

export default GroupPage;
