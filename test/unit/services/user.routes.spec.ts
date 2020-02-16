import routes from "../../../src/services/user/routes";
import { Route, Handler } from "../../../src/services/type";
import checkUserEnvSettings from "../../../src/middleware/checkUserEnvSettings";
import { Response } from "express";

jest.mock("express");

describe("User routes", () => {
  it("should contain correct path and method", () => {
    const userRoute = (routes as Route[])[0];
    expect(userRoute).toMatchObject({
      path: "/api/user",
      method: "get"
    });
  });

  describe("Handlers", () => {
    const [ realCheckUserEnvSettings, realResponseHandler ]
      = (routes as Route[])[0].handler as Handler[];

    it("should use checkUserEnvSettings as first middleware", () => {
      expect(realCheckUserEnvSettings).toBe(checkUserEnvSettings);
    });

    it("should user checkUserEnvSettings as second middleware", () => {
      const userEnvSetting = {
        name: "test name",
        token: "test token"
      };
      const mockResponse: Partial<Response> = {
        locals: {
          user: userEnvSetting
        },
        status: jest.fn(),
        json: jest.fn()
      };

      realResponseHandler(undefined, mockResponse as Response, undefined);

      expect(mockResponse.json).toHaveBeenCalledWith(userEnvSetting);
    });
  });
});
