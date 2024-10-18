import logger from '../logger.js';
import { errorCode, errorHandler, KeeperError } from '../utils/index.js';

//TODO: create swagger

/* 
    req format - /groups
    body:{
      //TODO
    }

    return format:
    {
      message: "group -> <groupId> was created successfully"
    }

    201 - on success 
    400 - if parameters not valid 
    TODO in the future 403 - if dont have permissions to add (maybe add owner column)
    500 - internal err 
  
  */
const postGroup = async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
};

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
const deleteGroup = async (req, res) => {
  try {
  } catch (err) {
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
