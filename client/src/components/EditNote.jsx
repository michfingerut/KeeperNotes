//External modules
import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Interenal modules
import backApi from '../services/backApi';

function EditDialog(props) {
  ///////////////////// props /////////////////////
  const { note, setFunc, openDialog, setOpenDialog, mode } = props;
  /////////////////////////////////////////////////

  const uuid = localStorage.getItem('uuid');

  function handleClose() {
    setOpenDialog(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.title;
    const content = formJson.content;

    if (mode === 'add') {
      const createNote = await backApi.postNote(
        { title, content, groupId: note.groupId },
        uuid,
      );

      setFunc((prevNotes) => [
        ...prevNotes,
        { title, content, id: createNote.id },
      ]);
    } else {
      const updatedNote = await backApi.updateNote(note.id, uuid, {
        title,
        content,
      });
      setFunc(updatedNote);
    }
    handleClose();
  }

  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        open={openDialog}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{mode === 'add' ? 'Add Note' : 'Edit Note'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={note?.title || ''}
            placeholder={!note?.title ? 'Enter title' : ''}
            sx={{
              mb: 2,
              '& .MuiInputLabel-root': {
                color: 'black', // Title (label) color
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: 'black', // Underline color when not focused
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black', // Underline color when focused
              },
              '& .MuiInputBase-input': {
                color: 'black', // Text color for title field
              },
            }}
          />
          <TextField
            margin="dense"
            id="content"
            name="content"
            label="Content"
            type="text"
            fullWidth
            multiline
            variant="standard"
            rows={4}
            defaultValue={note?.content || ''}
            placeholder={!note?.content ? 'Enter content' : ''}
            sx={{
              height: '150px',
              '& .MuiInputLabel-root': {
                color: 'black', // Label color for content field
              },
              '& .MuiInput-underline:before': {
                borderBottomColor: 'black', // Underline color when not focused
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'black', // Underline color when focused
              },
              '& .MuiInputBase-input': {
                height: '100%',
                overflowY: 'auto',
                color: 'black', // Text color for content field
              },
              '& textarea': {
                padding: '16.5px 14px',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: 'black', // Button font color
              '&:hover': {
                backgroundColor: 'transparent', // Remove hover background
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              color: 'black', // Button font color
              '&:hover': {
                backgroundColor: 'transparent', // Remove hover background
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditDialog;
