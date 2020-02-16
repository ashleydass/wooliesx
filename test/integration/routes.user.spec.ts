import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../src/utils";
import middleware from "../../src/middleware";
import routes from "../../src/services/user/routes";

describe("User routes", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
  });

  it("should return valid user details given env is setup correctly", async () => {
    const name = 'Test User';
    const token = 'Test Token';

    process.env = {
      ...process.env,
      USER_NAME: name,
      TOKEN: token
    };

    const response = await request(router).get("/api/user");
    expect(response.status).toEqual(200);

    expect(response.body).toMatchObject({
      name,
      token
    });
  });

  it("should return 500 status if environment is not setup", async () => {
    process.env = {
      ...process.env,
      USER_NAME: undefined,
      TOKEN: undefined
    };
    const response = await request(router).get("/api/user");
    expect(response.status).toEqual(500);

    const { body: { error: { message }}} = response;

    expect(message).toBe('Invalid settings.');
  });
});
