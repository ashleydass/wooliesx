import express, { Router } from "express";
import { applyMiddleware, applyRoutes } from "../../../src/utils";
import middleware from "../../../src/middleware";
import routes from "../../../src/services";

export const initialiseRouter = (): Router => {
  const router = express();
  applyMiddleware(middleware, router);
  applyRoutes(routes, router);

  return router;
};
