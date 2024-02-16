import { UserDatasource } from "../datasources/user.datasource";
import { DeleteUserDto } from "../dtos/user/delete.user.dto";
import { GetUserDto } from "../dtos/user/get.user.dto";
import { UpdateUserDto } from "../dtos/user/update.user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  getAll(): Promise<UserEntity[]> {
    return this.userDatasource.getAll();
  }

  getById(getUserDto: GetUserDto): Promise<UserEntity> {
    return this.userDatasource.getById(getUserDto);
  }

  updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userDatasource.updateById(updateUserDto);
  }

  deleteById(deleteUserDto: DeleteUserDto): Promise<Object> {
    return this.userDatasource.deleteById(deleteUserDto);
  }
}
