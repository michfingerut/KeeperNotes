//External modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Internal modules
import backApi from '../services/backApi';
import {
  NotesContainer,
  SignUpInput,
  AddNoteButton,
  PopupContainer,
  PopupInnerContainer,
  PopupButtonContainer,
} from '../styles/styles';
import GroupCard from './GroupCard';

function AddGroupPopup(props) {
  ///////////////////// props /////////////////////
  const {
    show,
    onClose,
    onCreate,
    setGroups,
    uuid,
    setOpenDialog,
    openDialog,
  } = props;
  ////////////////////////////////////////////////

  const handleCreateClick = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const groupName = formJson.groupName;

    const group = await onCreate(groupName, uuid);
    setGroups((prev) => {
      return [...prev, group];
    });
    onClose();
  };

  function handleClose() {
    setOpenDialog(false);
  }

  if (!show) return null;

  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        open={openDialog}
        PaperProps={{
          component: 'form',
          onSubmit: handleCreateClick,
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          {/* TODO: the name is blue */}
          <TextField
            autoFocus
            margin="dense"
            id="groupName"
            name="groupName"
            label="Group name"
            type="text"
            fullWidth
            variant="standard"
            placeholder={'Enter group name'}
            sx={{
              mb: 2,
              '& .MuiInputLabel-root': {
                color: 'black',
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: 'black',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black',
              },
              '& .MuiInputBase-input': {
                color: 'black',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: 'black',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              color: 'black',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function GroupsBoards(props) {
  ///////////////////// props /////////////////////
  const { isModalOpen, setModalOpen } = props;
  /////////////////////////////////////////////////

  const uuid = localStorage.getItem('uuid');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (uuid) {
      backApi
        .getGroupsOfUser(uuid)
        .then((data) => {
          setGroups(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [uuid]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  function handleGroupPick(group) {
    localStorage.setItem('groupName', group.name);
    navigate(`/${group.groupId}`);
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      ></div>
      {/* TODO: when the window is small, it overlaps with the footer of the main component */}
      <NotesContainer>
        {groups.map((group) => {
          return (
            <GroupCard
              key={group.groupId}
              groupId={group.groupId}
              name={group.name}
              setGroups={setGroups}
              onClick={(event) => handleGroupPick(group, event)}
            />
          );
        })}
      </NotesContainer>
      {/* TODO: material ui pop up */}
      {/* TODO: when click outside should be closed */}
      <AddGroupPopup
        show={isModalOpen}
        onClose={handleCloseModal}
        onCreate={backApi.postGroup}
        setGroups={setGroups}
        uuid={uuid}
        setOpenDialog={setModalOpen}
        openDialog={isModalOpen}
      />
    </div>
  );
}

export default GroupsBoards;
