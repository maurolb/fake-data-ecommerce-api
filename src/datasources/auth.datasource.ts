import { BcryptAdapter } from "../config/bcrypt";
import { LoginUserDto } from "../dtos/auth/login.user.dto";
import { RegisterUserDto } from "../dtos/auth/register.user.dto";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom.error";
import { AuthUserMapper } from "../mappers/auth.user.mapper";
import Cart from "../models/cart.model";
import User from "../models/user.model";

export class AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. verificar si el email ya está en uso
      const exists = await User.findOne({ where: { email } });
      if (exists)
        throw CustomError.badRequest(
          "User already exists, if you are hacker this user not exists :P"
        );
      // 2. hash de la contraseña
      const user = await User.create({
        name,
        email,
        password: BcryptAdapter.hash(password),
      } as User);

      // 3. crea un cart para dicho usuario
      Cart.create({
        userId: user.id,
      } as Cart);

      // 4. mapear la respuesta a la entidad
      return AuthUserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      // 1. verificar si el usuario existe
      const user = await User.findOne({ where: { email } });
      if (!user) throw CustomError.badRequest("Wrong email");

      // 2. verificar si la contraseña es correcta
      const pass = BcryptAdapter.compare(password, user.password);
      if (!pass) throw CustomError.badRequest("Wrong password");

      // 3. mapear la respuesta a la entidad
      return AuthUserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async registerAdmin(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. verificar si el email ya está en uso
      const exists = await User.findOne({ where: { email } });
      if (exists)
        throw CustomError.badRequest(
          "User already exists, if you are hacker this user not exists :P"
        );
      // 2. hash de la contraseña
      const user = await User.create({
        name,
        email,
        password: BcryptAdapter.hash(password),
        role: 2,
      } as User);

      // 3. crea un cart para dicho usuario
      Cart.create({
        userId: user.id,
      } as Cart);

      // 4. mapear la respuesta a la entidad
      return AuthUserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
