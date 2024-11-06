import logger from '../logger.js';
import { errorCode, errorHandler, KeeperError } from '../utils/index.js';
import Notes from '../db/models/notes.model.js';
import Groups from '../db/models/groups.model.js';
import publisher from '../socketio.js';
//TODO: create swagger

const postNote = async (req, res) => {
  /* 
  //TODO: need to change route to /groups/:groupId/notes
    req format - /users/:userId/notes
    body:{
      title: string,
      content: string,
      groupId: string

      isDone: boolean, optional
      isFavorite: boolean, optional
      schedualTime: time. optional
      pariority: enum, optional
    }

    return format:
    {
      message: "note -> <id> was created successfully"
    }
    201 - on success V
    404 - if userId doesnt exist V TODO: if group doesnt exist
    400 - if parameters not valid V
    500 - internal err V
  
  */
  req.body.uuid = req.params.userId;
  const groupId = req.body.groupId;
  try {
    const group = await Groups.findByPk(groupId);

    if (!group) {
      throw new KeeperError(errorCode.NOT_FOUND, 'group doesnt exist');
    }
    const note = await Notes.create(req.body);
    const message = `note -> ${note.id} was created successfully`;

    logger.info(message);
    res.status(201).json(note);
    await publisher.genericPublisher(groupId, 'post note', note);
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
    //TODO: need to change route to /groups/:groupId/notes

    req format - /users/:userId/notes/:id
    body:{
      title: string,
      content: string
    }

    return format:
    {
      id: number,
      title: string, optional
      content: string, optional

      isDone: boolean, optional
      isFavorite: boolean, optional
      schedualTime: time. optional
      pariority: enum, optional
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
    await publisher.genericPublisher(
      updatedNote[0].groupId,
      'put note',
      updatedNote[0],
    );
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

    await publisher.genericPublisher(note.groupId, 'delete note', id);
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
      content: string,
      isDone: boolean, 
      isFavorite: boolean, 
      schedualTime: time. 
      pariority: enum, 
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

const getNotesOfGroup = async (req, res) => {
  /* 
    req format - /groups/:groupId/notes
    return format:
    [{
      id: number,
      title: string,
      content: string,
      isDone: boolean, 
      isFavorite: boolean, 
      schedualTime: time. 
      pariority: enum, 
    }]
    200 - on success V
    400 - if query string not valid V
    500 - internal err V
  
  */
  const groupId = req.params.groupId;
  try {
    const group = await Groups.findByPk(groupId);

    if (!group) {
      throw new KeeperError(errorCode.NOT_FOUND, 'group doesnt exist');
    }

    const notes = await Notes.findAll({ where: { groupId }, raw: true });
    logger.info(`get notes of group ${groupId}`);
    res.status(200).json(notes);
  } catch (err) {
    errorHandler(err, res);
  }
};
export default {
  postNote,
  putNote,
  deleteNote,
  getNotesOfUser,
  getNotesOfGroup,
};
