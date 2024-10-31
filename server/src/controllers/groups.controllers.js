import logger from '../logger.js';
import { errorHandler } from '../utils/index.js';
import Groups from '../db/models/groups.model.js';
import Users from '../db/models/users.model.js';
import Members from '../db/models/members.model.js';
import publishers from '../socketio.js';

//TODO: create swagger

const postGroup = async (req, res) => {
  /* 
    req format - /groups
    body: {
      name, ownerId
    }

    return format:
    {
      message: "group -> <groupId> was created successfully"
    }

    201 - on success 
    TODO in the future 403 - if dont have permissions to add (maybe add owner column)
    500 - internal err 
  
  */
  try {
    const group = (await Groups.create(req.body)).dataValues;

    //TODO: what happnes if fails?
    await Members.create({ groupId: group.groupId, uuid: group.ownerId });

    logger.info(`group -> ${group.groupId} was created successfully`);
    res.status(201).json(group);
  } catch (err) {
    errorHandler(err, res, 'note was not created');
  }
};

const getGroupOfUser = async (req, res) => {
  /* 
    req format - /groups/users/:userId

    return format:
    {
      [
        {
          groupId: groupId
        }
      ]
    }

    200 - on success + non existing user
    TODO in the future 403 - if dont have permissions
    500 - internal err 
  
  */
  const userId = req.params.userId;
  try {
    const groups = await Groups.findAll({
      raw: true,
      nest: true,
      attributes: ['groupId', 'name'],
      include: [
        {
          model: Users,
          attributes: [],
          where: { uuid: userId },
          through: { attributes: [] },
        },
      ],
    });

    logger.info(`get groups of user ${userId}`);
    res.status(200).json(groups);
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

    await publishers.genericPublisher(groupId, 'delete group', groupId);
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    errorHandler(err, res);
  }
};

export default { postGroup, getGroupOfUser, deleteGroup };

// maybe put prmissions to group?
//const putGroup = async (req, res) => {
//   try {
//   } catch (err) {
//     errorHandler(err, res);
//   }
// };
