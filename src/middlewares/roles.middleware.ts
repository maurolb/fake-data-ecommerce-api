import { NextFunction, Request, Response } from "express";

export class RolesMiddleware {
  static validateUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { role } = req.body.user;

    if (role < 1)
      return res.status(401).json({ error: "Insufficient permissions" });
    next();
  };

  static validateAdminRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { role } = req.body.user;

    if (role < 2)
      return res.status(401).json({ error: "Insufficient permissions" });
    next();
  };
}
