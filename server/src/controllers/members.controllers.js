import logger from '../logger.js';
import { errorCode, errorHandler, KeeperError } from '../utils/index.js';

//TODO: create swagger

const addMember = async (req, res) => {
  /* 
    req format - /groups/:groupId/members
    body:{
      userId: uuid
    }

    return format:
    {
      message: "user -> <userId> was added to group <groupId>"
    }

    201 - on success 
    404 - if userId doesnt exist, or groupId doesnt exist
    400 - if parameters not valid 
    TODO in the future 403 - if dont have permissions to add
    500 - internal err 
  
  */
  try {
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteMember = async (req, res) => {
  /* 
    req format - /groups/:groupId/members/:userId
    
    return format:
    {
      message: "user -> <userId> was deleted successfully from group <groupId></groupId>"
    }
    200 - on success / if the user is not part of the group
    400 - if parameters not valid 
    TODO: 403 - if dont have permissions
    500 - internal err 
  
  */

  try {
  } catch (err) {
    errorHandler(err, res);
  }
};

/* 
    req format - /groups/groupId/members


    return format:
    {
      groupId: string
      members: members[]
    }

    200 - on success 
    400 - if parameters not valid 
    TODO in the future 403 - if dont have permissions
    500 - internal err 
  
  */
const getMembersOfGroup = async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
};

export default { addMember, deleteMember, getMembersOfGroup };
