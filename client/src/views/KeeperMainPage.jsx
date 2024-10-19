//External modules
import React, { useState } from 'react';

//Internal modules
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from '../styles/styles';
import GroupsBoards from '../components/GroupsBoards';

function KeeperMainPage(props) {
  const uuid = props.uuid;

  return (
    <div>
      <Container>
        <Header title="Keeper" setIsLogged={props.setIsLogged} />

        <GroupsBoards uuid={uuid} />

        <Footer />
      </Container>
    </div>
  );
}

export default KeeperMainPage;
