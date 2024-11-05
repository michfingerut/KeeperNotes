//External modules
import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

/*
TODO: (may JSdocs)
textFields = [] of <TextField .../>

handleClose, openDialog, handleOK => functions

dialogTitle= string
okButtonName= string
 */

function EditDialog(props) {
  const {
    textFields,
    okButtonName,
    handleClose,
    openDialog,
    handleOK,
    dialogTitle,
  } = props;

  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        open={openDialog}
        PaperProps={{
          component: 'form',
          onSubmit: handleOK,
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {/* TODO: the name is blue */}
          {textFields.map((textField) => {
            return textField();
          })}
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
            {okButtonName}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditDialog;
