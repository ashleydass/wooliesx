import { Router } from "express";
import request from "supertest";
import { initialiseRouter } from "./initialiser";

describe("Product Settings Sort routes", () => {
  let router: Router;

  beforeEach(() => {
    router = initialiseRouter();
  });

  describe('GET /api/products/settings/sort', () => {
    it("should return sort options", async () => {
      const response = await request(router).get("/api/products/settings/sort");
      expect(response.status).toEqual(200);

      expect(response.body).toMatchObject([
        "Low",
        "High",
        "Ascending",
        "Descending",
        "Recommended"
      ]);
    });
  })
});
