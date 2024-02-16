import { Request, Response } from "express";
import { RegisterUserDto } from "../dtos/auth/register.user.dto";
import { AuthRepository } from "../repositories/auth.repository";
import { RegisterUser } from "../use-cases/auth/register.use-case";
import { LoginUserDto } from "../dtos/auth/login.user.dto";
import { LoginUser } from "../use-cases/auth/login.use-case";
import { ErrorHandler } from "../errors/error.handler";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };

  createAdmin = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .admin(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => ErrorHandler.handle(error, res));
  };
}
