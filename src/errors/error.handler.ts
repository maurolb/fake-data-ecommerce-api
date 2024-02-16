import { Response } from "express";
import { CustomError } from "./custom.error";

export class ErrorHandler {
  static handle = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error); // usar logger como winston
    return res.status(500).json({ error: "Internal server error" });
  };
}
