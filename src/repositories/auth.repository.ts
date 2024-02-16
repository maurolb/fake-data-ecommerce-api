import { AuthDatasource } from "../datasources/auth.datasource";
import { LoginUserDto } from "../dtos/auth/login.user.dto";
import { RegisterUserDto } from "../dtos/auth/register.user.dto";
import { UserEntity } from "../entities/user.entity";

export class AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }

  registerAdmin(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.registerAdmin(registerUserDto);
  }

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }
}
