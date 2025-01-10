//External modules
import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";

//Internal modules
import { NotesContainer } from "../styles/styles";
import backApi from "../services/backApi";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditNote from "../components/EditNote";
import ErrorComp from "../components/Error";
import { showError, sortFunc } from "../utils/index";
import { useAuth } from "../utils/Context";

const LazyNote = React.lazy(() => import("../components/Note"));

//TODO: add a way to see members
function GroupPage() {
  const { uuid } = useAuth();
  const [isError, setIsError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState([]);
  const userId = uuid;
  const navigate = useNavigate();

  const { groupId } = useParams();
  localStorage.setItem("groupId", groupId);

  const title = ` ${localStorage.getItem("groupName")}`;
  const menuItems = [
    {
      key: 1,
      itemName: "Add Note",
      icon: () => {
        return <PostAddIcon />;
      },
      handleClick: handleAddNote,
    },
  ];

  useEffect(() => {
    backApi
      .getNotesOfGroup(groupId)
      .then((data) => {
        const sortedNotes = sortFunc(data);
        setNotes(sortedNotes);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [groupId]);

  async function deleteNote(key) {
    try {
      await backApi.removeNote(key, userId);
      setNotes((prevNotes) => {
        prevNotes = prevNotes.filter((note) => {
          return note.id !== key;
        });

        return [...prevNotes];
      });
    } catch (err) {
      showError("Something went wrong, please try again later");
    }
  }

  function handleAddNote() {
    setOpenDialog(true);
  }

  //TODO: filter by done, favorite and etc'
  // TODOL draggable note

  return !isError ? (
    <div
      style={{
        position: "relative",
        padding: "8px",
      }}
    >
      <Header
        title={title}
        menuItems={menuItems}
      />
      <NotesContainer>
        {notes.map((note) => {
          return (
            <Suspense key={note.id}>
              <LazyNote
                note={note}
                deleteFunc={deleteNote}
                notesStateFunc={setNotes}
                userId={userId}
              />
            </Suspense>
          );
        })}
      </NotesContainer>
      <Footer />
      <EditNote
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        mode="add"
        note={{
          title: "",
          content: "",
          groupId: groupId,
          isDone: false,
          isFavorite: false,
          priority: "regular",
        }}
        setFunc={setNotes}
      />
    </div>
  ) : (
    <ErrorComp />
  );
}

export default GroupPage;
