//External modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

//Internal modules
import backApi from '../services/backApi';
import { NotesContainer } from '../styles/styles';
import GroupCard from './GroupCard';
import EditDialog from './EditDialog';
import { showError } from '../utils/errorUtils';

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
    try {
      const group = await onCreate(groupName, uuid);
      setGroups((prev) => {
        return [...prev, group];
      });
    } catch (err) {
      showError('Something went wrong, please try again later');
    } finally {
      onClose();
    }
  };

  function handleClose() {
    setOpenDialog(false);
  }

  if (!show) return null;
  const textFields = [
    () => {
      return (
        <TextField
          key="1"
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
      );
    },
  ];

  return (
    <EditDialog
      textFields={textFields}
      okButtonName="Create"
      handleClose={handleClose}
      openDialog={openDialog}
      handleOK={handleCreateClick}
      dialogTitle="Create Group"
    />
  );
}

function GroupsBoards(props) {
  ///////////////////// props /////////////////////
  const { isModalOpen, setModalOpen, setIsError } = props;
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
          setIsError(true);
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
