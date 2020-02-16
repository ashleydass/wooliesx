import { Router } from "express";
import request from "supertest";
import { initialiseRouter } from "./initialiser";

describe("Products routes", () => {
  let router: Router;

  beforeEach(() => {
    router = initialiseRouter();
  });

  describe("GET /api/products", () => {
    it("should return sort options", async () => {
      const response = await request(router).get("/api/products");
      expect(response.status).toEqual(404);
    });
  });
});
