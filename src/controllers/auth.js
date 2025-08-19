// import createHttpError from 'http-errors';

export const registerUserController = async (req, res, next) => {
  const user = await registerUserController(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered user!',
    data: user,
  });
};
