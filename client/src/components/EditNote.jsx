//External modules
import React from 'react';
import Dialog from '@mui/material/Dialog';

//Internal modules
import InputArea from './InputArea';

function EditDialog(props) {
  ///////////////////// props /////////////////////
  const note = props.note;
  const setFunc = props.setFunc;
  const openDialog = props.openDialog;
  const setOpenDialog = props.setOpenDialog;
  const mode = props.mode;
  /////////////////////////////////////////////////

  return (
    <React.Fragment>
      {/* TODO should be closed if clicked outside the area */}
      <Dialog open={openDialog}>
        <InputArea
          stateFunc={setFunc}
          note={note}
          mode={mode}
          setOpenDialog={setOpenDialog}
        />
      </Dialog>
    </React.Fragment>
  );
}

export default EditDialog;
