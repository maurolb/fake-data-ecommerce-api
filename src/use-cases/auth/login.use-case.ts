import { JwtAdapter } from "../../config/jwt";
import { LoginUserDto } from "../../dtos/auth/login.user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface UserToken {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    // crear usuario
    const user = await this.authRepository.login(loginUserDto);

    // token
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
