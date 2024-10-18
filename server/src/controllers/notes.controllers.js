import logger from '../logger.js';
import { errorCode, errorHandler, KeeperError } from '../utils/index.js';
import Notes from '../db/models/notes.model.js';

//TODO: create swagger

const postNote = async (req, res) => {
  /* 
    req format - /users/:userId/notes
    body:{
      title: string,
      content: string
    }

    return format:
    {
      message: "note -> <id> was created successfully"
    }
    201 - on success V
    404 - if userId doesnt exist V
    400 - if parameters not valid V
    500 - internal err V
  
  */
  req.body.uuid = req.params.userId;
  try {
    const note = await Notes.create(req.body);
    const message = `note -> ${note.id} was created successfully`;

    logger.info(message);
    res.status(201).json(note);
  } catch (err) {
    if (err?.name === 'SequelizeForeignKeyConstraintError') {
      errorHandler(
        new KeeperError(errorCode.NOT_FOUND, 'user doesnt exist'),
        res,
      );
    } else {
      errorHandler(err, res, 'note was not created');
    }
  }
};

const putNote = async (req, res) => {
  /* 
    req format - /users/:userId/notes/:id
    body:{
      title: string,
      content: string
    }

    return format:
    {
      id: number,
      title: string,
      content: string
    }

    200 - on success V
    400 - if parameters not valid V
    404 - note doesnt exist or user doesnt exist V
    500 - internal err V
  
  */
  const id = req.params.id;
  const userId = req.params.userId;
  const dataToUpdate = req.body;

  try {
    const updatedNote = (
      await Notes.update(dataToUpdate, {
        where: { id: id, uuid: userId },
        returning: true,
        raw: true,
      })
    )[1];

    if (updatedNote.length === 0) {
      throw new KeeperError(errorCode.NOT_FOUND, 'note doesnt exist');
    }

    logger.info(`note -> ${id} was updated successfuly`);
    res.status(200).json(updatedNote[0]);
  } catch (err) {
    errorHandler(err, res, 'note was not updated');
  }
};

const deleteNote = async (req, res) => {
  /* 
    req format - /users/:userId/notes/:id
    
    return format:
    {
      message: "note -> <id> was deleted successfully"
    }
    200 - on success / if the note is not found V
    403 - if note doesnt belong to user V
    400 - if parameters not valid V
    TODO: 403 - if dont have permissions
    500 - internal err V
  
  */
  const id = req.params.id;
  const userId = req.params.userId;

  try {
    const note = await Notes.findOne({ where: { id: id, uuid: userId } });

    if (!note) {
      throw new KeeperError(errorCode.FORBIDDEN, 'note doesnt belong to user');
    }

    await Notes.destroy({ where: { id: id } });
    const message = `note -> ${id} was deleted successfuly`;
    logger.info(message);
    res.status(200).json({
      message: message,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};

const getNotesOfUser = async (req, res) => {
  /* 
    req format - /users/:userId/notes
    return format:
    [{
      id: number,
      title: string,
      content: string
    }]
    200 - on success V
    400 - if query string not valid V
    500 - internal err V
  
  */
  const userId = req.params.userId;
  try {
    const notes = await Notes.findAll({ where: { uuid: userId }, raw: true });

    logger.info(`get notes of user ${userId}`);
    res.status(200).json(notes);
  } catch (err) {
    errorHandler(err, res);
  }
};
export default { postNote, putNote, deleteNote, getNotesOfUser };
