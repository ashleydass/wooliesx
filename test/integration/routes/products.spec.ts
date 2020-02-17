import { Router } from "express";
import request from "supertest";
import axios from 'axios';
import dotenv from 'dotenv';
import { initialiseRouter } from "./initialiser";
import { Product } from "../../../src/services/products/routes";

jest.mock('axios');

dotenv.config();

jest.spyOn(axios, 'get')
  .mockResolvedValue({ data: [] as Product[], status: 200 });

describe("Products routes", () => {
  let router: Router;

  beforeEach(() => {
    router = initialiseRouter();
  });

  describe("GET /api/products", () => {
    it("should return success response", async () => {
      const response = await request(router).get("/api/products?sortOption=Low");
      expect(response.status).toEqual(200);
    });
  });
});
