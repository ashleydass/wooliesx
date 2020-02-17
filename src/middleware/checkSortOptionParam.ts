import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const validSortOptions = ['Low', 'High', 'Ascending', 'Descending', 'Recommended'];
  const { sortOption = 'Low' } = req.query;

  if (!sortOption || validSortOptions.includes(sortOption)) {
    res.locals = {
      ...res.locals,
      sortOption
    };
    next();
  } else {
    res.status(400).send({
      error: {
        message: 'Invalid sortOption'
      }
    })
  }
};
