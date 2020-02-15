import { Router } from 'express';
import { Route } from '../services/type';

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
  middleware: Wrapper[],
  router: Router
) => {
  for (const wrapper of middleware) {
    wrapper(router);
  }
};

export const applyRoutes = (routes: Route[], router: Router) => {
  for (const route of routes) {
    const { method, path, handler } = route;
    router[method](path, handler);
  }
};
