//External modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Internal modules
import backApi from '../services/backApi';
import { NotesContainer, LogOutButton } from '../styles/styles';
import GroupCard from './GroupCard';

function Modal(props) {
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

  if (!show) return null;

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2>Create a New Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={handleChange}
          style={inputStyles}
        />
        <div style={modalFooterStyles}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreateClick}>Create</button>
        </div>
      </div>
    </div>
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

      <Modal
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

const modalStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000',
};

const modalContentStyles = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  height: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const inputStyles = {
  marginTop: '1em',
  padding: '0.5em',
  width: '80%',
};

const modalFooterStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: 'auto',
  paddingTop: '10px',
};
