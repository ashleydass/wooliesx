import { Request, Response } from "express";
import { Route } from "../../../type";

export default [
  {
    path: "/api/products/settings/sort",
    method: "get",
    handler: async (_: Request, res: Response) => {
      res.json(["Low", "High", "Ascending", "Descending", "Recommended"]);
    }
  }
] as Route[];
