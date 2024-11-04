//External modules
import React, { useState } from 'react';

//Internal modules
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from '../styles/styles';
import GroupsBoards from '../components/GroupsBoards';

function KeeperMainPage(props) {
  ///////////////////// props /////////////////////
  const setIsLogged = props.setIsLogged;
  /////////////////////////////////////////////////

  return (
    <div style={{ padding: '8px' }}>
      <Container>
        <Header title="Keeper" setIsLogged={setIsLogged} />
        <GroupsBoards />
        <Footer />
      </Container>
    </div>
  );
}

export default KeeperMainPage;
