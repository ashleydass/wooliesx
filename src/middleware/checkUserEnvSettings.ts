import { Request, Response, NextFunction } from 'express';

export default (_: Request, res: Response, next: NextFunction) => {
  const { USER_NAME: name, TOKEN: token } : {
    USER_NAME: string,
    TOKEN: string
  } = process.env as any;

  if (!name || !token) {
    res.status(500).send({
      error: {
        message: 'Invalid settings.'
      }
    });
  } else {
    res.locals = {
      ...res.locals,
      user: {
        name,
        token
      }
    };

    next();
  }
};
