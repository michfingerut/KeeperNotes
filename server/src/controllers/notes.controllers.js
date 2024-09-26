import logger from '../logger.js';
import { errorCode, errorHandler, KeeperError } from '../utils/index.js';
import Notes from '../db/notes.model.js';

//TODO: create swagger
const getNotes = async (req, res) => {
  /* 
    req format - /notes
    return format:
    [{
      id: number,
      title: string,
      content: string
    }]
    200 - on success V
    in the future: 400 - if query string not valid
    500 - internal err V
  
  */

  try {
    const notes = await Notes.findAll();

    logger.info('get notes');
    res.status(200).json(notes);
  } catch (err) {
    errorHandler(err, res);
  }
};

const postNote = async (req, res) => {
  /* 
    req format - /notes
    body:{
      title: string,
      content: string
    }

    return format:
    {
      message: "note -> <id> was created successfully"
    }
    201 - on success V
    in the future: 400 - if parameters not valid
    500 - internal err V
  
  */
  try {
    const note = (await Notes.create(req.body)).dataValues;
    const message = `note -> ${note.id} was created successfully`;

    logger.info(message);
    res.status(201).json({
      message: message,
    });
  } catch (err) {
    errorHandler(err, res, 'user was not created');
  }
};

const putNote = async (req, res) => {
  /* 
    req format - /note/id
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
    in the future: 400 - if parameters not valid
    404 - note doesnt exist
    500 - internal err V
  
  */
  const id = req.params.id;
  const dataToUpdate = req.body;

  try {
    const updatedNote = (
      await Users.update(dataToUpdate, {
        where: { id },
        returning: true,
        raw: true,
      })
    )[1][0];

    logger.info(`note -> ${id} was updated successfuly`);
    res.status(200).json(updatedNote);
  } catch (err) {
    switch (err?.name) {
      case 'SequelizeDatabaseError':
        errorHandler(
          new KeeperError(errorCode.NOT_FOUND, 'note doesnt exist'),
          res,
        );
        break;
      default:
        errorHandler(err, res, 'note was not updated');

        break;
    }
  }
};

const deleteNote = async (req, res) => {
  /* 
    req format - /note/id
    
    return format:
    {
      message: "note -> <id> was deleted successfully"
    }
    200 - on success / if the note is not found V
    in the future: 400 - if parameters not valid
    in the future: 403 - if dont have permissions
    500 - internal err V
  
  */
  const id = req.params.id;
  try {
    await Notes.destroy({ where: { id } });
    const message = `note -> ${id} was deleted successfuly`;

    logger.info(message);
    res.status(200).json({
      message: message,
    });
  } catch (err) {
    if (err?.name === 'SequelizeDatabaseError') {
      res.status(200).json({
        message: `note was deleted successfuly`,
      });
    }
    errorHandler(err, res, 'note was not deleted');
  }
};

export default { getNotes, postNote, putNote, deleteNote };
