//External modules
import { VscAdd } from 'react-icons/vsc';
import { TfiBackRight } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';

//Internal modules
import { EditBarStyle, HeaderH1 } from '../styles/styles';
import EditDialog from './EditNote';

function EditBar(props) {
  ///////////////////// props /////////////////////
  const setNotes = props.setNotes;
  const note = props.note;
  /////////////////////////////////////////////////

  const groupName = localStorage.getItem('groupName');
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  function returnToGroupBoard() {
    localStorage.setItem('groupId', '');

    navigate('/home');
  }

  function handleAdd() {
    setOpenDialog(true);
  }

  return (
    <EditBarStyle>
      <p style={{ fontSize: '1.5em', marginLeft: '10px' }}>{groupName}</p>
      <div style={{ cursor: 'pointer' }}>
        <Tooltip title="Add">
          <span>
            <VscAdd
              style={{
                fontSize: '1.2em',
                marginRight: '10px',
              }}
              onClick={handleAdd}
            />
          </span>
        </Tooltip>
        <Tooltip title="Go Back">
          <span>
            <TfiBackRight
              onClick={returnToGroupBoard}
              style={{ fontSize: '1.2em' }}
            />
          </span>
        </Tooltip>
      </div>
      <EditDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        mode="add"
        note={note}
        setFunc={setNotes}
      />

      {/* search bar */}
    </EditBarStyle>
  );
}

export default EditBar;
