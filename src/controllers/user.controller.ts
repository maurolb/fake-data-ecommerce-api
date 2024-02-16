import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UpdateUserDto } from "../dtos/user/update.user.dto";
import { DeleteUserDto } from "../dtos/user/delete.user.dto";
import { GetUserDto } from "../dtos/user/get.user.dto";
import { ErrorHandler } from "../errors/error.handler";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  getAllUsers = (req: Request, res: Response) => {
    this.userRepository
      .getAll()
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  getUserById = (req: Request, res: Response) => {
    const [error, getUserDto] = GetUserDto.getById(
      req.params.id,
      req.body.user
    );
    if (error) return res.status(400).json({ error });

    this.userRepository
      .getById(getUserDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  deleteUserById = (req: Request, res: Response) => {
    const [error, deleteUserDto] = DeleteUserDto.delete(
      req.params.id,
      req.body.user
    );
    if (error) return res.status(400).json({ error });

    this.userRepository
      .deleteById(deleteUserDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  updateUserById = (req: Request, res: Response) => {
    const [error, updateUserDto] = UpdateUserDto.update(
      req.params.id,
      req.body
    );

    if (error) return res.status(400).json({ error });

    this.userRepository
      .updateById(updateUserDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };
}
