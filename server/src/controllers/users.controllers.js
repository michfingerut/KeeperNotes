import Users from '../db/models/users.model.js';
import logger from '../logger.js';
import { errorCode, errorHandler, KeeperError } from '../utils/index.js';

//TODO: create swagger
const getUser = async (req, res) => {
  /*
    req format - /users/?email=<email>&password=<password>
    return format:
    {
      firstName: string
      lastName: string
      email: string
      password: string
    }
    200 - on success V
    400 - if query string not valid V
    403 - if its not the right password V
    404 - if not found V
    500 - internal err V

  */
  const email = req.query.email;
  const password = req.query.password;
  try {
    const userInfo = await Users.findOne({
      where: { email },
      raw: true,
    });

    if (!userInfo) {
      throw new KeeperError(errorCode.NOT_FOUND, 'user doesnt exist');
    }

    if (userInfo.password !== password) {
      throw new KeeperError(errorCode.FORBIDDEN, 'invalid password');
    }

    logger.info(`getUserById ${userInfo.uuid}`);
    res.status(200).json(userInfo);
  } catch (err) {
    if (err?.name === 'SequelizeDatabaseError') {
      errorHandler(
        new KeeperError(errorCode.NOT_FOUND, 'user doesnt exist'),
        res,
      );
    } else {
      errorHandler(err, res);
    }
  }
};

const postUser = async (req, res) => {
  /*
    req format - /users
    body:{
      firstName: string
      lastName: string
      email: string //need to check if its in the right format
      password: string //add limitation of at least 8 chars, andmaybe more      limitations in the future
    }
    return format:
    {
      userId: uuid
      message: "user -> <userId> was created successfully"
    }
    201 - on success V
    400 - if parameters not valid V
    403 - if email already exists V
    500 - internal err V

  */
  try {
    const userInfo = (await Users.create(req.body)).dataValues;

    logger.info(`user -> ${userInfo.uuid} was created successfully`);
    res.status(201).json({
      userId: userInfo.uuid,
      message: `user was created successfully`,
    });
  } catch (err) {
    if (err?.name === 'SequelizeUniqueConstraintError') {
      errorHandler(
        new KeeperError(errorCode.FORBIDDEN, 'user already exists'),
        res,
      );
    } else {
      errorHandler(err, res, 'user was not created');
    }
  }
};

const putUser = async (req, res) => {
  /*
    req format - /users/:userId
    body:{
      firstName: string and or
      lastName: string and or
      password: string //add limitation of at least 8 chars, andmaybe more      limitations in the future
    }
    return format:
    {
      uuid:string
      firstName: string
      lastName: string
      email: string
      password: string -> security prob
      createdAt: Date
      updatedAt: Date
    }
    200 - on success V
    400 - if parameters not valid V
    403 - if email already exists V
    404 - user doesnt exist V
    500 - internal err V

  */
  const userId = req.params.userId;
  const dataToUpdate = req.body;

  try {
    const isUserExist = await Users.findByPk(userId);

    if (!isUserExist) {
      throw new KeeperError(errorCode.NOT_FOUND, 'user doesnt exist');
    }

    const updatedUser = (
      await Users.update(dataToUpdate, {
        where: { uuid: userId },
        returning: true,
        raw: true,
      })
    )[1][0];

    logger.info(`user -> ${userId} was updated successfuly`);
    res.status(200).json(updatedUser);
  } catch (err) {
    switch (err?.name) {
      case 'SequelizeUniqueConstraintError':
        errorHandler(
          new KeeperError(errorCode.FORBIDDEN, 'email already exists'),
          res,
        );
        break;
      case 'SequelizeDatabaseError':
        errorHandler(
          new KeeperError(errorCode.NOT_FOUND, 'user doesnt exist'),
          res,
        );
        break;
      default:
        errorHandler(err, res, 'user was not updated');

        break;
    }
  }
};

const deleteUser = async (req, res) => {
  /*
    req format - /users/:userId

    return format:
    {
      message: "user -> <uuid> was deleted successfully"
    }
    200 - on success / if the user is not found V
    400 - if parameters not valid V
    403 - if dont have permissions
    500 - internal err V

  */
  const userId = req.params.userId;
  try {
    await Users.destroy({ where: { uuid: userId } });
    logger.info(`user -> ${userId} was deleted successfuly`);
    res.status(200).json({
      userId: userId,
      message: `user was deleted successfully`,
    });
  } catch (err) {
    if (err?.name === 'SequelizeDatabaseError') {
      res.status(200).json({
        userId: userId,
        message: `user was deleted successfully`,
      });
    } else {
      errorHandler(err, res, 'user was not deleted');
    }
  }
};

export default { getUser, postUser, putUser, deleteUser };
