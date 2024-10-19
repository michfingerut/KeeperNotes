import Groups from '../db/models/groups.model.js';
import Members from '../db/models/members.model.js';
import Users from '../db/models/users.model.js';
import logger from '../logger.js';
import { errorCode, errorHandler, KeeperError } from '../utils/index.js';

//TODO: create swagger

const addMember = async (req, res) => {
  //TODO: maybe add many users?
  /* 
    req format - /groups/:groupId/members
    body:{
      userId: uuid
    }

    return format:
    {
      message: "user -> <userId> was added to group <groupId>"
    }

    201 - on success or if user already exist
    404 -  or groupId doesnt exist
    403 - user doesnt belong to group or already exist
    400 - if parameters not valid 
    TODO in the future 403 - if dont have permissions to add
    500 - internal err 
  
  */
  const groupId = req.params.groupId;
  const uuid = req.body.userId;
  try {
    await Members.create({ groupId, uuid });
    const message = `user -> ${uuid} was added to group ${groupId}`;

    logger.info(message);
    res.status(201).json({ message: message });
  } catch (err) {
    if (
      err?.name === 'SequelizeForeignKeyConstraintError' &&
      err.parent.length === 286
    ) {
      errorHandler(
        new KeeperError(errorCode.NOT_FOUND, 'group doesnt exist'),
        res,
      );
    } else if (
      err?.name === 'SequelizeForeignKeyConstraintError' &&
      err.parent.length === 276
    ) {
      errorHandler(
        new KeeperError(errorCode.FORBIDDEN, 'user doesnt belong to group'),
        res,
      );
    } else if (err?.name === 'SequelizeUniqueConstraintError') {
      errorHandler(
        new KeeperError(errorCode.FORBIDDEN, 'user already exists'),
        res,
      );
    } else {
      errorHandler(err, res);
    }
  }
};

const deleteMember = async (req, res) => {
  /* 
    req format - /groups/:groupId/members/:userId
    
    return format:
    {
      message: "user -> <userId> was deleted successfully from group <groupId></groupId>"
    }
    200 - on success / if the user is not part of the group or group not found
    400 - if parameters not valid 
    TODO: 403 - if dont have permissions
    500 - internal err 
  
  */
  const groupId = req.params.groupId;
  const uuid = req.params.userId;

  try {
    await Members.destroy({ where: { groupId, uuid } });
    const message = `user -> ${uuid} was deleted successfuly from group ${groupId}`;

    logger.info(message);
    res.status(200).json({ message: message });
  } catch (err) {
    errorHandler(err, res);
  }
};

const getMembersOfGroup = async (req, res) => {
  /* 
    req format - /groups/groupId/members


    return format:
    {
      groupId: string
      members: members[]
    }

    200 - on success 
    400 - if parameters not valid 
    404 - if group doesnt exist
    TODO in the future 403 - if dont have permissions
    500 - internal err 
  
  */
  const groupId = req.params.groupId;
  try {
    const group = await Groups.findByPk(groupId, {
      include: {
        model: Users,
        attributes: ['uuid', 'firstName', 'lastName', 'email'],
        through: { attributes: [] },
      },
    });

    if (!group) {
      throw new KeeperError(errorCode.NOT_FOUND, 'group doesnt exist');
    }

    const membersToReturn = group.users.map((user) => {
      return {
        uuid: user.uuid,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    });

    const groupToReturn = {
      groupId: group.groupId,
      name: group.name,
      ownerId: group.ownerId,
      members: membersToReturn,
    };

    logger.info('get group ' + groupId);
    res.status(200).json(groupToReturn);
  } catch (err) {
    errorHandler(err, res);
  }
};

export default { addMember, deleteMember, getMembersOfGroup };
