//External modules
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FormControlLabel, Checkbox } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

//Interenal modules
import backApi from "../services/backApi";
import EditDialog from "./EditDialog";
import { midDarkBrown, backGroundLightGray } from "../styles/styles";
import { showError, sortFunc } from "../utils/index";

//TODO: idea- add option like text book with * and _ and B etc'
function EditNote(props) {
  ///////////////////// props /////////////////////
  const { note, setFunc, openDialog, setOpenDialog, mode } = props;
  /////////////////////////////////////////////////
  const [isDone, setIsDone] = useState(note.isDone);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);
  const [scheduledTime, setScheduledTime] = useState(note.scheduledTime || "");

  const okButtonName = mode === "add" ? "Create" : "Save";
  const uuid = localStorage.getItem("uuid");

  function handleClose() {
    setOpenDialog(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { title, content } = formJson;
    const data = { title, content, isFavorite, isDone };

    if (scheduledTime) {
      data.scheduledTime = scheduledTime;
    }

    try {
      if (mode === "add") {
        const createNote = await backApi.postNote(
          { ...data, groupId: note.groupId },
          uuid,
        );

        setFunc((prevNotes) => {
          const toReturn = [...prevNotes, { ...data, id: createNote.id }];
          return sortFunc(toReturn);
        });
        setIsFavorite(false);
        setIsDone(false);
        setScheduledTime("");
      } else {
        const updatedNote = await backApi.updateNote(note.id, uuid, data);
        setFunc(updatedNote);
      }
    } catch (err) {
      showError("Something went wrong, please try again later");
    } finally {
      handleClose();
    }
  }

  function handleChangeCheckbox(event) {
    setIsDone(event.target.checked);
  }

  function handleStarred(event) {
    setIsFavorite(event.target.checked);
  }

  function handleScheduledTime(event) {
    let formattedTime = event.target.value;

    if (formattedTime) {
      formattedTime = new Date(formattedTime).toISOString().slice(0, 16);
    }

    setScheduledTime(formattedTime);
    //TODO: setTimeOut so when time expired it will show
  }

  const textFields = [
    () => {
      return (
        <TextField
          key="1"
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          defaultValue={note?.title || ""}
          placeholder={!note?.title ? "Enter title" : ""}
          sx={{
            mb: 2,

            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "black",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "black",
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
          }}
        />
      );
    },
    () => {
      return (
        <TextField
          key="2"
          margin="dense"
          id="content"
          name="content"
          label="Content"
          type="text"
          fullWidth
          multiline
          variant="standard"
          rows={3}
          defaultValue={note?.content || ""}
          placeholder={!note?.content ? "Enter content" : ""}
          sx={{
            height: "150px",
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "black",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "black",
            },
            "& .MuiInputBase-input": {
              height: "100%",
              overflowY: "auto",
              color: "black",
            },
            "& textarea": {
              padding: "16.5px 14px",
            },
          }}
        />
      );
    },
    () => {
      return (
        <FormControlLabel
          key="3"
          control={
            <Checkbox
              checked={isDone}
              onChange={(e) => handleChangeCheckbox(e)}
              name="isDone"
              sx={{
                "& .MuiSvgIcon-root": {
                  color: isDone ? midDarkBrown : backGroundLightGray,
                  transition: "background-color 0.3s",
                },
              }}
              color="primary"
            />
          }
          label="Done"
          sx={{
            mb: 2,
            "& .MuiFormControlLabel-label": {
              color: "black",
            },
          }}
        />
      );
    },
    () => {
      return (
        <FormControlLabel
          key="4"
          control={
            <Checkbox
              icon={<StarIcon />}
              checkedIcon={<StarIcon sx={{ color: midDarkBrown }} />}
              checked={isFavorite}
              onChange={(e) => handleStarred(e)}
              sx={{
                "& .MuiSvgIcon-root": {
                  color: isFavorite ? midDarkBrown : backGroundLightGray,
                  transition: "background-color 0.3s",
                },
              }}
            />
          }
          label="Mark as Favorite"
          sx={{
            mb: 2,
          }}
        />
      );
    },
    () => {
      return (
        //TODO: cursor bug + styling!!
        <TextField
          key="5"
          margin="dense"
          id="scheduledTime"
          name="scheduledTime"
          label="Schedule Time"
          type="datetime-local"
          fullWidth
          variant="standard"
          value={scheduledTime}
          onChange={(e) => handleScheduledTime(e)}
          sx={{
            mb: 2,

            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "black",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "black",
            },
            "& .MuiInputBase-input": {
              color: "black",
            },
            '& input[type="datetime-local"]': {
              paddingTop: "30px",
              cursor: "pointer",
            },
          }}
        />
      );
    },
  ];

  return (
    <div>
      <EditDialog
        textFields={textFields}
        okButtonName={okButtonName}
        handleClose={handleClose}
        openDialog={openDialog}
        handleOK={handleSubmit}
        dialogTitle={mode === "add" ? "Add Note" : "Edit Note"}
      />
    </div>
  );
}

export default EditNote;
