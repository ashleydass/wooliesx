import { Request, Response, NextFunction } from 'express';

export default (_: Request, res: Response, next: NextFunction) => {
  const { USER_NAME: name, TOKEN: token, RESOURCE_API_BASE_URL: resourceApiBaseUrl } : {
    USER_NAME: string,
    TOKEN: string,
    RESOURCE_API_BASE_URL: string
  } = process.env as any;

  if (!name || !token || !resourceApiBaseUrl) {
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
      },
      products: {
        resourceApiBaseUrl
      }
    };

    next();
  }
};
