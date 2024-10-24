//External modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Internal modules
import backApi from '../services/backApi';
import {
  NotesContainer,
  LogOutButton,
  SignUpInput,
  AddNoteButton,
  PopupContainer,
  PopupInnerContainer,
  PopupButtonContainer,
} from '../styles/styles';
import GroupCard from './GroupCard';

function AddGroupPopup(props) {
  const show = props.show;
  const onClose = props.onClose;
  const onCreate = props.onCreate;
  const setGroups = props.setGroups;
  const uuid = props.uuid;
  const [groupName, setGroupName] = useState('');

  const handleCreateClick = async () => {
    const group = await onCreate(groupName, uuid);
    setGroups((prev) => {
      return [...prev, group];
    });
    setGroupName('');
    onClose();
  };

  function handleChange(event) {
    setGroupName(event.target.value);
  }

  function handleClose() {
    setGroupName('');
    onClose();
  }

  if (!show) return null;

  return (
    <PopupContainer>
      <PopupInnerContainer>
        <h2>Create a New Group</h2>
        <SignUpInput
          name="group name"
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={handleChange}
        />
        <PopupButtonContainer>
          <AddNoteButton onClick={handleClose}>Cancel</AddNoteButton>
          <AddNoteButton onClick={handleCreateClick}>Create</AddNoteButton>
        </PopupButtonContainer>
      </PopupInnerContainer>
    </PopupContainer>
  );
}

function GroupsBoards(props) {
  const uuid = props.uuid;
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    backApi
      .getGroupsOfUser(uuid)
      .then((data) => {
        setGroups(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [uuid]);

  const handleCreateGroupClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  function handleGroupPick(group, event) {
    event.preventDefault();

    navigate(`/${group.groupId}`);
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* TODO: add style component to button *also in grouppage */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <LogOutButton onClick={handleCreateGroupClick}>
          + Create group
        </LogOutButton>
      </div>
      {/* TODO: when the window is small, it overlaps with the footer of the main component */}
      <NotesContainer style={{ maxHeight: 'calc(75vh - 1em)' }}>
        {groups.map((group) => {
          return (
            <GroupCard
              name={group.name}
              key={group.groupId}
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
      />
    </div>
  );
}

export default GroupsBoards;
