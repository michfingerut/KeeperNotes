import logger from '../logger.js';
import { errorCode, errorHandler, KeeperError } from '../utils/index.js';
import Groups from '../db/models/groups.model.js';

//TODO: create swagger

const postGroup = async (req, res) => {
  /* 
    req format - /groups

    return format:
    {
      message: "group -> <groupId> was created successfully"
    }

    201 - on success 
    TODO in the future 403 - if dont have permissions to add (maybe add owner column)
    500 - internal err 
  
  */
  try {
    const group = await Groups.create();

    logger.info(`group -> ${group.groupId} was created successfully`);
    res.status(201).json({ groupId: group.groupId });
  } catch (err) {
    errorHandler(err, res, 'note was not created');
  }
};

const deleteGroup = async (req, res) => {
  /* 
    req format - /groups/groupId


    return format:
    {
      message: "group -> <groupId> was deleted successfully"
    }

    200 - on success or if group not found
    400 - if parameters not valid 
    TODO in the future 403 - if dont have permissions
    500 - internal err 
  */
  const groupId = req.params.groupId;

  try {
    const group = await Groups.findOne({ where: { groupId } });
    if (group) {
      await Groups.destroy({ where: { groupId: group.groupId } });
    }

    const message = `group -> ${groupId} was deleted successfuly`;
    logger.info(message);
    res.status(200).json({
      message: message,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    errorHandler(err, res);
  }
};

export default { postGroup, deleteGroup };

// maybe put prmissions to group?
//const putGroup = async (req, res) => {
//   try {
//   } catch (err) {
//     errorHandler(err, res);
//   }
// };
