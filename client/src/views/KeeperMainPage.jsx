//External modules
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

//Internal modules
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from '../styles/styles';
import GroupsBoards from '../components/GroupsBoards';
import ErrorComp from '../components/Error';

function KeeperMainPage(props) {
  ///////////////////// props /////////////////////
  const setIsLogged = props.setIsLogged;
  /////////////////////////////////////////////////

  const [isModalOpen, setModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleCreateGroup() {
    setModalOpen(true);
  }

  const menuItems = [
    {
      key: 1,
      icon: () => {
        return <AddIcon />;
      },
      itemName: 'Create Group',
      handleClick: handleCreateGroup,
    },
  ];

  return !isError ? (
    <div style={{ padding: '8px' }}>
      <Container>
        <Header
          title="Keeper / Groups"
          setIsLogged={setIsLogged}
          menuItems={menuItems}
        />
        <GroupsBoards
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          setIsError={setIsError}
        />
        <Footer />
      </Container>
    </div>
  ) : (
    <ErrorComp />
  );
}

export default KeeperMainPage;
